const { validationResult } = require('express-validator');
const Branch = require('../models/Branch');

// Controller function to get branches
exports.getBranches = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const branches = await Branch.findAll();
        res.json(branches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server failed during fetching branches' });
    }
};

exports.addBranch = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, branch_address, contact_number } = req.body; 
    try {
        await Branch.create({ name, branch_address, contact_number });
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

    // Get the branch details from the request body
    const { currentName, newName, branch_address, contact_number } = req.body;  
    
    try {
        await Branch.update({ currentName, newName, branch_address, contact_number });
        res.json({ msg: 'Branch updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server failed during branch update' });
    }
};

exports.removeBranch = async (req, res) => {
    // Get the branch ID from the request parameters
    const { id } = req.params;  
    try {
        const branch = await Branch.findById(id);

        if (!branch) {
            return res.status(404).json({ msg: 'Branch not found' });
        }

        await Branch.delete(id);
        res.json({ msg: `Branch '${branch.name}' deleted successfully` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server failed during branch deletion' });
    }
};
