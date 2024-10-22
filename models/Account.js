const db = require('../config/db');

class Account {
    // Fetch account details for the specific customer by their ID using a stored procedure
    static async findByCustomerId(customerId) {
        const query = `CALL GetCustomerAccountSummary(?)`;
        const [accounts] = await db.query(query, [customerId]);
        return accounts[0]; // Stored procedures in MySQL return an array of results
    }
}

module.exports = Account;
