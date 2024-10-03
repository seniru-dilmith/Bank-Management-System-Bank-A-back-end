const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
// const { authMiddleware } = require('../middleware/authMiddleware'); // Protected routes

// Routes for transaction management
router.get('/recent', transactionController.getRcentTransactions);   // Get all transactions
router.get('/recent/:id', transactionController.getTransaction); // Get transaction by ID
// Add a new transaction
router.post('/', transactionController.addTransaction);
// Update transaction
router.put('/:id',transactionController.updateTransaction);

// Delete transaction
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
