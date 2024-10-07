const db = require('../config/db');

// Get all branches
const getAllBranches = async () => {
    const query = 'SELECT * FROM branch';
    const [branches] = await db.query(query); 
    return branches;
};

// Get a branch by ID
const getBranchById = async (id) => {
    const query = 'SELECT * FROM branch WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result[0];
};


// Create a new branch with a manager
const createBranch = async (branchData) => {
    const query = `
      INSERT INTO branch (name, branch_address, contact_number)
      VALUES (?, ?, ?)
    `;
    const { name, branch_address, contact_number } = branchData;
    const [result] = await db.query(query, [name, branch_address, contact_number]);
    return result.insertId;
};

// Update a branch by ID
const updateBranch = async (id, branchData) => {
    const query = `
      UPDATE branch
      SET name = ?, branch_address = ?, contact_number = ?
      WHERE id = ?
    `;
    const { name, branch_address, contact_number } = branchData;
    const [result] = await db.query(query, [name, branch_address, contact_number, id]);
    return result;
};

// Delete a branch by ID
const deleteBranch = async (id) => {
    const query = 'DELETE FROM branch WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result;
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};
