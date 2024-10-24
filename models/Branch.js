const db = require("../config/db");

class Branch {
  static async findAll() {
    const query = "SELECT id, name, branch_address, contact_number FROM branch";
    const [branches] = await db.query(query);
    return branches;
  }

  static async create({ name, branch_address, contact_number }) {
    const checkQuery = `
            SELECT * FROM branch 
            WHERE name = ? OR branch_address = ? OR contact_number = ?
        `;
    const [existingBranch] = await db.query(checkQuery, [
      name,
      branch_address,
      contact_number,
    ]);

    if (existingBranch.length > 0) {
      throw new Error(
        "Branch with the same name, address, or contact number already exists"
      );
    }

    const insertQuery = `
            INSERT INTO branch (name, branch_address, contact_number) 
            VALUES (?, ?, ?)
        `;
    await db.query(insertQuery, [name, branch_address, contact_number]);
  }

  static async update({
    currentName,
    newName,
    branch_address,
    contact_number,
  }) {
    const checkQuery = "SELECT * FROM branch WHERE name = ?";
    const [branch] = await db.query(checkQuery, [currentName]);

    if (branch.length === 0) {
      throw new Error(`Branch with name: ${currentName} does not exist`);
    }

    const updateQuery = `
          UPDATE branch 
          SET name = ?, branch_address = ?, contact_number = ? 
          WHERE name = ?
        `;
    await db.query(updateQuery, [
      newName,
      branch_address,
      contact_number,
      currentName,
    ]);
  }

  static async updateById({ branch_id, newName, branch_address, contact_number}) {
    // Check if the branch with the given ID exists
    const checkQuery = "SELECT * FROM branch WHERE id = ?";
    const [branch] = await db.query(checkQuery, [branch_id]);

    if (branch.length === 0) {
      throw new Error(`Branch with ID: ${branch_id} does not exist`);
    }

    // Update the branch details
    const updateQuery = `
          UPDATE branch 
          SET name = ?, branch_address = ?, contact_number = ? 
          WHERE id = ?
        `;

    await db.query(updateQuery, [
      newName,
      branch_address,
      contact_number,
      branch_id,
    ]);
  }

  static async findById(id) {
    const query = "SELECT * FROM branch WHERE id = ?";
    const [branch] = await db.query(query, [id]);
    return branch[0];
  }

  static async findByName(name) {
    const query = "SELECT id FROM branch WHERE name = ?";
    const [branch] = await db.query(query, [name]);
    return branch[0];
  }

  static async delete(id) {
    const query = "DELETE FROM branch WHERE id = ?";
    await db.query(query, [id]);
  }
}

module.exports = Branch;
