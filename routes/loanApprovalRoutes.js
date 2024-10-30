const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { branchManagerMiddleware } = require('../middleware/branchManagerMiddleware');
const { getPendingLoans, updateLoanStatus } = require('../controllers/loanApprovalController');

// Route to list all pending loan applications
router.get('/pending-loans', authMiddleware, branchManagerMiddleware, getPendingLoans);

// Route to approve or reject a loan application
router.put('/update-loan-status', authMiddleware, branchManagerMiddleware, updateLoanStatus);

module.exports = router;
