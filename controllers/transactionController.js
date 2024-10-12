const db = require('../config/db');
const transactionModel = require('../models/TransactionModel');
const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

// Get all transactions by branch Id
exports.getRecentTransactionsByBranchId = async (req, res) => {
  const { branchId } = req.params; // branchId is a route parameter
  try {
   
    const transactions = await  transactionModel.getRcentTransactionsByBranchId(branchId);
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Get all transactions by customer Id
exports.getRecentTransactionsByCustomerId = async (req, res) => {
  const { customerId } = req.params; // branchId is a route parameter
  try {
   
    const transactions = await  transactionModel.getRcentTransactionsByCustomerId(customerId);
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Controller to get recent transactions (for employees only)
exports.getAllRecentTransactions = async (req, res) => {
    try {
        // Use the Transaction model to fetch recent transactions
        const transactions = await Transaction.getAllRecentTransactions();

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

        // Check if the "from" account has enough balance
        const fromAccountResult = await Transaction.getAccountBalance(fromAccount);

        if (!fromAccountResult) {
            return res.status(404).json({ msg: 'From account not found' });
        }

        const fromAccountBalance = fromAccountResult.acc_balance;
        if (fromAccountBalance < amount) {
            return res.status(400).json({ msg: 'Insufficient balance' });
        }

        // Deduct the amount from the sender's account
        await Transaction.updateAccountBalance(fromAccount, -amount);

        // Add the amount to the beneficiary's account
        await Transaction.updateAccountBalance(beneficiaryAccount, amount);

        // Record the transaction in the transaction table
        await Transaction.recordTransaction({
            customerId: req.user.id,
            fromAccount,
            toAccount: beneficiaryAccount,
            beneficiaryName,
            amount,
            receiverReference,
            myReference
        });

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
