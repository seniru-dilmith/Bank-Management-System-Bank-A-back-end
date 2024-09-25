const { check } = require('express-validator');

exports.branchValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('contact_number', 'Phone is required').not().isEmpty(),
];

exports.updateBranchValidation = [
    check('id').isInt().withMessage('Branch ID must be an integer'),
    ...exports.branchValidation,
]
