// models/transactionModel.js
const db = require('../config/db');

// Get all transactions
const getRcentTransactions = async () => {
  const query = `SELECT 
  tr.timestamp as Date,
  tt.name as TransactionType,
  tt.description as Description,
  tr.amount as Amount
 FROM 
   transaction tr
 INNER JOIN transaction_type tt
   ON tt.id = tr.transaction_type_id
 ORDER BY tr.timestamp DESC LIMIT 5;`;
   const [transactions] = await db.query(query); 
  return transactions;
};

// Get all transactions
const getRcentTransactionsByBranchId = async (branchId) => {
  const query = `SELECT 
  tr.timestamp as Date,
  tt.name as TransactionType,
  tt.description as Description,
  tr.amount as Amount
 FROM 
   transaction tr
 INNER JOIN transaction_type tt
   ON tt.id = tr.transaction_type_id
 INNER JOIN account ac
   ON ac.account_number = tr.from_account_number
  WHERE ac.branch_id = ?
 ORDER BY tr.timestamp DESC LIMIT 5;`;
   const [transactions] = await db.query(query, [branchId]); 
  return transactions;
};

// Get all transactions
const getRcentTransactionsByCustomerId = async (customerId) => {
  const query = `SELECT 
  tr.timestamp as Date,
  tt.name as TransactionType,
  tt.description as Description,
  tr.amount as Amount
 FROM 
   transaction tr
 INNER JOIN transaction_type tt
   ON tt.id = tr.transaction_type_id WHERE tr.customer_id = ?;`;
   const [transactions] = await db.query(query, [customerId]); 
  return transactions;
};

// Get an transaction by ID
const getTransaction = async (id) => {
  const query = `SELECT 
  tr.timestamp as Date,
  tt.name as TransactionType,
  tt.description as Description,
  tr.amount as Amount
 FROM 
   transaction tr
 INNER JOIN transaction_type tt
   ON tt.id = tr.transaction_type_id WHERE tr.id = ?;`;
   const [transaction] = await db.query(query, [id]);
    return transaction[0];
};



// Create a new transaction
const addTransaction = async (customerId, fromAccountId, toAccountId, amount, transactionTypeId) => {
    // SQL query to insert a new transaction
    const query = `
      INSERT INTO transaction (customer_id, from_account_id, to_account_id, amount, transaction_type_id) 
      VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await db.query(query, [customerId, fromAccountId, toAccountId, amount, transactionTypeId]);
    return result.insertId;
};

// Update an transaction
const updateTransaction = async (transactionId, amount, transactionTypeId) => {
  

    // SQL query to update the transaction
    const query = `
      UPDATE transaction 
      SET amount = ?, transaction_type_id = ?
      WHERE id = ?;
    `;
    const [result] = await db.query(query, [amount, transactionTypeId, transactionId]);
  return result;
};

// Delete an transaction
const deleteTransaction = async (transactionId) => {
  // SQL query to delete the transaction
  const query = `
  DELETE FROM transaction 
  WHERE id = ?;
`;
const [result] = await db.query(query, [transactionId]);
  return result;
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
