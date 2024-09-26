const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { technicianMiddleware } = require('../middleware/technicianMiddleware');
const { getBranches, addBranch, updateBranch, removeBranch } = require('../controllers/branchController');

// Route to get all branches
router.get('/branches', authMiddleware, technicianMiddleware, getBranches);

// Route to add a new branch
router.post('/add-branch', authMiddleware, technicianMiddleware, addBranch);

// Route to update a branch
router.put('/update-branch', authMiddleware, technicianMiddleware, updateBranch);

// Route to remove a branch
router.delete('/remove-branch/:id', authMiddleware, technicianMiddleware, removeBranch);

module.exports = router;