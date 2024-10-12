const express = require('express');
const router = express.Router();
const {
    getBranchManagerById,
    updateBranchManager,} = require('../controllers/branchManagerController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for BranchManager management
router.get('/get-branch/:id', getBranchManagerById); // Get BranchManager by ID
router.put('/update/:id',updateBranchManager); // Update BranchManager

module.exports = router;
