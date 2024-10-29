const Branch = require('../models/Branch');
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

// Get branch details
exports.getBranchDetails = async (req, res) => {
  const branch_id = req.params.id;

  try {
    const branch = await branchManagerModel.getBranchById(branch_id);
    if (!branch) {
      return res.status(404).send({ message: 'Branch not found' });
    }
    res.status(200).json(branch);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching branch', error: err.message });
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

// Update Branch Details of logged in Branch Manager
exports.getBranchOfManager = async (req, res) => {
  const manager_id = req.user.id;

  try {
    const branchDetails = await Branch.findById(manager_id);
    if (!branchDetails) {
      return res.status(404).send({ message: 'No branch associated with this manager' });
    }
    res.status(200).json(branchDetails);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching Branch', error: err.message });
  }
};

// Update a Branch by Branch ID
exports.updateBranchOfManager = async (req, res) => {
  const branch_id = req.params.id;
  const { name, branch_address, contact_number } = req.body; 
  
  try {
    // Call the update method and check if any rows were affected
    await Branch.updateById({ 
      branch_id, 
      newName: name, 
      branch_address, 
      contact_number 
    });
    res.status(200).json({ message: 'Branch updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating Branch', error: err.message });
  }
};

