const express = require('express');
const router = express.Router();
const {addBranchManager,
    getBranchManagers,
    getBranchManagerById,
    updateBranchManager,
    deleteBranchManager,} = require('../controllers/branchManagerController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for BranchManager management
router.get('/get-branches', getBranchManagers);   // Get all BranchManagers
router.get('/get-branch/:id', getBranchManagerById); // Get BranchManager by ID
router.post('/add', addBranchManager); // Create new BranchManager
router.put('/update/:id',updateBranchManager); // Update BranchManager
router.delete('/delete/:id', deleteBranchManager); // Delete BranchManager

module.exports = router;
