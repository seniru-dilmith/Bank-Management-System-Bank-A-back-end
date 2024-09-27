// controllers/customerAccountController.js
const customerAccountModel = require('../models/CustomerAccountModel');

// Get all customerAccounts
const getCustomerAccounts = async (req, res) => {
  try {
    const customerAccounts = await customerAccountModel.getAllCustomerAccounts();
    res.status(200).json(customerAccounts);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customerAccounts', error: err.message });
  }
};

// Get an customerAccount by ID
const getCustomerAccount = async (req, res) => {
  const customerAccountId = req.params.id;
  try {
    const customerAccount = await customerAccountModel.getCustomerAccountById(customerAccountId);
    if (!customerAccount) {
      return res.status(404).send({ message: 'CustomerAccount not found' });
    }
    res.status(200).json( customerAccount );
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customerAccount', error: err.message });
  }
};

module.exports = {
  getCustomerAccounts,
  getCustomerAccount
};
