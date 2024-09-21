const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/tokenUtil');
const db = require('../config/db');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    //validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });        
    }

    try {

        // qurying the database for the employees
        const [employeeResults] = await db.query('SELECT * FROM employee WHERE username = ?', [username]);

        // qurying the database for the customers
        const [customerResults] = await db.query('SELECT * FROM customer WHERE username = ?', [username]);

        let user = null;
        let userType = '';

        // check if the user is an employee or a customer
        if(employeeResults.length > 0) {
            user = employeeResults[0];
            userType = 'employee';
            
        } else if(customerResults.length > 0) {
            user = customerResults[0];
            userType = 'customer';
        }

        if(!user) {  // If the user is not found
            return res.status(400).json({ msg: 'user not found' });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {  // If the password is incorrect
            return res.status(400).json({ msg: 'invalid credentials' });
        }

        user.userType = userType;

        // Generate a JWT token for the user
        const token = generateToken(user);
        res.json({ token, userType });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'server failed during query' });
    }

}