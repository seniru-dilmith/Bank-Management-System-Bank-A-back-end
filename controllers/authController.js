// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Dummy function for login
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Authenticate user (this is just a placeholder)
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
};

// Dummy function for register
exports.register = (req, res) => {
    const { username, password } = req.body;

    // Hash the password and save the user (this is just a placeholder)
    const hashedPassword = bcrypt.hashSync(password, 8);
    // Save user to database (dummy placeholder)
    res.json({ message: 'User registered', username, password: hashedPassword });
};
