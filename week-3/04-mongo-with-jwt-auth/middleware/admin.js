// Middleware for handling auth
const jwt = require('jsonwebtoken');

const db = require('../db/index');
const jwtSecret = '123456'
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    const token = tokenHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        var admin = db.Admin.findOne({ username: decoded.username });
        if (admin == null || admin == undefined)
            return res.status(401).json({ message: 'Unauthorized' });
        next();
    });
}

module.exports = adminMiddleware;