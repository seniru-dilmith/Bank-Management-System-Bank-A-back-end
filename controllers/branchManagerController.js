const branchManagerModel = require('../models/BranchManagerModel');

// Add a new Branch with Manager
const addBranchManager = async (req, res) => {
  const { branch_name, branch_address, contact_number } = req.body;

  try {
    await branchManagerModel.addBranchManager(branch_name, branch_address, contact_number);
    res.status(201).send({ message: 'Branch Manager added successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error adding Branch Manager', error: err.message });
  }
};

// Get all Branches with Managers
const getBranchManagers = async (req, res) => {
  try {
    const [branchManagers] = await branchManagerModel.getAllBranches();
    res.status(200).json(branchManagers);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching Branch Managers', error: err.message });
  }
};

// Get a Branch Manager by Branch ID
const getBranchManagerById = async (req, res) => {
  const branch_id = req.params.id;

  try {
    const [branchManager] = await branchManagerModel.getBranchById(branch_id);
    if (!branchManager.length) {
      return res.status(404).send({ message: 'Branch Manager not found' });
    }
    res.status(200).json(branchManager);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching Branch Manager', error: err.message });
  }
};

// Update a Branch Manager by Branch ID
const updateBranchManager = async (req, res) => {
  const branch_id = req.params.id;
  const branchData = req.body;

  try {
    const result = await branchManagerModel.updateBranch(branch_id, branchData);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Branch Manager not found' });
    }
    res.status(200).send({ message: 'Branch Manager updated successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error updating Branch Manager', error: err.message });
  }
};

// Delete a Branch Manager by Branch ID
const deleteBranchManager = async (req, res) => {
  const branch_id = req.params.id;

  try {
    const result = await branchManagerModel.deleteBranch(branch_id);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Branch Manager not found' });
    }
    res.status(200).send({ message: 'Branch Manager deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting Branch Manager', error: err.message });
  }
};

module.exports = {
  addBranchManager,
  getBranchManagers,
  getBranchManagerById,
  updateBranchManager,
  deleteBranchManager,
};
