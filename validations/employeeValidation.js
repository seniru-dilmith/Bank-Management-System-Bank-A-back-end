const { check } = require('express-validator');

exports.addEmployeeValidation = [
    check('first_name')
        .not()
        .isEmpty()
        .withMessage('First name is required')
        .isAlpha()
        .withMessage('First name should contain only letters')
        .isLength({ min: 2 })
        .withMessage('First name should be at least 2 characters long'),
    
    check('last_name')
        .not()
        .isEmpty()
        .withMessage('Last name is required')
        .isAlpha()
        .withMessage('Last name should contain only letters')
        .isLength({ min: 2 })
        .withMessage('Last name should be at least 2 characters long'),
    
    check('phone')
        .not()
        .isEmpty()
        .withMessage('Phone number is required'),

    check('nic')
        .not()
        .isEmpty()
        .withMessage('NIC is required')
        .isLength({ min: 10, max: 12 })
        .withMessage('NIC must be between 10 and 12 characters long'),

    check('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),

    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),

    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    check('position_id')
        .not()
        .isEmpty()
        .withMessage('Position is required')
        .isInt()
        .withMessage('Position ID must be an integer'),

    check('branch_id')
        .not()
        .isEmpty()
        .withMessage('Branch is required')
        .isInt()
        .withMessage('Branch ID must be an integer')
];

exports.updateEmployeeValidation = [
    check('id').isInt().withMessage('Employee ID must be an integer'),
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('nic', 'NIC is required').not().isEmpty(),
    check('email', 'Email is required').isEmail().withMessage('Must be a valid email'),
    check('username', 'Username is required').not().isEmpty(),
    // Only validate password if it's provided
    check('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

