const { verifyToken } = require('../utils/tokenUtil');

exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the Authorization header
    if (!token) {
        return res.status(401).json({ msg: 'token not found, authorization failed' });  // Return 401 if token is not found
    }

    try {
        const decoded = verifyToken(token); // verify the token
        req.user = decoded; // Set the user in the request object
        next(); // continue
        
    } catch (error) {
        res.status(401).json({ msg: 'token is not valid'})
    }
}