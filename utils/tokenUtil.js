const jwt = require('jsonwebtoken');


// Generate a JWT token for a user
exports.generateToken = (user) => {
    return jwt.sign(
        // Payload
        {
            id: user.id,
            username: user.username,
            email: user.email,
            userType: user.userType,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',  // Token expires in 1 hour
        }
    );
};

// Verify a JWT token   
exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET); 
}