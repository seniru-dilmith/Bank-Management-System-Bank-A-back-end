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

    // Method to request a loan by calling the stored procedure
    static async requestLoan({ customerId, loanType, amount, duration }) {
        try {
            db.query('START TRANSACTION');
            const query = `CALL RequestLoan(?, ?, ?, ?);`;
            await db.query(query, [customerId, loanType, amount, duration]);
            db.query('COMMIT');
        } catch (error) {
            console.error('Error requesting loan:', error.message);
            db.query('ROLLBACK');
        }
    }

    // Method to get details of a specific loan application by loan ID and customer ID
    static async getLoanDetails(customerId, loanId) {
        const query = `CALL GetLoanDetails(?, ?);`;
        const [loanDetails] = await db.query(query, [customerId, loanId]);
        return loanDetails[0][0];
    }

    // Method for an employee to submit a loan request
    static async requestLoanByEmployee({ customerId, loanAmount, loanTerm, interestRate, branchId, typeId }) {
        try{
            db.query('START TRANSACTION');
            const query = `
            INSERT INTO loan (customer_id, loan_amount, loan_term, interest_rate, status, branch_id, type_id)
            VALUES (?, ?, ?, ?, 'pending', ?, ?)
        `;
        const [result] = await db.query(query, [customerId, loanAmount, loanTerm, interestRate, branchId, typeId]);
        db.query('COMMIT');
        return result;
        
        } catch (error) {
            console.error('Error requesting loan:', error.message);
            db.query('ROLLBACK');
        }
    }
    
    static async types() {
        const query = `SELECT * FROM loan_type`;
        const [types] = await db.query(query);
        return types;
    }
}

module.exports = Loan;
