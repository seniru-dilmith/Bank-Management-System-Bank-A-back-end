const db = require('../config/db');

class Loan {
    static async findByCustomerId(customerId) {
        const query = `
            SELECT lt.type_name AS loanType, l.loan_amount AS amountBorrowed, 
                   (l.loan_amount - COALESCE(SUM(li.paid), 0)) AS outstandingBalance, 
                   MIN(li.next_due_date) AS nextPaymentDate, l.status
            FROM loan l
            JOIN loan_type lt ON l.type_id = lt.id
            LEFT JOIN loan_installment li ON l.id = li.loan_id AND (li.paid = 0 OR li.paid IS NULL)
            WHERE l.customer_id = ?
            GROUP BY l.id, lt.type_name, l.loan_amount, l.status
        `;
        const [loans] = await db.query(query, [customerId]);
        return loans;
    }

        // Method to request a loan by inserting the data into the loan table
    static async requestLoan({ customerId, loanType, amount, duration }) {
        const query = `
            INSERT INTO loan (customer_id, type_id, loan_amount, loan_term, status)
            VALUES (?, ?, ?, ?, 'pending')
        `;
        await db.query(query, [customerId, loanType, amount, duration]);
    }

    // Method to get details of a specific loan application by loan ID and customer ID
    static async getLoanDetails(customerId, loanId) {
        const query = `
            SELECT l.id AS loanId, 
                   lt.type_name AS loanType, 
                   l.status AS loanStatus, 
                   l.start_date AS applicationDate
            FROM loan l
            JOIN loan_type lt ON l.type_id = lt.id
            WHERE l.customer_id = ? AND l.id = ?
        `;
        const [loanDetails] = await db.query(query, [customerId, loanId]);
        return loanDetails[0];
    }
    
}

module.exports = Loan;
