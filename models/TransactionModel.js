// models/transactionModel.js
const db = require('../config/db');



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


module.exports = {
 
  getRcentTransactionsByBranchId,
  getRcentTransactionsByCustomerId,
};
