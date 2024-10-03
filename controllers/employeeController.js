const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Controller function to get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.getAll();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server failed during fetching employees' });
    }
};

// Controller function to add new employees
exports.addEmployee = async (req, res) => {
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
exports.updateEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, first_name, last_name, address, phone, nic, email, username, password, position_id, branch_id } = req.body;
    try {
        await Employee.update(id, { first_name, last_name, address, phone, nic, email, username, password, position_id });

        if (position_id === 1) {
            // Update manager branch in manager_employee table
            await Employee.updateManagerBranch(id, branch_id);
        } else {
            // Update general employee branch and supervisor in general_employee table
            await Employee.updateGeneralEmployee(id, branch_id, req.user.id);  // Assuming req.user.id is supervisor
        }

        res.json({ msg: `Employee ${first_name} ${last_name} updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error while updating employee' });
    }
};

// Controller function to delete an employee
exports.removeEmployee = async (req, res) => {
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
