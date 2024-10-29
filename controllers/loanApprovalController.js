const LoanApproval = require('../models/LoanApproval');

// Controller to list all pending loan applications
exports.getPendingLoans = async (req, res) => {
    try {
        const loans = await LoanApproval.findPendingLoans();

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
    const { loanId, action } = req.body; 

    if (!loanId || !['approve', 'reject'].includes(action)) {
        return res.status(400).json({ msg: 'Invalid loan ID or action' });
    }

    try {
        const newStatus = action === 'approve' ? 'approved' : 'rejected';

        const result = await LoanApproval.updateLoanStatus(loanId, newStatus);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Loan application not found or already processed' });
        }

        res.json({ msg: `Loan application ${newStatus} successfully` });
    } catch (error) {
        console.error('Error updating loan status:', error);
        res.status(500).json({ msg: 'Failed to update loan status' });
    }
};
