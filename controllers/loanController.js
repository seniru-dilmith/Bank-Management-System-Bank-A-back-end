const db = require('../config/db');
const { validationResult } = require('express-validator');

// Controller function to get loans for the logged-in customer
exports.getCustomerLoans = async (req, res) => {

    //validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const customerId = req.user.id; // Get the customer ID from the request

        // Query to get loans along with the next unpaid installment (if any)
        const loansQuery = `
            SELECT lt.type_name AS loanType, l.loan_amount AS amountBorrowed, 
                   (l.loan_amount - COALESCE(SUM(li.paid), 0)) AS outstandingBalance, 
                   MIN(li.next_due_date) AS nextPaymentDate, l.status
            FROM loan l
            JOIN loan_type lt ON l.type_id = lt.id
            LEFT JOIN loan_installment li ON l.id = li.loan_id AND (li.paid = 0 OR li.paid IS NULL)
            WHERE l.customer_id = ?
            GROUP BY l.id, lt.type_name, l.loan_amount, l.status
        `;

        const [loans] = await db.query(loansQuery, [customerId]);

        if (loans.length === 0) {
            return res.status(404).json({ msg: 'No loans found for this customer' });
        }

        res.json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server failed during query' });
    }
};
