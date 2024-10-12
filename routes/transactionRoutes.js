const express = require('express');
const { getAllRecentTransactions, doTransaction } = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { transactionValidation } = require('../validations/transactionValidation');
const { getRcentTransactionsByBranchId, getRcentTransactionsByCustomerId} = require('../controllers/transactionController');
const router = express.Router();

// Route to get all recent transactions (employee only)
router.get('/recent-transactions', authMiddleware, getAllRecentTransactions);

// Route to perform a transaction
router.post('/do-transaction', authMiddleware, transactionValidation, doTransaction);

router.get('/recent-by-branch/:branchId', getRcentTransactionsByBranchId);   // Get all transactions
router.get('/recent-by-customer/:customerId', getRcentTransactionsByCustomerId);   // Get all transactions

module.exports = router;
