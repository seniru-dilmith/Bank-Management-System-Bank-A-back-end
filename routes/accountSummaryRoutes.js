const express = require('express');
const router = express.Router();
const { getAccountSummary } = require('../controllers/accountSummaryController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Route to get account summary for the logged-in user
router.get('/account-summary', authMiddleware, getAccountSummary);

module.exports = router;
