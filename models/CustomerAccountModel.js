// models/employeeModel.js
const db = require('../config/db');

// Get all CustomerAccounts
const getCustomerAccounts = async () => {
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
  account_type act ON ac.account_type_id = act.id;`;

  const [customerAccounts] = await db.query(query); 

  return customerAccounts;
};

// Get all CustomerAccounts
const getCustomerAccountsByBranch = async (id) => {
  
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
  account_type act ON ac.account_type_id = act.id
WHERE ac.branch_id = ?;`;

  const [customerAccounts] = await db.query(query,[id]); 

  return customerAccounts;
};

// Get an CustomerAccount by ID
const getCustomerAccount = async (id) => {
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
  account_type act ON ac.account_type_id = act.id WHERE ac.account_number = ?;`;

  const [result] = await db.query(query, [id]);
    return result[0];
};


// Create a new employee
const addCustomerAccount = async (customerId, accountTypeId, balance, branchId) => {
      // SQL query to insert a new customer account
      const query = `
      INSERT INTO account (customer_id, account_type_id, acc_balance, branch_id) 
      VALUES (?, ?, ?, ?);
    `;
    const [result] = await db.query(query, [customerId, accountTypeId, balance, branchId]);
    return result.insertId;
};

// Update an employee
const updateCustomerAccount = async (accountTypeId, balance, customerAccountId) => {
  

   // SQL query to update the account details
   const query = `
   UPDATE account 
   SET account_type_id = ?, acc_balance = ?
   WHERE id = ?;
 `;
 const [result] = await db.query(query, [accountTypeId, balance, customerAccountId]);
  return result;
};

// Delete an employee
const deleteCustomerAccount = async (customerAccountId) => {
  // SQL query to delete the account
  const query = `
  DELETE FROM account 
  WHERE id = ?;
`;
const [result] = await db.query(query, [customerAccountId]);
  return result;
};

module.exports = {
  getCustomerAccounts,
  getCustomerAccountsByBranch,
  getCustomerAccount,
  addCustomerAccount,
  updateCustomerAccount,
  deleteCustomerAccount
};
