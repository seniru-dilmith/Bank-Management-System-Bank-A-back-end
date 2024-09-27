// models/customerAccountModel.js
const db = require('../config/db');

// Get all customerAccounts
const getAllCustomerAccounts = async () => {
  const query = `SELECT 
  cu.first_name || ' ' || cu.last_name AS AccountHolderName,
  ac.id AS AccountNumber,
  act.name AS AccountType,
  ac.acc_balance AS Balance
FROM 
  account ac
INNER JOIN 
  customer cu ON cu.id = ac.customer_id
INNER JOIN 
  account_type act ON ac.customer_id = act.id;`;
  const [results] = await db.query(query); 
  return results;
};

// Get an customerAccount by ID
const getCustomerAccountById = async (id) => {
  const query = `SELECT 
  cu.first_name || ' ' || cu.last_name AS AccountHolderName,
  ac.id AS AccountNumber,
  act.name AS AccountType,
  ac.acc_balance AS Balance
FROM 
  account ac
INNER JOIN 
  customer cu ON cu.id = ac.customer_id
INNER JOIN 
  account_type act ON ac.customer_id = act.id WHERE ac.id = ?;`;
  const [result] = await db.query(query, [id]);
  return result[0];
};


module.exports = {
  getAllCustomerAccounts,
  getCustomerAccountById
};
