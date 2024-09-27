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
  const [results] = await db.query(query); 
  return results;
};

// Get an transaction by ID
const getTransactionById = async (id) => {
  const query = `SELECT 
 tr.timestamp as Date,
 tt.name as TransactionType,
 tt.description as Description,
 tr.amount as Amount
FROM 
  transaction tr
INNER JOIN transaction_type tt
	ON tt.id = tr.transaction_type_id WHERE tr.id = ?;`;
  const [result] = await db.query(query, [id]);
  return result[0];
};


module.exports = {
  getRcentTransactions,
  getTransactionById
};
