const db = require('../config/db');
const { validationResult } = require('express-validator');

// Controller function to get branches
exports.getBranches = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const query = 'SELECT id, name, branch_address, contact_number FROM branch';
        const [branches] = await db.query(query);  // Execute the query to get all branches
        res.json(branches);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server failed during fetching branches' });
    }
};

exports.addBranch = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, branch_address, contact_number } = req.body;  // Get the branch details from the request body
    try {
        const query = `
        INSERT INTO branch (name, branch_address, contact_number) 
        VALUES 
        (?, ?, ?)
        `;  // Query to insert a new branch

        await db.query(query, [name, branch_address, contact_number]);  // Execute the query to insert a new branch
        res.json({ msg: 'Branch created successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server failed during branch creation' });
    }
};

exports.updateBranch = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, branch_address, contact_number } = req.body;  // Get the branch details from the request body

    try {
        const query = `
        UPDATE branch 
        SET name = ?, 
        branch_address = ?, 
        contact_number = ?
        WHERE id = ?
        `;

        await db.query(query, [name, branch_address, contact_number, id]); // Execute the query to update the branch
        res.json({ msg: 'Branch updated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server failed during branch update' });
    }
};

exports.removeBranch = async (req, res) => {
    const { id } = req.params;  // Get the branch ID from the request parameters

    try {
        const [branch] = await db.query('SELECT * FROM branch WHERE id = ?', [id]);  // Query to get the branch details

        const query = `
        DELETE FROM branch
        WHERE id = ?
        `;

        db.query(query, [id]); // Execute the query to delete the branch

        res.json({ msg: `Branch '${branch[0].name}' deleted successfully` });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server failed during branch deletion' });
    }
}
