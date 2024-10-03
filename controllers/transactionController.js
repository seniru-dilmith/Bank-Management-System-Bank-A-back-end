// controllers/transactionController.js
const db = require('../config/db');

// Get all transactions
const getRcentTransactions = async (req, res) => {
  try {
   
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
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching transactions', error: err.message });
  }
};

// Get an transaction by ID
const getTransaction = async (req, res) => {
  const transactionId = req.params.id;
  try {
   
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
    // SQL query to insert a new transaction
    const query = `
      INSERT INTO transaction (customer_id, from_account_id, to_account_id, amount, transaction_type_id) 
      VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await db.query(query, [customerId, fromAccountId, toAccountId, amount, transactionTypeId]);

    res.status(201).send({ message: 'Transaction added successfully', transactionId: result.insertId });
  } catch (err) {
    res.status(500).send({ message: 'Error adding transaction', error: err.message });
  }
};


// Update a transaction by ID
const updateTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const { amount, transactionTypeId } = req.body; // updating amount and transaction type
  try {
    // SQL query to update the transaction
    const query = `
      UPDATE transaction 
      SET amount = ?, transaction_type_id = ?
      WHERE id = ?;
    `;
    const [result] = await db.query(query, [amount, transactionTypeId, transactionId]);

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
    // SQL query to delete the transaction
    const query = `
      DELETE FROM transaction 
      WHERE id = ?;
    `;
    const [result] = await db.query(query, [transactionId]);

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
  addTransaction,
  updateTransaction,
  deleteTransaction
};
