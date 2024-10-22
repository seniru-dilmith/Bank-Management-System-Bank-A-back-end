const db = require('../config/db');


// Get a branch by ID
const getBranchById = async (id) => {
    const query = 'SELECT * FROM branch WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result[0];
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


module.exports = {
    getBranchById,
    updateBranch
};
