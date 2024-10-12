const db = require('../config/db');

class Branch {
    static async findAll() {
        const query = 'SELECT id, name, branch_address, contact_number FROM branch';
        const [branches] = await db.query(query);
        return branches;
    }

    static async create({ name, branch_address, contact_number }) {
        const query = 'INSERT INTO branch (name, branch_address, contact_number) VALUES (?, ?, ?)';
        await db.query(query, [name, branch_address, contact_number]);
    }

    static async update({ currentName, newName, branch_address, contact_number }) {
        const query = 'UPDATE branch SET name = ?, branch_address = ?, contact_number = ? WHERE name = ?';
        await db.query(query, [newName, branch_address, contact_number, currentName]);
    }

    static async findById(id) {
        const query = 'SELECT * FROM branch WHERE id = ?';
        const [branch] = await db.query(query, [id]);
        return branch[0];
    }

    static async findByName(name) {
        const query = 'SELECT id FROM branch WHERE name = ?';
        const [branch] = await db.query(query, [name]);
        return branch[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM branch WHERE id = ?';
        await db.query(query, [id]);
    }
}

module.exports = Branch;
