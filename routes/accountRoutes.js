const express = require('express');
const router = express.Router();
const { getAccounts } = require('../controllers/accountController');

router.get('/accounts', getAccounts);

module.exports = router;
