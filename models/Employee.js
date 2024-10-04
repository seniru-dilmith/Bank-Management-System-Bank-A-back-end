const db = require('../config/db');

class Employee {
    // Get all employees (both general and managers)
    static async getAll() {
        const query = `
            SELECT e.id, e.first_name, e.last_name, e.address, e.phone, e.nic, e.email, e.username, p.name AS position, 
            b1.name AS branch_name
            FROM employee e
            JOIN position p ON e.position_id = p.id
            JOIN general_employee ge ON e.id = ge.employee_id
            JOIN branch b1 ON ge.branch_id = b1.id
            UNION
            SELECT e.id, e.first_name, e.last_name, e.address, e.phone, e.nic, e.email, p.name AS position, 
            b2.name AS branch_name
            FROM employee e
            JOIN position p ON e.position_id = p.id
            JOIN manager_employee me ON e.id = me.manager_id
            JOIN branch b2 ON me.branch_id = b2.id
        `;
        const [employees] = await db.query(query);
        return employees;
    }

    // Insert a new employee
    static async create({ first_name, last_name, address, phone, nic, email, username, password, position_id }) {
        const query = `
            INSERT INTO employee (first_name, last_name, address, phone, nic, email, username, password, position_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [first_name, last_name, address, phone, nic, email, username, password, position_id]);
        return result.insertId;
    }

    // Insert manager data in `manager_employee` table
    static async addManager(employeeId, branch_id) {
        const query = 'INSERT INTO manager_employee (manager_id, branch_id) VALUES (?, ?)';
        await db.query(query, [employeeId, branch_id]);
    }

    // Insert general employee data in `general_employee` table
    static async addGeneralEmployee(employeeId, branch_id, supervisor_id = null) {
        const query = 'INSERT INTO general_employee (employee_id, branch_id, supervisor_id) VALUES (?, ?, ?)';
        await db.query(query, [employeeId, branch_id, supervisor_id]);
    }

    static async updatePassword(id, password) {
        const query = 'UPDATE employee SET password = ? WHERE id = ?';
        await db.query(query, [password, id]);
    }

    static async updateName(id, first_name, last_name) {
        const query = 'UPDATE employee SET first_name = ?, last_name = ? WHERE id = ?';
        await db.query(query, [first_name, last_name, id]);
    }

    static async updateAddress(id, address) {
        const query = 'UPDATE employee SET address = ? WHERE id = ?';
        await db.query(query, [address, id]);
    }

    // Update manager branch in `manager_employee` table
    static async updateManagerBranch(managerId, branch_id) {
        const query = 'UPDATE manager_employee SET branch_id = ? WHERE manager_id = ?';
        await db.query(query, [branch_id, managerId]);
    }

    // Delete an employee
    static async delete(id) {
        const query = 'DELETE FROM employee WHERE id = ?';
        await db.query(query, [id]);
    }

    // Find an employee by ID
    static async findById(id) {
        const query = 'SELECT * FROM employee WHERE id = ?';
        const [employees] = await db.query(query, [id]);
        return employees[0];  // Return the first result
    }

    // Find employee by username
    static async findByUsername(username) {
        const query = 'SELECT * FROM employee WHERE username = ?';
        const [results] = await db.query(query, [username]);
        return results[0];  // Return the first result if found
    }
}

module.exports = Employee;
