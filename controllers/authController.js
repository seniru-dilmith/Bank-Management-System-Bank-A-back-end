const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/tokenUtil');
const db = require('../config/db');

// Login a user
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

// Change password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    //validating input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let userTable = req.user.userType === 'employee' ? 'employee' : 'customer';  // Get the user table based on the user type
        const [userResults] = await db.query(`SELECT * FROM ${userTable} WHERE id = ?`, [userId]);

        const user = userResults[0];

        const isMatched = await bcrypt.compare(oldPassword, user.password);  // Compare the current password with the password in the database
        if(!isMatched) {
            return res.status(400).json({ msg: 'invalid current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);  // Hash the new password

        await db.query(`UPDATE ${userTable} SET password = ? WHERE id = ?`, [hashedPassword, userId]);

        return res.json({ msg: 'pssword updated successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'server failed during password update query' });
    }
}

// Change name
exports.changeName = async (req, res) => {
    const { newName } = req.body;
    const userId = req.user.id;  // user from jwt token

    const errors = validationResult(req);  // Validate the input

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const nameParts = newName.split(' '); // Split the name 

        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');  // Get the last name from concatenating the rest of the parts

        let userTable = req.user.userType === 'employee' ? 'employee' : 'customer';  // Get the user table based on the user type
        await db.query(`UPDATE ${userTable} SET first_name = ?, last_name= ? WHERE id = ?`, [firstName, lastName, userId]);

        return res.json({ msg: 'name updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'server failed during name update query' });
    }
}

exports.changeAddress = async (req, res) => {
    const { newAddress } = req.body;
    const userId = req.user.id; // user from jwt token

    const errors = validationResult(req);  // Validate the input

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let userTable = req.user.userType === 'employee' ? 'employee' : 'customer'; // Get the user table based on the user type
        await db.query(`UPDATE ${userTable} SET address = ? WHERE id = ?`, [newAddress, userId]);

        return res.json({ msg: 'address updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'server failed during address update query' });
    }
}