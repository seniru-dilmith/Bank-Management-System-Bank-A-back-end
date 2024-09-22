const express = require('express');
const { login, changePassword, changeName } = require('../controllers/authController');
const { loginValidation, changePasswordValidation, changeNameValidation } = require('../validations/authValidation');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router(); // Initialize express router

// Route to login a user
router.post('/login', loginValidation, login);

// Route to change password
router.post('/change-password', authMiddleware, changePasswordValidation, changePassword);

// Route to change name
router.post('/change-name', authMiddleware, changeNameValidation, changeName);

module.exports = router;
