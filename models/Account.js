const db = require('../config/db');

class Account {
    // Fetch account details for the specific customer by their ID using a stored procedure
    static async findByCustomerId(customerId) {
        const query = `CALL GetCustomerAccountSummary(?)`;
        const [accounts] = await db.query(query, [customerId]);
        return accounts[0]; // Stored procedures in MySQL return an array of results
    }

    // Fetch account details by account number
    static async findOne({ where: { account_number } }) {
        const query = `SELECT * FROM account WHERE account_number = ?`;
        const [account] = await db.query(query, [account_number]);
        return account[0]; // Return the first result (or undefined if not found)
    }
}

module.exports = Account;
