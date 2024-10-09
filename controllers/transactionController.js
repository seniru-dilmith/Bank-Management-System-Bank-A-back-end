// controllers/transactionController.js
const db = require('../config/db');
const transactionModel = require('../models/TransactionModel');

// Get all transactions
const getRcentTransactions = async (req, res) => {
  try {
   
    const transactions = await  transactionModel.getRcentTransactions();
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Get all transactions by branch Id
const getRcentTransactionsByBranchId = async (req, res) => {
  const { branchId } = req.params; // branchId is a route parameter
  try {
   
    const transactions = await  transactionModel.getRcentTransactionsByBranchId(branchId);
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Get all transactions by customer Id
const getRcentTransactionsByCustomerId = async (req, res) => {
  const { customerId } = req.params; // branchId is a route parameter
  try {
   
    const transactions = await  transactionModel.getRcentTransactionsByCustomerId(customerId);
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Get an transaction by ID
const getTransaction = async (req, res) => {
  const transactionId = req.params.id;
  try {
   
    const transaction = await  transactionModel.getTransaction(transactionId);

    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).json( transaction );
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transaction', error: err.message });
  }
};

// Add a new transaction
const addTransaction = async (req, res) => {
  const { customerId, fromAccountId, toAccountId, amount, transactionTypeId } = req.body;
  try {
   
    const transactionId = await  transactionModel.addTransaction(customerId, fromAccountId, toAccountId, amount, transactionTypeId);

    res.status(201).send({ message: 'Transaction added successfully', transactionId: transactionId });
  } catch (err) {
    res.status(500).send({ message: 'Error adding transaction', error: err.message });
  }
};


// Update a transaction by ID
const updateTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const { amount, transactionTypeId } = req.body; // updating amount and transaction type
  try {
   
    const result = await  transactionModel.updateTransaction(transactionId, amount, transactionTypeId);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Transaction not found' });
    }

    res.status(200).send({ message: 'Transaction updated successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error updating transaction', error: err.message });
  }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;
  try {
   
    const result = await  transactionModel.deleteTransaction(transactionId);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Transaction not found' });
    }

    res.status(200).send({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting transaction', error: err.message });
  }
};



module.exports = {
  getRcentTransactions,
  getTransaction,
  getRcentTransactionsByBranchId,
  getRcentTransactionsByCustomerId,
  addTransaction,
  updateTransaction,
  deleteTransaction
};
