const express = require('express');
const router = express.Router();
const { getAccountSummaries } = require('../controllers/accountSummaryController');

// Route to get account summaries
router.get('/accounts/summaries', getAccountSummaries);

module.exports = router;
