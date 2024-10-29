const db = require('../config/db');

class Employee {
    // Get all employees (both general and managers)
    static async getAll() {
        const query = `
            SELECT e.id, e.first_name, e.last_name, e.address, e.phone, e.nic, e.email, e.username, p.name AS position, COALESCE(b2.name, b1.name) AS branch_name, p.id AS position_id
            FROM employee e
            LEFT JOIN position p ON e.position_id = p.id
            LEFT JOIN manager_employee me ON e.id = me.manager_id
            LEFT JOIN branch b2 ON me.branch_id = b2.id
            LEFT JOIN general_employee ge ON e.id = ge.employee_id
            LEFT JOIN branch b1 ON ge.branch_id = b1.id

            ORDER BY 
                CASE 
                    WHEN COALESCE(b2.name, b1.name) = 'Head Office' THEN 0 
                    ELSE 1 
                END, 
            COALESCE(b2.name, b1.name), 
            position_id, 
            id;
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

    static async update(id, { first_name, last_name, address, phone, nic, email, username, position_id }) {
        const query = `
            UPDATE employee 
            SET first_name = ?, last_name = ?, address = ?, phone = ?, nic = ?, email = ?, username = ?, position_id = ?
            WHERE id = ?
        `;
        await db.query(query, [first_name, last_name, address, phone, nic, email, username, position_id, id]);
    }

    static async updateGeneralEmployee(employeeId, branch_id, supervisor_id) {
        const query = 'UPDATE general_employee SET branch_id = ?, supervisor_id = ? WHERE employee_id = ?';
        await db.query(query, [branch_id, supervisor_id, employeeId]);
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
        return employees[0];  
    }

    // Find employee by username
    static async findByUsername(username) {
        const query = 'SELECT * FROM employee WHERE username = ?';
        const [results] = await db.query(query, [username]);
        return results[0];  
    }

    // Find employee by email
    static async findPositionEmployee(username) {
        const query = `
            SELECT p.name AS position
            FROM employee e
            JOIN position p ON e.position_id = p.id
            WHERE e.username = ?;
        `;
        const [result] = await db.query(query, [username]);
        return result[0];  
    }
}

module.exports = Employee;
