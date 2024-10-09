const express = require('express');
const router = express.Router();
const { getRcentTransactions,
    getTransaction,
    getRcentTransactionsByBranchId,
    getRcentTransactionsByCustomerId,
    addTransaction,
    updateTransaction,
    deleteTransaction} = require('../controllers/transactionController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for transaction management
router.get('/recent', getRcentTransactions);   // Get all transactions
router.get('/recent-by-branch/:branchId', getRcentTransactionsByBranchId);   // Get all transactions
router.get('/recent-by-customer/:customerId', getRcentTransactionsByCustomerId);   // Get all transactions
router.get('/recent/:id', getTransaction); // Get transaction by ID
// Add a new transaction
router.post('/add', addTransaction);
// Update transaction
router.put('/update/:id',updateTransaction);

// Delete transaction
router.delete('/delete/:id', deleteTransaction);


module.exports = router;
