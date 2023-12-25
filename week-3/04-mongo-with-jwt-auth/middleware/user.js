const jwt = require('jsonwebtoken');
const db = require('../db/index');
const jwtSecret = '123456'
function userMiddleware(req, res, next) {

    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    const token = tokenHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        var user = db.User.findOne({ username: decoded.username });
        if (user == null || user == undefined)
            return res.status(401).json({ message: 'Unauthorized' });
        next();
    });

}

module.exports = userMiddleware;