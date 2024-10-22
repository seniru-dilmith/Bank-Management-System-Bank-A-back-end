const express = require('express');
const { getAllRecentTransactions, doTransaction, getRecentTransactionsByBranchId, getRecentTransactionsByCustomerId } = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { transactionValidation } = require('../validations/transactionValidation');
const { employeeMiddleware } = require('../middleware/employeeMiddleware');
const { customerMiddleware } = require('../middleware/customerMiddleware');
const { branchManagerMiddleware } = require('../middleware/branchManagerMiddleware');
const router = express.Router();

// Route to get all recent transactions (employee only)
router.get('/recent-transactions', authMiddleware, employeeMiddleware, getAllRecentTransactions);
// Route to perform a transaction
router.post('/do-transaction', authMiddleware, customerMiddleware, transactionValidation, doTransaction);
// Route to get recent transactions by branch
router.get('/recent-by-branch/:branchId', authMiddleware, branchManagerMiddleware, getRecentTransactionsByBranchId);
// Route to get recent transactions by customer
router.get('/recent-by-customer/:customerId', authMiddleware, customerMiddleware, getRecentTransactionsByCustomerId);

module.exports = router;
