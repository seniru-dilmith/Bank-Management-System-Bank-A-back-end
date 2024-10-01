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
