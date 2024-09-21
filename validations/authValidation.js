const { check } = require('express-validator');

exports.loginValidation = [
    check('username', 'username is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
];