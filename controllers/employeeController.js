// controllers/employeeController.js


const employeeModel = require('../models/EmployeeModel');

// Get all employees
const getEmployees = async (req, res) => {
  try {

  const employees = await  employeeModel.getAllEmployees();
   
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employees', error: err.message });
  }
};



// Get general employees by branch ID
const getGeneralEmployeesByBranchId = async (req, res) => {
  const { branchId } = req.params; // branchId is a route parameter
  try {
   
    const employees = await  employeeModel.getGeneralEmployeesByBranchId(branchId);

    if (employees.length > 0) {
      res.status(200).json(employees);
    } else {
      res.status(404).send({ message: 'No general employees found for this branch' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching general employees', error: err.message });
  }
};

// Get manager employees by branch ID
const getManagerEmployeesByBranchId = async (req, res) => {
  const { branchId } = req.params; // branchId is a route parameter
  try {
   
    const employees = await  employeeModel.getManagerEmployeesByBranchId(branchId);
    if (employees.length > 0) {
      res.status(200).json(employees);
    } else {
      res.status(404).send({ message: 'No manager employees found for this branch' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching manager employees', error: err.message });
  }
};

// Get an employee by ID
const getEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await  employeeModel.getEmployeeById(employeeId);
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.status(200).json( employee );
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employee', error: err.message });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  const newEmployee = req.body;
  try {
  
    const employeeId = await  employeeModel.createEmployee(newEmployee);
    res.status(201).send({ message: 'Employee created', employeeId });
  } catch (err) {
    res.status(500).send({ message: 'Error creating employee', error: err.message });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const updatedData = req.body;
  try {
   
    await employeeModel.updateEmployee(employeeId, updatedData);

    res.status(200).send({ message: 'Employee updated' });
  } catch (err) {
    res.status(500).send({ message: 'Error updating employee', error: err.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
   
    await employeeModel.deleteEmployee(employeeId);
   
    res.status(200).send({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting employee', error: err.message });
  }
};

module.exports = {
  getEmployees,
  getGeneralEmployeesByBranchId,
  getManagerEmployeesByBranchId,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
