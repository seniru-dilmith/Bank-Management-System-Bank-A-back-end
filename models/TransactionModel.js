const db = require('../config/db');

// Get all transactions
exports.getRcentTransactionsByBranchId = async (branchId) => {
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
exports.getRcentTransactionsByCustomerId = async (customerId) => {
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

// Fetch recent transactions by customer ID and account number
exports.getRecentTransactionsByCustomerIdAndAccountNumber = async (customerId, accountNumber) => {
  const query = `
    SELECT 
      t.timestamp AS Date,
      tt.name AS TransactionType,
      t.my_reference AS Description,
      t.amount AS Amount
    FROM transaction t
    JOIN transaction_type tt ON t.transaction_type_id = tt.id
    WHERE t.customer_id = ? AND (t.from_account_number = ? OR t.to_account_number = ?)
    ORDER BY t.timestamp DESC
    LIMIT 10;
  `;

  const [rows] = await db.query(query, [customerId, accountNumber, accountNumber]);
  return rows;
};
