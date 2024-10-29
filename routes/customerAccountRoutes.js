const express = require('express');
const router = express.Router();
const { getCustomerAccountsByBranch, getBranchIdOfEmployee, getAccountSummaries, getAccountTypes, getCustomerDetails } = require('../controllers/customerAccountController');
const { openAccount } = require('../controllers/customerAccountController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { employeeMiddleware } = require('../middleware/employeeMiddleware');

// Routes for customerAccount management
router.get('/summaries/branch/:branchId', authMiddleware, employeeMiddleware, getCustomerAccountsByBranch);

// branch id of an employee
router.get('/employee/branch-id', authMiddleware, employeeMiddleware, getBranchIdOfEmployee);

// Get account summaries for a branch
router.get('/account-summaries/:emp_id', authMiddleware, employeeMiddleware, getAccountSummaries);

// get all account types
router.get('/account-types', authMiddleware, employeeMiddleware, getAccountTypes);

// get all customer details
router.get('/customer-details', authMiddleware, employeeMiddleware, getCustomerDetails);

//open a new account
router.post('/open-account', authMiddleware, employeeMiddleware, openAccount);

module.exports = router;
