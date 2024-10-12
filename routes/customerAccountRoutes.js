const express = require('express');
const router = express.Router();
const { 
    getCustomerAccountsByBranch} = require('../controllers/customerAccountController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { employeeMiddleware } = require('../middleware/employeeMiddleware');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for customerAccount management
router.get('/summaries/branch/:branchId', authMiddleware,employeeMiddleware, getCustomerAccountsByBranch); // Get customerAccount by ID

module.exports = router;
