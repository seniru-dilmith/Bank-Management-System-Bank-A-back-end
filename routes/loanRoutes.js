const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getCustomerLoans } = require('../controllers/loanController');

// Route to get loans for the logged-in customer
router.get('/customer-loans', authMiddleware, getCustomerLoans);

module.exports = router;
