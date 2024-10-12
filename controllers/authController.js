const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/tokenUtil');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');

// Login a user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Query the database for the employees and customers using models
        const employee = await Employee.findByUsername(username);
        const customer = await Customer.findByUsername(username);

        let user = null;
        let userType = '';

        // Check if the user is an employee or a customer
        if (employee) {
            user = employee;
            userType = 'employee';
        } else if (customer) {
            user = customer;
            userType = 'customer';
        }

        if (!user) {  // If the user is not found
            return res.status(400).json({ msg: 'User not found' });
        }

        // Check if the password is correct
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {  // If the password is incorrect
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        user.userType = userType;

        // Generate a JWT token for the user
        const token = generateToken(user);
        res.json({ token, userType });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error during login' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Use the models based on user type
        const user = req.user.userType === 'employee' ? await Employee.findById(userId) : await Customer.findById(userId);

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Compare the current password with the one in the database
        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            return res.status(400).json({ msg: 'Invalid current password' });
        }

        // Hash the new password and update it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        if (req.user.userType === 'employee') {
            await Employee.updatePassword(userId, hashedPassword);
        } else {
            await Customer.updatePassword(userId, hashedPassword);
        }

        return res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error during password update' });
    }
};

// Change name
exports.changeName = async (req, res) => {
    const { newName, confirmNewName } = req.body;
    const userId = req.user.id;  // User from JWT token

    // Validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (newName !== confirmNewName)
        return res.status(400).json({ msg: 'Name and confirm name do not match' });

    try {
        const nameParts = newName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');

        // Update name based on user type
        if (req.user.userType === 'employee') {
            await Employee.updateName(userId, firstName, lastName);
        } else {
            await Customer.updateName(userId, firstName, lastName);
        }

        return res.json({ msg: 'Name updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error during name update' });
    }
};

// Change address
exports.changeAddress = async (req, res) => {
    const { newAddress } = req.body;
    const userId = req.user.id;  // User from JWT token

    // Validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Update address based on user type
        if (req.user.userType === 'employee') {
            await Employee.updateAddress(userId, newAddress);
        } else {
            await Customer.updateAddress(userId, newAddress);
        }

        return res.json({ msg: 'Address updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error during address update' });
    }
};
