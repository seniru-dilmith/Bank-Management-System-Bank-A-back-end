const { validationResult } = require('express-validator');
const Loan = require('../models/Loan');

// Controller function to get loans for the logged-in customer
exports.getCustomerLoans = async (req, res) => {

    // Validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const customerId = req.user.id; // Get the customer ID from the request
        const loans = await Loan.findByCustomerId(customerId);

        if (loans.length === 0) {
            return res.status(404).json({ msg: 'No loans found for this customer' });
        }

        res.json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server failed during query' });
    }
};
