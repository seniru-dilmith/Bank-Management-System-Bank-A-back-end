const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getCustomerLoans, requestLoan } = require('../controllers/loanController'); // Import requestLoan controller
const { requestLoanValidation } = require('../validations/loanValidation'); // Import requestLoan validation

// Route to get loans for the logged-in customer
router.get('/customer-loans', authMiddleware, getCustomerLoans);

// Route to request a loan (only for customers)
router.post('/request-loan', authMiddleware, requestLoanValidation, requestLoan);

module.exports = router;
