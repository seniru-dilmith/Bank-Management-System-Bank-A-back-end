const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');
const loanRoutes = require('../routes/loanRoutes');
const branchManagementRoutes = require('../routes/branchManagementRoutes');
const customerAccountRoutes = require('../routes/customerAccountRoutes');
const employeeRoutes = require('../routes/employeeRoutes');
const employeeRoutesForTechnician = require('../routes/employeeRoutesForTechnician');
const branchManagerRoutes = require('../routes/branchManagerRoutes');
const loanApprovalRoutes = require('../routes/loanApprovalRoutes');
const accountSummaryRoutes = require('../routes/accountSummaryRoutes'); 
const transactionRoutes = require('../routes/transactionRoutes');

dotenv.config();
const app = express();

// Parse JSON request bodies
app.use(express.json()); 

// use the auth routes
app.use('/auth', authRoutes);

// use the loan routes
app.use('/loans', loanRoutes);

// use the transaction routes
app.use('/transactions', transactionRoutes);

// use the branch management routes
app.use('/branch-management', branchManagementRoutes);

// use the employee routes
app.use('/employee', employeeRoutes);

// use the customer account routes
app.use('/customer-account', customerAccountRoutes);

// use the branch-manager routes
app.use('/branch-manager', branchManagerRoutes);

// use the employee management routes
app.use('/employee-management', employeeRoutesForTechnician);

// use the loan approval routes
app.use('/loan-approval', loanApprovalRoutes);

// Use the account summary routes
app.use('/accounts', accountSummaryRoutes); 


module.exports = app;