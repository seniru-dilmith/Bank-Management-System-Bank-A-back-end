// controllers/customerAccountController.js
const db = require('../config/db');
const customerAccountModel = require('../models/CustomerAccountModel');



// Get all customerAccounts by Branch
const getCustomerAccountsByBranch = async (req, res) => {
  const { branchId } = req.params;
  try {
   
   const  customerAccounts = await customerAccountModel.getCustomerAccountsByBranch(branchId);

    res.status(200).json(customerAccounts);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customerAccounts', error: err.message });
  }
};


module.exports = {
 
  getCustomerAccountsByBranch,
 
};
