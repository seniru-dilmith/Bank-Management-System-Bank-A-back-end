const db = require('../config/db');

// Controller to get account summary for the logged-in user
exports.getAccountSummary = async (req, res) => {

    // Check if the user is a customer and not an employee
    if (req.user.userType !== 'customer') {
        return res.status(400).json({ msg: 'This is for customers only'})        
    }
    
    const customerId = req.user.id;  // Get customer ID from JWT

    try {
        // Query to fetch account details for the current customer
        const accountsQuery = `
            SELECT 
                a.id,
                at.name AS account_type,
                a.acc_balance
            FROM account a
            JOIN account_type at ON a.account_type_id = at.id
            WHERE a.customer_id = ?
        `;

        const [accounts] = await db.query(accountsQuery, [customerId]);

        if (accounts.length === 0) {
            return res.status(404).json({ msg: 'No accounts found for this customer' });
        }

        // Send the account details as JSON response
        res.json({
            customerId: customerId,
            accounts: accounts
        });
    } catch (error) {
        console.error('Error fetching account summary:', error);
        res.status(500).json({ msg: 'Server error while fetching account summary' });
    }
};
