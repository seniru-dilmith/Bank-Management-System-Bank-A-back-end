const db = require('../config/db');
const Branch = require('./Branch');


// Get a branch by ID
exports.getBranchById = async (id) => {
    const query = 'SELECT * FROM branch WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result[0];
};

// Get the branch ID for a specific branch manager
exports.getBranchIdByManager = async (managerId) => {
    const query = `
      SELECT branch_id 
      FROM manager_employee 
      WHERE manager_id = ?
    `;
    const [result] = await db.query(query, [managerId]);
    // Return the branch ID or null if not found
    return result.length > 0 ? result[0].branch_id : null; 
};

// Update a branch by ID
exports.updateBranch = async (id, branchData) => {
    const query = `
      UPDATE branch
      SET name = ?, branch_address = ?, contact_number = ?
      WHERE id = ?
    `;
    const { name, branch_address, contact_number } = branchData;
    const [result] = await db.query(query, [name, branch_address, contact_number, id]);
    return result;
};

// Get positions list
exports.getPositions = async () => {
    const query = 'SELECT id, name AS title FROM position WHERE name != "Branch Manager"';
    const [result] = await db.query(query);
    return result;
}

// Update branch details
exports.updateBranchDetails = async (branchId, branchData) => {
    const query = `
      UPDATE branch
      SET name = ?, branch_address = ?, contact_number = ?
      WHERE id = ?
    `;
    const { name, branch_address, contact_number } = branchData;
    const [result] = await db.query(query, [name, branch_address, contact_number, branchId]);
    return result;
};
