const db = require('../config/db');

// Controller to list all pending loan applications
exports.getPendingLoans = async (req, res) => {
    try {
        // Query to get all loans with status 'pending'
        const [loans] = await db.query(`
            SELECT loan.id AS loanId, loan_type.type_name AS loanType, loan.loan_amount, loan.loan_term, concat(customer.first_name, ' ', customer.last_name) AS customerName, loan.status
            FROM loan
            JOIN loan_type ON loan.type_id = loan_type.id
            JOIN customer ON loan.customer_id = customer.id
            WHERE loan.status = 'pending'
        `);

        if (loans.length === 0) {
            return res.status(404).json({ msg: 'No pending loan applications found' });
        }

        res.json(loans);
    } catch (error) {
        console.error('Error fetching pending loans:', error);
        res.status(500).json({ msg: 'Failed to fetch pending loan applications' });
    }
};

// Controller to approve or reject a loan application
exports.updateLoanStatus = async (req, res) => {
    const { loanId, action } = req.body;  // 'action' can be 'approve' or 'reject'

    if (!loanId || !['approve', 'reject'].includes(action)) {
        return res.status(400).json({ msg: 'Invalid loan ID or action' });
    }

    try {
        const newStatus = action === 'approve' ? 'approved' : 'rejected';

        // Query to update the loan status
        const [result] = await db.query(`
            UPDATE loan
            SET status = ?
            WHERE id = ? AND status = 'pending'`,
            [newStatus, loanId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Loan application not found or already processed' });
        }

        res.json({ msg: `Loan application ${newStatus} successfully` });
    } catch (error) {
        console.error('Error updating loan status:', error);
        res.status(500).json({ msg: 'Failed to update loan status' });
    }
};
