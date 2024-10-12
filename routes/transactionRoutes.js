const express = require('express');
const { getAllRecentTransactions, doTransaction } = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { transactionValidation } = require('../validations/transactionValidation');
const router = express.Router();

// Route to get all recent transactions (employee only)
router.get('/recent-transactions', authMiddleware, getAllRecentTransactions);

// Route to perform a transaction
router.post('/do-transaction', authMiddleware, transactionValidation, doTransaction);

module.exports = router;