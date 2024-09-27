// controllers/transactionController.js
const transactionModel = require('../models/transactionModel');

// Get all transactions
const getRcentTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.getRcentTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Get an transaction by ID
const getTransaction = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const transaction = await transactionModel.getTransactionById(transactionId);
    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).json( transaction );
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transaction', error: err.message });
  }
};

module.exports = {
  getRcentTransactions,
  getTransaction
};
