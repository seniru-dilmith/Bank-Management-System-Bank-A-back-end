const express = require('express');
const router = express.Router();
const { 
    getCustomerAccountsByBranch} = require('../controllers/customerAccountController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for customerAccount management

router.get('/summaries/branch/:branchId', getCustomerAccountsByBranch); // Get customerAccount by ID



module.exports = router;
