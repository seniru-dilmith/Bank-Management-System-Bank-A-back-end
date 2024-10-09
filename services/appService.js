const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');
const loanRoutes = require('../routes/loanRoutes');
const branchManagementRoutes = require('../routes/branchManagementRoutes');
const customerAccountRoutes = require('../routes/customerAccountRoutes');
const transactionRoutes = require('../routes/transactionRoutes');
const { authMiddleware } = require('../middleware/authMiddleware');

dotenv.config();
const app = express();

app.use(express.json()); // Parse JSON request bodies

// use the auth routes
app.use('/auth', authRoutes);

// use the loan routes
app.use('/loans', loanRoutes);

// use the branch management routes
app.use('/branch-management', branchManagementRoutes);


// use the employee routes
app.use('/employee', employeeRoutes);
// use the customer account routes
app.use('/customer-account', customerAccountRoutes);
// use the transaction routes
app.use('/transaction', transactionRoutes);
// use the branch-manager routes
app.use('/branch-manager', branchManagerRoutes);

// sample protected route
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'this route is protected', user: req.user });
});

// dashboard route
app.get('/dashboard', authMiddleware, (req, res) => {
    if(req.user.userType === 'employee') {

        res.json({ msg: 'welcome to the employee dashboard' });

    } else if(req.user.userType === 'customer') {

        res.json({ msg: 'welcome to the customer dashboard' });

    } else {
        res.status(400).json({ msg: 'invalid user type' });
    }
});

// employee only route for loans
app.get('/loans', authMiddleware, (req, res) => {
    if(req.user.userType !== 'employee') {
        return res.status(401).json({ msg: 'access denied' });
    }

    res.json({ msg: 'loan management dashboard is here' });
});

module.exports = app;