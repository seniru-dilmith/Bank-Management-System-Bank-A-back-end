// models/employeeModel.js
const db = require('../config/db');

// Get all employees
const getAllEmployees = async () => {
    const query = 'SELECT * FROM employee';
    const [employees] = await db.query(query); 
  return employees;
};

// Get an employee by ID
const getEmployeeById = async (id) => {
    const query = 'SELECT * FROM employee WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result[0];
};

const getGeneralEmployeesByBranchId= async (branchId) =>{
    const query = `
    SELECT e.* 
    FROM employee e
    INNER JOIN general_employee ge ON e.id = ge.employee_id
    WHERE ge.branch_id = ?`;

  const [employees] = await db.query(query, [branchId]); // Pass branchId as a parameter to the query
  return employees;
}

const getManagerEmployeesByBranchId = async (branchId) =>{
    const query = `
    SELECT e.* 
    FROM employee e
    INNER JOIN manager_employee me ON e.id = me.manager_id
    WHERE me.branch_id = ?`;

  const [employees] = await db.query(query, [branchId]); // Pass branchId as a parameter to the query
  return employees;
};

// Create a new employee
const createEmployee = async (employeeData) => {
    const query = `INSERT INTO employee (first_name, last_name, address, phone, nic, email, username, password, position_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const { first_name, last_name, address, phone, nic, email, username, password, position_id } = employeeData;
    const [result] = await db.query(query, [first_name, last_name, address, phone, nic, email, username, password, position_id]);
    return result.insertId;
};

// Update an employee
const updateEmployee = async (id, employeeData) => {
  

    const query = `UPDATE employee SET first_name = ?, last_name = ?, address = ?, phone = ?, nic = ?, email = ?, username = ?, position_id = ?
                 WHERE id = ?`;
  const { first_name, last_name, address, phone, nic, email, username, position_id } = employeeData;
  const [result] = await db.query(query, [first_name, last_name, address, phone, nic, email, username, position_id, id]);
  return result;
};

// Delete an employee
const deleteEmployee = async (id) => {
  const query = 'DELETE FROM employee WHERE id = ?';
  const [result] = await db.query(query, [id]);
  return result;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getGeneralEmployeesByBranchId,
  getManagerEmployeesByBranchId,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
