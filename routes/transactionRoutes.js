const express = require('express');
const router = express.Router();
const { 
    getRcentTransactionsByBranchId,
    getRcentTransactionsByCustomerId} = require('../controllers/transactionController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for transaction management
router.get('/recent-by-branch/:branchId', getRcentTransactionsByBranchId);   // Get all transactions
router.get('/recent-by-customer/:customerId', getRcentTransactionsByCustomerId);   // Get all transactions



module.exports = router;
