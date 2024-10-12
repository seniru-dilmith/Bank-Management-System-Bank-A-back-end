const express = require('express');
const { getAllRecentTransactions, doTransaction, getRecentTransactionsByBranchId, getRecentTransactionsByCustomerId } = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { transactionValidation } = require('../validations/transactionValidation');
const router = express.Router();

// Route to get all recent transactions (employee only)
router.get('/recent-transactions', authMiddleware, getAllRecentTransactions);

// Route to perform a transaction
router.post('/do-transaction', authMiddleware, transactionValidation, doTransaction);


// Route to get recent transactions by branch
router.get('/recent-by-branch/:branchId', getRecentTransactionsByBranchId);
// Route to get recent transactions by customer
router.get('/recent-by-customer/:customerId', getRecentTransactionsByCustomerId);

module.exports = router;
