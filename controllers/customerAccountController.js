// controllers/customerAccountController.js
const db = require('../config/db');

// Get all customerAccounts
const getCustomerAccounts = async (req, res) => {
  try {
   
    const query = `SELECT 
    cu.first_name || ' ' || cu.last_name AS AccountHolderName,
    ac.account_number AS AccountNumber,
    act.name AS AccountType,
    ac.acc_balance AS Balance
  FROM 
    account ac
  INNER JOIN 
    customer cu ON cu.id = ac.customer_id
  INNER JOIN 
    account_type act ON ac.customer_id = act.id;`;

    const [customerAccounts] = await db.query(query); 


    res.status(200).json(customerAccounts);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customerAccounts', error: err.message });
  }
};

// Get an customerAccount by ID
const getCustomerAccount = async (req, res) => {
  const customerAccountId = req.params.id;
  try {
  
    const query = `SELECT 
  cu.first_name || ' ' || cu.last_name AS AccountHolderName,
  ac.account_number AS AccountNumber,
  act.name AS AccountType,
  ac.acc_balance AS Balance
FROM 
  account ac
INNER JOIN 
  customer cu ON cu.id = ac.customer_id
INNER JOIN 
  account_type act ON ac.customer_id = act.id WHERE ac.account_number = ?;`;

  const [result] = await db.query(query, [id]);
  var customerAccount = result[0];


    if (!customerAccount) {
      return res.status(404).send({ message: 'CustomerAccount not found' });
    }
    res.status(200).json( customerAccount );
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customerAccount', error: err.message });
  }
};

// Add a new customer account
const addCustomerAccount = async (req, res) => {
  const { customerId, accountTypeId, balance,withdrawals_used, branchId } = req.body;
  try {
    // SQL query to insert a new customer account
    const query = `
      INSERT INTO account (customer_id, account_type_id, acc_balance,withdrawals_used, branch_id) 
      VALUES (?, ?, ?,?, ?);
    `;
    const [result] = await db.query(query, [customerId, accountTypeId, balance,withdrawals_used, branchId]);

    res.status(201).send({ message: 'Customer account added successfully', accountId: result.insertId });
  } catch (err) {
    res.status(500).send({ message: 'Error adding customer account', error: err.message });
  }
};


// Update a customerAccount by ID
const updateCustomerAccount = async (req, res) => {
  const customerAccountId = req.params.id;
  const { customerId,accountTypeId, balance,branchId , withdrawals_used } = req.body; // updating account type and balance
  try {
    // SQL query to update the account details
    const query = `
      UPDATE account 
      SET customer_id = ?,account_type_id = ?, acc_balance = ?, branch_id = ?, withdrawals_used = ?
      WHERE account_number = ?;
    `;
    const [result] = await db.query(query, [customerId,accountTypeId, balance,branchId , withdrawals_used, customerAccountId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'CustomerAccount not found' });
    }

    res.status(200).send({ message: 'CustomerAccount updated successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error updating customerAccount', error: err.message });
  }
};

// Delete a customerAccount by ID
const deleteCustomerAccount = async (req, res) => {
  const customerAccountId = req.params.id;
  try {
    // SQL query to delete the account
    const query = `
      DELETE FROM account 
      WHERE id = ?;
    `;
    const [result] = await db.query(query, [customerAccountId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'CustomerAccount not found' });
    }

    res.status(200).send({ message: 'CustomerAccount deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting customerAccount', error: err.message });
  }
};

module.exports = {
  getCustomerAccounts,
  getCustomerAccount,
  addCustomerAccount,
  updateCustomerAccount,
  deleteCustomerAccount
};
