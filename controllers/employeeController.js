const employeeModel = require('../models/EmployeeModel');
const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Get all employees
exports.getEmployees = async (req, res) => {
  try {

  const employees = await  employeeModel.getAllEmployees();
   
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employees', error: err.message });
  }
};

// Get general employees by branch ID
exports.getGeneralEmployeesByBranchId = async (req, res) => {
  const { branchId } = req.params;
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
exports.getManagerEmployeesByBranchId = async (req, res) => {
  const { branchId } = req.params; 
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
exports.getEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await employeeModel.getEmployeeById(employeeId);
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.status(200).json( employee );
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employee', error: err.message });
  }
};

// Update an employee
exports.updateEmployeeFromId = async (req, res) => {
  const employeeId = req.params.id;
  const updatedData = req.body;
  try {
   
    await employeeModel.updateEmployee(employeeId, updatedData);

    res.status(200).send({ message: 'Employee updated' });
  } catch (err) {
    res.status(500).send({ message: 'Error updating employee', error: err.message });
  }
};

exports.getEmployeesBranchId = async (req, res) => {
  const { id } = req.params;
  try {
   
    const employees = await employeeModel.branchIdOfEmployee(id);
    if (employees.length > 0) {
      res.status(200).json(employees);
    } else {
      res.status(404).send({ message: 'No manager employees found for this branch' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching manager employees', error: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
   
    await employeeModel.deleteEmployee(employeeId);
   
    res.status(200).send({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting employee', error: err.message });
  }
};

// Controller function to get all employees
exports.getEmployeesForTechnician = async (req, res) => {
    try {
        const employees = await Employee.getAll();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server failed during fetching employees' });
    }
};

// Controller function to add new employees
exports.addEmployeeForTechnician = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, address, phone, nic, email, username, password, position_id, branch_id, supervisor_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const employeeId = await Employee.create({ first_name, last_name, address, phone, nic, email, username, password: hashedPassword, position_id });

        if (position_id === 1) {
            // Add manager to manager_employee table
            await Employee.addManager(employeeId, branch_id);
        } else {
            // Add general employee to general_employee table
            await Employee.addGeneralEmployee(employeeId, branch_id, supervisor_id);
        }

        res.json({ msg: `Employee ${first_name} ${last_name} created successfully` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server failed during employee creation' });
    }
};

// Controller function to update a selected employee
exports.updateEmployeeForTechnician = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, first_name, last_name, address, phone, nic, email, username, position_id, branch_id } = req.body;

    try {
        await Employee.update(id, { first_name, last_name, address, phone, nic, email, username, position_id });
        
        if (position_id === 1) {
            // Update manager branch in manager_employee table
            await Employee.updateManagerBranch(id, branch_id);
        } else {
            // Update general employee branch and supervisor in general_employee table
            await Employee.updateGeneralEmployee(id, branch_id, req.user.id);  
        }

        res.json({ msg: `Employee ${first_name} ${last_name} updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error while updating employee' });
    }
};

// Controller function to delete an employee
exports.removeEmployeeForTechnician = async (req, res) => {
    const { id } = req.params;

    if (parseInt(id) === req.user.id) {
        return res.status(400).json({ msg: 'You cannot delete yourself' });
    }

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ msg: `Employee with id: ${id} not found` });
        }

        await Employee.delete(id);
        res.json({ msg: `Employee ${employee.first_name} ${employee.last_name} deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error while deleting employee' });
    }
};

exports.getPositionsOfEmployees = async (req, res) => {
  try {
    const positions = await employeeModel.getPositions();
    res.status(200).json(positions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching positions', error: err.message });
  }
};
