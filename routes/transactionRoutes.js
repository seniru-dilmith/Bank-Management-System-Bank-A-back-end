const express = require('express');
const { getAllRecentTransactions } = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all recent transactions (employee only)
router.get('/recent-transactions', authMiddleware, getAllRecentTransactions);

module.exports = router;
