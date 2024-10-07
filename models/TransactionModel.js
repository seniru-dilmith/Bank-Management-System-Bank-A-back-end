// models/employeeModel.js
const db = require('../config/db');

// Get all employees
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

// Get an employee by ID
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



// Create a new employee
const addTransaction = async (customerId, fromAccountId, toAccountId, amount, transactionTypeId) => {
    // SQL query to insert a new transaction
    const query = `
      INSERT INTO transaction (customer_id, from_account_id, to_account_id, amount, transaction_type_id) 
      VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await db.query(query, [customerId, fromAccountId, toAccountId, amount, transactionTypeId]);
    return result.insertId;
};

// Update an employee
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

// Delete an employee
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
  addTransaction,
  updateTransaction,
  deleteTransaction
};
