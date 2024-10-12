const { check } = require('express-validator');

// Validation rules for requesting a loan
exports.requestLoanValidation = [
    check('loanType', 'Loan type is required').isInt(),
    check('amount', 'Loan amount is required and must be a positive number').isFloat({ min: 0.01 }),
    check('duration', 'Loan duration is required and must be a positive number').isInt({ min: 1 }),
];

