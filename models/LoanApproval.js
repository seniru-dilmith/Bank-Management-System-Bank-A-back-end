const db = require('../config/db');

class LoanApproval {
    // Method to fetch all pending loan applications
    static async findPendingLoans() {
        const query = `CALL GetPendingLoans();`; 
        const [loans] = await db.query(query);
        return loans[0];  
    }

    // Method to update loan status to 'approved' or 'rejected'
    static async updateLoanStatus(loanId, newStatus) {
        const query = `CALL UpdateLoanStatus(?, ?);`;  
        const [result] = await db.query(query, [loanId, newStatus]);
        return result;  
    }
}

module.exports = LoanApproval;
