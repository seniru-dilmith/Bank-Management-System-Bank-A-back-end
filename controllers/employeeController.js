// controllers/employeeController.js

const db = require('../config/db');

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const query = 'SELECT * FROM employee';
  const [employees] = await db.query(query);
  
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employees', error: err.message });
  }
};



// Get general employees by branch ID
const getGeneralEmployeesByBranchId = async (req, res) => {
  const { branchId } = req.params; // branchId is a route parameter
  try {
    const query = `
      SELECT e.* 
      FROM employee e
      INNER JOIN general_employee ge ON e.id = ge.employee_id
      WHERE ge.branch_id = ?`;

    const [employees] = await db.query(query, [branchId]); // Pass branchId as a parameter to the query

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
    const query = `
      SELECT e.* 
      FROM employee e
      INNER JOIN manager_employee me ON e.id = me.manager_id
      WHERE me.branch_id = ?`;

    const [employees] = await db.query(query, [branchId]); // Pass branchId as a parameter to the query

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
    const query = 'SELECT * FROM employee WHERE id = ?';
    const [result] = await db.query(query, [employeeId]);
    var employee = result[0];
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
  
    const query = `INSERT INTO employee (first_name, last_name, address, phone, nic, email, username, password, position_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const { first_name, last_name, address, phone, nic, email, username, password, position_id } = newEmployee;
const [result] = await db.query(query, [first_name, last_name, address, phone, nic, email, username, password, position_id]);
var employeeId =  result.insertId;
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
    
    const query = `UPDATE employee SET first_name = ?, last_name = ?, address = ?, phone = ?, nic = ?, email = ?, username = ?, position_id = ?
                 WHERE id = ?`;
  const { first_name, last_name, address, phone, nic, email, username, position_id } = updatedData;
  const [result] = await db.query(query, [first_name, last_name, address, phone, nic, email, username, position_id, employeeId]);
  

    res.status(200).send({ message: 'Employee updated' });
  } catch (err) {
    res.status(500).send({ message: 'Error updating employee', error: err.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
   
    const query = 'DELETE FROM employee WHERE id = ?';
  const [result] = await db.query(query, [employeeId]);
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
