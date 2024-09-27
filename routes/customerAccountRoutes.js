const express = require('express');
const router = express.Router();
const customerAccountController = require('../controllers/customerAccountController');
// const { authMiddleware } = require('../middleware/authMiddleware'); // Protected routes

// Routes for customerAccount management
router.get('/summaries', customerAccountController.getCustomerAccounts);   // Get all customerAccounts
router.get('/summaries/:id', customerAccountController.getCustomerAccount); // Get customerAccount by ID

module.exports = router;
