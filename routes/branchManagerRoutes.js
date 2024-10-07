const express = require('express');
const router = express.Router();
const branchManagerController = require('../controllers/branchManagerController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for BranchManager management
router.get('/', branchManagerController.getBranchManagers);   // Get all BranchManagers
router.get('/:id', branchManagerController.getBranchManagerById); // Get BranchManager by ID
router.post('/', branchManagerController.addBranchManager); // Create new BranchManager
router.put('/:id',branchManagerController.updateBranchManager); // Update BranchManager
router.delete('/:id', branchManagerController.deleteBranchManager); // Delete BranchManager

module.exports = router;
