const express = require('express');
const { login, changePassword, changeName, changeAddress } = require('../controllers/authController');
const { loginValidation, changePasswordValidation, changeNameValidation, changeAddressValidation } = require('../validations/authValidation');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router(); 

// Route to login a user
router.post('/login', loginValidation, login);

// Route to change password
router.post('/change-password', authMiddleware, changePasswordValidation, changePassword);

// Route to change name
router.post('/change-name', authMiddleware, changeNameValidation, changeName);

// Route to change address
router.post('/change-address', authMiddleware, changeAddressValidation, changeAddress);

module.exports = router;
