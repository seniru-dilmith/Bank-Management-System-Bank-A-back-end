const db = require('../config/db');

exports.technicianMiddleware = async (req, res, next) => {
    try {
        const userID = req.user.id;

        const [results] = await db.query(`
            SELECT p.name
            FROM employee e 
            JOIN position p ON e.position_id=p.id
            WHERE e.id = ? AND p.name = 'Technician'`, 
            [userID]);

        if (results.length === 0) {
            return res.status(403).json({ msg: 'You are not authorized only technicians are allowed' });
        }

        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server failed during technician check' });
    }
};
