const customerAccountModel = require('../models/CustomerAccountModel');
const EmployeeModel = require('../models/EmployeeModel')
const AccountType = require('../models/AccountType');
const Customer = require('../models/Customer');
const Account = require('../models/Account');

exports.getBranchIdOfEmployee = async (req, res) => {
  try {
    const response = await EmployeeModel.getBranchIdOfEmployee(req.user.id);
    console.log(response);
    
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send({ message: "Error fetching branchId of an employee"});
  }
}

// Get all customerAccounts by Branch
exports.getCustomerAccountsByBranch = async (req, res) => {
  const { branchId } = req.params;
  try {
   
   const customerAccounts = await customerAccountModel.getCustomerAccountsByBranch(branchId);

    res.status(200).json(customerAccounts);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customerAccounts', error: err.message });
  }
};

exports.getAccountSummaries = async (req, res) => {
  const { emp_id } = req.params;
  try {
    const accountSummaries = await customerAccountModel.getAccountSummaries(emp_id);
    res.status(200).json(accountSummaries[0]);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching account summaries', error: err.message });
  }
};

exports.getAccountTypes = async (req, res) => {
  try {
    const accountTypes = await AccountType.findAll();
    
    res.status(200).json(accountTypes);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching account types', error: err.message });
  }
};

exports.getCustomerDetails = async (req, res) => {
  try {
    const customerDetails = await Customer.findAllCustomers();
    res.status(200).json(customerDetails);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customer details', error: err.message });
  }
};

exports.openAccount = async (req, res) => {
  const { account_type_id, customer_id, initial_deposit } = req.body;
  try {
    if (!account_type_id || !customer_id || !initial_deposit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const response = await Account.openAccount(account_type_id, customer_id, initial_deposit, req.user.id);
    res.status(201).json(response);
  } catch (err) {
    console.error('Error opening account:', err);
    res.status(500).send({ message: 'Error opening account', error: err.message });
  }
};
