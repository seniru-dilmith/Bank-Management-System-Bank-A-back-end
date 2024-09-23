const express = require('express');
const router = express.Router();
const { getRecentTransactions } = require('../controllers/transactionController');

// Route to get recent transactions
router.get('/transactions/recent', getRecentTransactions);

module.exports = router;
