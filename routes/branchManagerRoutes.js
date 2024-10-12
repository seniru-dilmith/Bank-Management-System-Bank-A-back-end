const express = require('express');
const router = express.Router();
const { getBranchManagerById, updateBranchOfManager } = require('../controllers/branchManagerController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { branchManagerMiddleware } = require('../middleware/branchManagerMiddleware');

// Routes for BranchManager management
router.get('/get-branch/:id', authMiddleware, branchManagerMiddleware, getBranchManagerById); // Get BranchManager by ID

router.put('/update/:id', authMiddleware, branchManagerMiddleware, updateBranchOfManager); // Update Branch details of a specific BranchManager

module.exports = router;
