const db = require('../config/db');

class LoanApproval {
    // Method to fetch all pending loan applications
    static async findPendingLoans() {
        const query = `
            SELECT loan.id AS loanId, loan_type.type_name AS loanType, loan.loan_amount, loan.loan_term, 
                   CONCAT(customer.first_name, ' ', customer.last_name) AS customerName, loan.status
            FROM loan
            JOIN loan_type ON loan.type_id = loan_type.id
            JOIN customer ON loan.customer_id = customer.id
            WHERE loan.status = 'pending'
        `;
        const [loans] = await db.query(query);
        return loans;
    }

    // Method to update loan status to 'approved' or 'rejected'
    static async updateLoanStatus(loanId, newStatus) {
        const query = `
            UPDATE loan
            SET status = ?
            WHERE id = ? AND status = 'pending'
        `;
        const [result] = await db.query(query, [newStatus, loanId]);
        return result;
    }
}

module.exports = LoanApproval;
