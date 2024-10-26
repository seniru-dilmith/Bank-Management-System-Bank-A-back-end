const db = require('../config/db');

class Account {
    // Fetch account details for the specific customer by their ID using a stored procedure
    static async findByCustomerId(customerId) {
        const query = `CALL GetCustomerAccountSummary(?)`;
        const [accounts] = await db.query(query, [customerId]);
        return accounts[0]; // Stored procedures in MySQL return an array of results
    }

    // open a new account
    static async openAccount(account_type_id, customer_id, initial_deposit, employee_id) {
        const query = `
            INSERT INTO account (customer_id, account_type_id, branch_id, acc_balance) 
            VALUES (?, ?, (SELECT branch_id FROM general_employee WHERE employee_id = ?), ?)`;
        const [results] = await db.query(query, [customer_id, account_type_id, employee_id, initial_deposit]);
        return results;
    }
}

module.exports = Account;
