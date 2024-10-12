const db = require('../config/db');

class Account {
    // Fetch account details for the specific customer by their ID
    static async findByCustomerId(customerId) {
        const query = `
            SELECT 
                a.account_number,
                at.name AS account_type,
                a.acc_balance
            FROM account a
            JOIN account_type at ON a.account_type_id = at.id
            WHERE a.customer_id = ?
        `;
        const [accounts] = await db.query(query, [customerId]);
        return accounts;
    }
}

module.exports = Account;
