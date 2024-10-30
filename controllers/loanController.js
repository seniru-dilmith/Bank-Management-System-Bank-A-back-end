const { validationResult } = require('express-validator');
const Loan = require('../models/Loan');
const Account = require('../models/Account'); 

// Controller function to get loans for the logged-in customer
exports.getCustomerLoans = async (req, res) => {

    // Validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Get the customer ID from the request
        const customerId = req.user.id; 
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
        const customerId = req.user.id; 

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
        const loanId = req.params.id; 
        const customerId = req.user.id;
        
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

// Controller for employee to submit a loan request for a customer
exports.requestLoanByEmployee = async (req, res) => {
    const { customerAccountNumber, loanAmount, loanTerm, interestRate, typeId } = req.body;
    try {
      const account = await Account.findOne({ where: { account_number: customerAccountNumber } });
      if (!account) return res.status(404).json({ message: 'Customer account not found' });
  
      const loan = await Loan.requestLoanByEmployee({
        customerId: account.customer_id,
        loanAmount,
        loanTerm,
        interestRate,
        branchId: account.branch_id,
        typeId,
      });
  
      res.status(201).json({ message: 'Loan application submitted successfully', loan });
    } catch (error) {
      console.error('Error submitting loan request:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

exports.getLoanTypes = async (req, res) => {
    try {
        const types = await Loan.types();
        res.json(types);
    } catch (error) {
        console.error('Error getting loan types:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

