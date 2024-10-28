const db = require('../config/db'); // Ensure correct path to your database connection

class Report {
  // Call stored procedure to get branch-wise transactions within a time range
  static async getBranchTransactions(emp_id, start_date, end_date) {
    const [results] = await db.query(
      'CALL get_branch_transactions(?, ?, ?)', 
      [emp_id, start_date, end_date]
    );
    return results[1]; // First result set contains the transactions
  }

  // Call stored procedure to get branch-wise late loan installments
  static async getLateLoanInstallments(emp_id) {
    const [results] = await db.query(
      'CALL branch_wise_late_installments(?)', 
      [emp_id] // Use employee ID to fetch late installments
    );
    return results[1]; // First result set contains the loan installments
  }
}

module.exports = Report;
