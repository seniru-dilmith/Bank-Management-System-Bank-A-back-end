const customerAccountModel = require('../models/CustomerAccountModel');
const EmployeeModel = require('../models/EmployeeModel')

const getBranchIdOfEmployee = async (req, res) => {
  try {
    const response = await EmployeeModel.getBranchIdOfEmployee(req.user.id);
    console.log(response);
    
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send({ message: "Error fetching branchId of an employee"});
  }
}

// Get all customerAccounts by Branch
const getCustomerAccountsByBranch = async (req, res) => {
  const { branchId } = req.params;
  try {
   
   const customerAccounts = await customerAccountModel.getCustomerAccountsByBranch(branchId);

    res.status(200).json(customerAccounts);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching customerAccounts', error: err.message });
  }
};

const getAccountSummaries = async (req, res) => {
  const { emp_id } = req.params;
  try {
    const accountSummaries = await customerAccountModel.getAccountSummaries(emp_id);
    res.status(200).json(accountSummaries[0]);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching account summaries', error: err.message });
  }
};


module.exports = {
 
  getCustomerAccountsByBranch,
  getBranchIdOfEmployee,
  getAccountSummaries
 
};
