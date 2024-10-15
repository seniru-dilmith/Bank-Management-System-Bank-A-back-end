const db = require('../config/db');

class LoanApproval {
    // Method to fetch all pending loan applications
    static async findPendingLoans() {
        const query = `CALL GetPendingLoans();`; // Call the stored procedure
        const [loans] = await db.query(query);
        return loans[0];  // Accessing the result set returned by the procedure
    }

    // Method to update loan status to 'approved' or 'rejected'
    static async updateLoanStatus(loanId, newStatus) {
        const query = `CALL UpdateLoanStatus(?, ?);`;  // Call the stored procedure
        const [result] = await db.query(query, [loanId, newStatus]);
        return result;  // Return the result of the operation
    }
}

module.exports = LoanApproval;
