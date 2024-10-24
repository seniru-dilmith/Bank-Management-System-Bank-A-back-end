const branchManagerModel = require('../models/BranchManagerModel');

// Get a Branch Manager by Branch ID
exports.getBranchManagerById = async (req, res) => {
  const branch_id = req.params.id;

  try {
    const branchManager = await branchManagerModel.getBranchById(branch_id);
    if (!branchManager) {
      return res.status(404).send({ message: 'Branch Manager not found' });
    }
    res.status(200).json(branchManager);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching Branch Manager', error: err.message });
  }
};

// Get the list of positions
exports.getPositions = async (req, res) => {
  try {
    const positions = await branchManagerModel.getPositions();
    res.status(200).json(positions);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching positions', error: err.message });
  }
};

// Get the Branch ID for a specific Branch Manager
exports.getBranchIdByManager = async (req, res) => {
  const manager_id = req.user.id;

  try {
    const branchId = await branchManagerModel.getBranchIdByManager(manager_id);
    if (!branchId) {
      return res.status(404).send({ message: 'Branch ID not found' });
    }
    res.status(200).json({ branch_id: branchId });
  } catch (err) {
    res.status(500).send({ message: 'Error fetching Branch ID', error: err.message });
  }
};

// Update a Branch Manager by Branch ID
exports.updateBranchOfManager = async (req, res) => {
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
