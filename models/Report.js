const db = require('../config/db'); 

class Report {
  // Call stored procedure to get branch-wise transactions within a time range
  static async getBranchTransactions(emp_id, start_date, end_date) {
    const [results] = await db.query(
      'CALL get_branch_transactions(?, ?, ?)', 
      [emp_id, start_date, end_date]
    );
    return results[1]; 
  }

  // Call stored procedure to get branch-wise late loan installments
  static async getLateLoanInstallments(emp_id) {
    const [results] = await db.query(
      'CALL branch_wise_late_installments(?)', 
      [emp_id] 
    );
    return results[1];
  }
}

module.exports = Report;
