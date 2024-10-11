// controllers/transactionController.js
const db = require('../config/db');
const transactionModel = require('../models/TransactionModel');



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



module.exports = {
  getRcentTransactionsByBranchId,
  getRcentTransactionsByCustomerId,
};
