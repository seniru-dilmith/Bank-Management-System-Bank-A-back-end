const express = require('express');
const router = express.Router();
const { getCustomerAccounts,
    getCustomerAccount,
    addCustomerAccount,
    updateCustomerAccount,
    deleteCustomerAccount} = require('../controllers/customerAccountController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for customerAccount management
router.get('/summaries', getCustomerAccounts);   // Get all customerAccounts
router.get('/summaries/:id', getCustomerAccount); // Get customerAccount by ID
// Add a new customer account
router.post('/add', addCustomerAccount);
// Update customer account
router.put('/update/:id', updateCustomerAccount);
// Delete customer account
router.delete('/delete/:id', deleteCustomerAccount);


module.exports = router;
