const db = require('../config/db');
const transactionModel = require('../models/TransactionModel');
const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

// Get all transactions by branch Id
exports.getRecentTransactionsByBranchId = async (req, res) => {
  const { branchId } = req.params;
  try {
   
    const transactions = await  transactionModel.getRcentTransactionsByBranchId(branchId);
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Get all transactions by customer Id
exports.getRecentTransactionsByCustomerId = async (req, res) => {
  const { customerId } = req.params; 
  try {
   
    const transactions = await  transactionModel.getRcentTransactionsByCustomerId(customerId);
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Controller: Get all recent transactions for the employee's branch
exports.getAllRecentTransactions = async (req, res) => {
  try {
    const employeeId = req.user.id; 

    const transactions = await Transaction.getAllRecentTransactions(employeeId);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ msg: 'No recent transactions found.' });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ msg: 'Server error while fetching transactions.' });
  }
};

// Get recent transactions by customer and account number
exports.getRecentTransactionsByCustomerIdAndAccountNumber = async (req, res) => {
  const { customerId, accountNumber } = req.query; 

  try {
    if (!customerId || !accountNumber) {
      return res.status(400).json({ message: 'Customer ID and account number are required.' });
    }

    const transactions = await transactionModel.getRecentTransactionsByCustomerIdAndAccountNumber(customerId, accountNumber);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this customer and account.' });
    }

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
};

// Controller function for performing a transaction
exports.doTransaction = async (req, res) => {
  const { fromAccount, beneficiaryAccount, beneficiaryName, amount, receiverReference, myReference } = req.body;

  try {
      // Use the Transaction model to call the stored procedure
      await Transaction.performTransaction({
          customerId: req.user.id,
          fromAccount,
          toAccount: beneficiaryAccount,
          beneficiaryName,
          amount,
          receiverReference,
          myReference
      });

      res.json({ msg: 'Transaction successful' });
  } catch (error) {
      console.error('Transaction failed:', error);
      res.status(500).json({ msg: 'Transaction failed', error: error.message });
  }
};
