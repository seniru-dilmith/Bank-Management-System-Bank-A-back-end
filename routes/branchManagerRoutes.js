const express = require('express');
const router = express.Router();
const { getBranchManagerById, updateBranchOfManager, getBranchIdByManager, getPositions, getBranchOfManager } = require('../controllers/branchManagerController');
const { getTransactionReport, getLateLoanReport } = require('../controllers/reportController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { branchManagerMiddleware } = require('../middleware/branchManagerMiddleware');
const { route } = require('./authRoutes');

// Get BranchManager by ID
router.get('/get-branch/:id', authMiddleware, branchManagerMiddleware, getBranchManagerById); 

// Get Branch details
router.get('/get-branch-details', authMiddleware, branchManagerMiddleware, getBranchOfManager); 

// Get positions list
router.get('/get-positions', authMiddleware, branchManagerMiddleware, getPositions); 

// Get barnch id of a manager
router.get('/get-branch-id', authMiddleware, branchManagerMiddleware, getBranchIdByManager); 

// Update Branch details of a specific BranchManager
router.put('/update-branch-details/:id', authMiddleware, branchManagerMiddleware, updateBranchOfManager); 

// Get transaction report
router.get('/transaction-report', authMiddleware, branchManagerMiddleware, getTransactionReport); 

// Get late loan report
router.get('/late-loan-report', authMiddleware, branchManagerMiddleware, getLateLoanReport);  

module.exports = router;
