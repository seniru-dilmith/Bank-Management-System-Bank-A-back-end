const express = require('express');
const router = express.Router();
const { getCustomerAccountsByBranch, getBranchIdOfEmployee, getAccountSummaries } = require('../controllers/customerAccountController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { employeeMiddleware } = require('../middleware/employeeMiddleware');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for customerAccount management
router.get('/summaries/branch/:branchId', authMiddleware, employeeMiddleware, getCustomerAccountsByBranch); // Get customerAccount by ID

// branch id of an employee
router.get('/employee/branch-id', authMiddleware, employeeMiddleware, getBranchIdOfEmployee);

// Get account summaries for a branch
router.get('/account-summaries/:emp_id', authMiddleware, employeeMiddleware, getAccountSummaries);

module.exports = router;
