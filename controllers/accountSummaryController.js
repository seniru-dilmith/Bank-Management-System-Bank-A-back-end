const db = require('../config/db');

// Function to get account summaries
const getAccountSummaries = async (req, res) => {
    try {
        const [summaries] = await db.query(`
            SELECT a.id, c.first_name, c.last_name, a.acc_balance, at.name AS account_type
            FROM account a
            JOIN customer c ON a.customer_id = c.id
            JOIN account_type at ON a.account_type_id = at.id
            ORDER BY c.last_name, c.first_name;  -- Sort by customer name
        `);
        res.json(summaries); // Return the account summaries as JSON
    } catch (err) {
        console.error('Error querying the database: ', err);
        res.status(500).json({ error: 'Error querying the database' });
    }
};

module.exports = { getAccountSummaries };
