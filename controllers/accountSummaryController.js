const Account = require('../models/Account');

// Controller to get account summary for the logged-in user
exports.getAccountSummary = async (req, res) => {
    // Get customer ID from JWT
    const customerId = req.user.id;  
    try {
        // Use the Account model to fetch the account details
        const accounts = await Account.findByCustomerId(customerId);

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
