const db = require('../config/db');

class Transaction {
    // Method to fetch recent transactions (for employees only)
    static async getAllRecentTransactions() {
        const query = `
            SELECT t.timestamp, tt.name, tt.description, t.amount
            FROM transaction t
            JOIN transaction_type tt ON t.transaction_type_id = tt.id
            ORDER BY t.timestamp DESC
            LIMIT 20;
        `;
        const [transactions] = await db.query(query);
        return transactions;
    }

    // Method to check account balance for the "from" account
    static async getAccountBalance(accountNumber) {
        const query = 'SELECT acc_balance FROM account WHERE account_number = ?';
        const [result] = await db.query(query, [accountNumber]);
        return result[0];
    }

    // Method to update the balance for a specific account
    static async updateAccountBalance(accountNumber, amount) {
        const query = 'UPDATE account SET acc_balance = acc_balance + ? WHERE account_number = ?';
        await db.query(query, [amount, accountNumber]);
    }

    // Method to record a transaction in the transaction table
    static async recordTransaction({ customerId, fromAccount, toAccount, beneficiaryName, amount, receiverReference, myReference }) {
        const query = `
            INSERT INTO transaction 
            (customer_id, from_account_number, to_account_number, beneficiary_name, amount, receiver_reference, my_reference) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(query, [customerId, fromAccount, toAccount, beneficiaryName, amount, receiverReference, myReference]);
    }
}

module.exports = Transaction;
