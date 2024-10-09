// controllers/customerAccountController.js
const db = require('../config/db');
const customerAccountModel = require('../models/CustomerAccountModel');

// Get all customerAccounts
const getCustomerAccounts = async (req, res) => {
  try {
   
   const  customerAccounts = await customerAccountModel.getCustomerAccounts();

    res.status(200).json(customerAccounts);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customerAccounts', error: err.message });
  }
};


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

// Get an customerAccount by ID
const getCustomerAccount = async (req, res) => {
  const customerAccountId = req.params.id;
  try {
  
  
    const  customerAccount = await customerAccountModel.getCustomerAccount(customerAccountId);


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
  const { customerId, accountTypeId, balance, branchId } = req.body;
  try {
  
    const  id = await customerAccountModel.addCustomerAccount(customerId, accountTypeId, balance, branchId);


    res.status(201).send({ message: 'Customer account added successfully', accountId: id });
  } catch (err) {
    res.status(500).send({ message: 'Error adding customer account', error: err.message });
  }
};


// Update a customerAccount by ID
const updateCustomerAccount = async (req, res) => {
  const customerAccountId = req.params.id;
  const { accountTypeId, balance } = req.body; // updating account type and balance
  try {
   
    const  result = await customerAccountModel.updateCustomerAccount(accountTypeId, balance,  customerAccountId);

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
   
    const  result = await customerAccountModel.deleteCustomerAccount(customerAccountId);

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
  getCustomerAccountsByBranch,
  getCustomerAccount,
  addCustomerAccount,
  updateCustomerAccount,
  deleteCustomerAccount
};
