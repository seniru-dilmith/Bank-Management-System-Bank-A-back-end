const express = require('express');
const { login } = require('../controllers/authController');
const { loginValidation } = require('../validations/authValidation')

const router = express.Router(); // Initialize express router

// Route to login a user
router.post('/login', loginValidation, login);

module.exports = router;
