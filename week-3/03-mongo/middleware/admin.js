const { User } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const un = req.headers['user-agent'];
    const pwd = req.headers['user-agent'];

    const adminExists = await Admin.findOne({ username: un, password: pwd });
    if (adminExists) {
        next();
    }
    else {
        res.json(401).send('Unauthorized');
    }
}

module.exports = adminMiddleware;