const db = require('../config/db');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Controller function to get all employees
exports.getEmployees = async (req, res) => {
    try {
        const query = `
        SELECT e.id, e.first_name, e.last_name, e.address, e.phone, e.nic, e.email, e.username, p.name as position, 
        b1.name as branch_name
        FROM employee e
        JOIN position p ON e.position_id = p.id
        JOIN general_employee ge ON e.id = ge.employee_id
        JOIN branch b1 ON ge.branch_id = b1.id
        UNION
        SELECT e.id, e.first_name, e.last_name, e.address, e.phone, e.nic, e.email, e.username, p.name as position, 
        b2.name as branch_name
        FROM employee e
        JOIN position p ON e.position_id = p.id
        JOIN manager_employee me ON e.id = me.manager_id
        JOIN branch b2 ON me.branch_id = b2.id
        `;  // Query to get both general employees and managers, each associated with their respective branch

        const [employees] = await db.query(query);

        res.json(employees);  // Send the employees as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server failed during fetching employees' });
    }
};

// Controller function add new employees
exports.addEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, address, phone, nic, email, username, password, position_id, branch_id } = req.body;  // Get the employee details from the request body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

        // Start a transaction to ensure data consistency
        await db.query('START TRANSACTION');

        const employeeQuery = `
        INSERT INTO employee (first_name, last_name, address, phone, nic, email, username, password, position_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;  // Query to insert a new employee (without branch_id in employee table)

        const [employeeResult] = await db.query(employeeQuery, [first_name, last_name, address, phone, nic, email, username, hashedPassword, position_id]);  // Execute the query to insert the employee

        const employeeId = employeeResult.insertId;  // Get the newly inserted employee's ID

        // Check if the employee is a manager or a general employee
        const positionQuery = 'SELECT name FROM position WHERE id = ?';
        const [positionResult] = await db.query(positionQuery, [position_id]);
        const positionName = positionResult[0].name;

        if (positionName === 'Manager') {
            // Insert into manager_employee table if the position is Manager
            const managerQuery = `
            INSERT INTO manager_employee (manager_id, branch_id)
            VALUES (?, ?)
            `;
            await db.query(managerQuery, [employeeId, branch_id]);

        } else {
            // Insert into general_employee table if the position is not Manager
            const generalEmployeeQuery = `
            INSERT INTO general_employee (employee_id, branch_id, supervisor_id)
            VALUES (?, ?, ?)
            `;
            // Assuming supervisor_id is passed in the request body or set to null if not needed
            const { supervisor_id } = req.body || null; 
            await db.query(generalEmployeeQuery, [employeeId, branch_id, supervisor_id]);
        }

        // Commit the transaction
        await db.query('COMMIT');

        res.json({ msg: `Employee ${first_name} ${last_name} created successfully` });  // Send a success response
    } 
    catch (error) {
        // Rollback in case of an error
        await db.query('ROLLBACK');
        console.error(error);
        return res.status(500).json({ msg: 'Server failed during employee creation' });
    }
};

// Controller function to update a selected employee
exports.updateEmployee = async (req, res) => {

    await db.query('START TRANSACTION');  // Start a transaction to ensure data consistency

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, first_name, last_name, address, phone, nic, email, username, password, position_id, branch_id } = req.body;  // Get updated details

    try {
        // Hash the password if it is provided
        let hashedPassword = null;
        if (password) {  // Password is already validated in employeeValidation
            hashedPassword = await bcrypt.hash(password, 10);  // Only hash the password if it's provided
        }

        // Build query to update the employee (without branch_id)
        let query = `
        UPDATE employee
        SET first_name = ?, last_name = ?, address = ?, phone = ?, nic = ?, email = ?, username = ?, position_id = ?
        `;

        let values = [first_name, last_name, address, phone, nic, email, username, position_id];

        // Add password update if it's provided
        if (hashedPassword) {
            query += `, password = ?`;
            values.push(hashedPassword);
        }

        query += ` WHERE id = ?`;  // Complete query with the where clause
        values.push(id);

        // Execute the query to update the employee table
        await db.query(query, values);

        // Update branch_id in either general_employee or manager_employee
        if (position_id === 1) {  // Assuming 1 represents a manager
            await db.query(
                `UPDATE manager_employee SET branch_id = ? WHERE manager_id = ?`, 
                [branch_id, id]
            );
        } else {
            await db.query(
                `UPDATE general_employee SET branch_id = ?, supervisor_id = ? WHERE employee_id = ?`, 
                [branch_id, req.user.id, id]  // Assuming the logged-in user is the supervisor
            );
        }

        await db.query('COMMIT');  // Commit the transaction

        res.json({ msg: `Employee ${first_name} ${last_name} updated successfully` });  // Send success message
    } catch (error) {

        await db.query('ROLLBACK');  // Rollback in case of an error

        console.error(error);
        res.status(500).json({ msg: 'Server error while updating employee' });
    }
};

// Controller function to delete an employee
exports.removeEmployee = async (req, res) => {
    const { id } = req.params;  // Get the employee ID from the request parameters

    // Check if the user is trying to delete themselves
    if (parseInt(id) === req.user.id)
        return res.status(400).json({ msg: 'You cannot delete yourself' });

    try {

        const [results] = await db.query(`
            SELECT id, first_name, last_name
            FROM employee
            WHERE id = ?
            `, [id]);  // Query to check if the employee exists

        // Check if the employee exists
        if (results.length === 0) {
            return res.status(404).json({ msg : `Employee with id: ${id} not found`});
        }

        await db.query('DELETE FROM employee WHERE id = ?', [id]);  // Query to delete the employee

        // Send a success message with the deleted employee's name
        res.json({ msg: `Employee ${results[0].first_name} ${results[0].last_name} deleted successfully` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error while deleting employee' });
    }
};
