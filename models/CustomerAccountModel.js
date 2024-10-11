// models/employeeModel.js
const db = require('../config/db');

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


module.exports = {
  getCustomerAccountsByBranch,
};
