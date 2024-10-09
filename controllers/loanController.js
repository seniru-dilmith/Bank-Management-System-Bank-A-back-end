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

// Controller to handle loan requests from customers
exports.requestLoan = async (req, res) => {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { loanType, amount, duration } = req.body;
        const customerId = req.user.id;  // Get the current logged-in customer's ID

        // Ensure only customers can request a loan
        if (req.user.userType !== 'customer') {
            return res.status(403).json({ msg: 'Only customers can request a loan.' });
        }

        // Use Loan model to submit loan request
        await Loan.requestLoan({ customerId, loanType, amount, duration });

        res.status(201).json({ msg: 'Loan request submitted successfully!' });
    } catch (error) {
        console.error('Error requesting loan:', error.message);
        res.status(500).json({ msg: 'Server error while submitting the loan request.' });
    }
};

// Controller function to get details of a specific loan application
exports.getLoanDetails = async (req, res) => {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const loanId = req.params.id; // Get loan ID from URL params
        const customerId = req.user.id; // Get the customer ID from the JWT token

        // Ensure only customers can view loan application details
        if (req.user.userType !== 'customer') {
            return res.status(403).json({ msg: 'Only customers can view loan application details.' });
        }

        // Use Loan model to get loan details
        const loanDetails = await Loan.getLoanDetails(customerId, loanId);

        if (!loanDetails) {
            return res.status(404).json({ msg: 'No loan found with this ID for the customer' });
        }

        // Return the loan details
        res.json(loanDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error during loan details retrieval' });
    }
};

