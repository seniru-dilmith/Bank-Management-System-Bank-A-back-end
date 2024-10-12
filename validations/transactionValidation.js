const { check } = require('express-validator');

// Validation for the transaction
exports.transactionValidation = [
    check('fromAccount', 'From account is required').not().isEmpty(),
    check('beneficiaryAccount', 'Beneficiary account is required').not().isEmpty(),
    check('beneficiaryName', 'Beneficiary name is required').not().isEmpty(),
    check('amount', 'Amount is required and must be a positive number').isFloat({ gt: 0 }),
    check('receiverReference', 'Receiver reference is required').not().isEmpty(),
    check('myReference', 'Your reference is required').not().isEmpty(),
];
