const { User } = require("../db");
const db = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const un = req.headers['username'];
    const pwd = req.headers['password'];

    const adminExists = await db.Admin.findOne({ username: un, password: pwd });
    if (adminExists!=null && adminExists !=undefined) {
        next();
    }
    else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = adminMiddleware;