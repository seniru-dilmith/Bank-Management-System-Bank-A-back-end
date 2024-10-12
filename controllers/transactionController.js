const db = require('../config/db');
const { validationResult } = require('express-validator');

// Controller to get recent transactions (for employees only)
exports.getAllRecentTransactions = async (req, res) => {
    try {
        // Ensure that only employees can access this route
        if (req.user.userType !== 'employee') {
            return res.status(403).json({ msg: 'Access denied. Only employees can view recent transactions.' });
        }

        // Query to fetch the recent transactions from all customer accounts
        const query = `
            SELECT t.timestamp, tt.name, tt.description, t.amount
            FROM transaction t
            JOIN transaction_type tt ON t.transaction_type_id = tt.id
            ORDER BY t.timestamp DESC
            LIMIT 20;  -- Limiting to the most recent 20 transactions`;

        const [transactions] = await db.query(query);

        // If no transactions are found
        if (transactions.length === 0) {
            return res.status(404).json({ msg: 'No recent transactions found.' });
        }

        // Return the transactions as a JSON response
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching recent transactions:', error.message);
        res.status(500).json({ msg: 'Server error while fetching recent transactions.' });
    }
};

// Controller function for performing a transaction
exports.doTransaction = async (req, res) => {
    const { fromAccount, beneficiaryAccount, beneficiaryName, amount, receiverReference, myReference } = req.body;

    let connection;
    try {
        // Get a manual connection for this transaction
        connection = await db.getConnection();
        await connection.beginTransaction(); // Start transaction

        // Check if the from account has enough balance
        const [fromAccountResult] = await connection.query(
            'SELECT acc_balance FROM account WHERE account_number = ?',
            [fromAccount]
        );

        if (fromAccountResult.length === 0) {
            return res.status(404).json({ msg: 'From account not found' });
        }

        const fromAccountBalance = fromAccountResult[0].balance;
        if (fromAccountBalance < amount) {
            return res.status(400).json({ msg: 'Insufficient balance' });
        }

        // Deduct the amount from the sender's account
        await connection.query(
            'UPDATE account SET acc_balance = acc_balance - ? WHERE account_number = ?',
            [amount, fromAccount]
        );

        // Add the amount to the beneficiary's account
        await connection.query(
            'UPDATE account SET acc_balance = acc_balance + ? WHERE account_number = ?',
            [amount, beneficiaryAccount]
        );

        // Record the transaction in the transaction table
        await connection.query(
            'INSERT INTO transaction (customer_id,from_account_number, to_account_number, beneficiary_name, amount, receiver_reference, my_reference) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, fromAccount, beneficiaryAccount, beneficiaryName, amount, receiverReference, myReference]
        );

        // Commit the transaction if everything is successful
        await connection.commit();
        res.json({ msg: 'Transaction successful' });
    } catch (error) {
        if (connection) await connection.rollback(); // Rollback in case of an error
        console.error('Transaction failed:', error);
        res.status(500).json({ msg: 'Transaction failed' });
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
};