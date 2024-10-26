const express = require('express');
const router = express.Router();
const { getBranchManagerById, updateBranchOfManager, getBranchIdByManager, getPositions, getBranchOfManager } = require('../controllers/branchManagerController');
const { getTransactionReport, getLateLoanReport } = require('../controllers/reportController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { branchManagerMiddleware } = require('../middleware/branchManagerMiddleware');
const { route } = require('./authRoutes');

// Routes for BranchManager management
router.get('/get-branch/:id', authMiddleware, branchManagerMiddleware, getBranchManagerById); // Get BranchManager by ID

router.get('/get-branch-details', authMiddleware, branchManagerMiddleware, getBranchOfManager); // Get Branch details

router.get('/get-positions', authMiddleware, branchManagerMiddleware, getPositions); // get positions list

router.get('/get-branch-id', authMiddleware, branchManagerMiddleware, getBranchIdByManager); // get barnch id of a manager

router.put('/update-branch-details/:id', authMiddleware, branchManagerMiddleware, updateBranchOfManager); // Update Branch details of a specific BranchManager

router.get('/transaction-report', authMiddleware, branchManagerMiddleware, getTransactionReport); // Get transaction report

router.get('/late-loan-report', authMiddleware, branchManagerMiddleware, getLateLoanReport);  // Get late loan report

module.exports = router;
