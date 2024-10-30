const db = require('../config/db');

class Customer {
    static async findByUsername(username) {
        const [results] = await db.query('SELECT * FROM customer WHERE username = ?', [username]);
        return results.length ? results[0] : null;
    }

    static async findById(id) {
        const [results] = await db.query('SELECT * FROM customer WHERE id = ?', [id]);
        return results.length ? results[0] : null;
    }

    static async updatePassword(id, newPassword) {
        await db.query('UPDATE customer SET password = ? WHERE id = ?', [newPassword, id]);
    }

    static async updateName(id, firstName, lastName) {
        await db.query('UPDATE customer SET first_name = ?, last_name = ? WHERE id = ?', [firstName, lastName, id]);
    }

    static async updateAddress(id, newAddress) {
        await db.query('UPDATE customer SET address = ? WHERE id = ?', [newAddress, id]);
    }

    static async findAllCustomers() {
        const [results] = await db.query('SELECT * FROM customer_details');
        return results;
    }
}

module.exports = Customer;
