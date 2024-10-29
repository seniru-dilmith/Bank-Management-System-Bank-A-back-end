const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getCustomerLoans, requestLoan, getLoanDetails, requestLoanByEmployee, getLoanTypes } = require('../controllers/loanController');
const { requestLoanValidation } = require('../validations/loanValidation'); 
const { customerMiddleware } = require('../middleware/customerMiddleware'); 
const { employeeMiddleware } = require('../middleware/employeeMiddleware');

// Route to get loans for the logged-in customer
router.get('/customer-loans', authMiddleware, getCustomerLoans);

// Route to request a loan (only for customers)
router.post('/request-loan', authMiddleware, customerMiddleware, requestLoanValidation, requestLoan);

// Route to get details of a specific loan application (only for customers)
router.get('/loan-details/:id', authMiddleware, customerMiddleware, getLoanDetails);

// Route to submit a loan application by an employee
router.post('/request-loan-emp', authMiddleware, employeeMiddleware, requestLoanByEmployee);

//loan types
router.get('/types', authMiddleware, employeeMiddleware, getLoanTypes);

module.exports = router;
