const db = require('../config/db');

// Function to get recent transactions
const getRecentTransactions = async (req, res) => {
    try {
        const [transactions] = await db.query(`
            SELECT t.id, t.amount, t.timestamp, tt.name AS transaction_type
            FROM transaction t
            JOIN transaction_type tt ON t.transaction_type_id = tt.id
            ORDER BY t.timestamp DESC
            LIMIT 10;  -- Adjust the limit as needed
        `);
        res.json(transactions); // Return the transactions as JSON
    } catch (err) {
        console.error('Error querying the database: ', err);
        res.status(500).json({ error: 'Error querying the database' });
    }
};

module.exports = { getRecentTransactions };
