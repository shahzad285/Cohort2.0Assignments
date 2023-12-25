
const db = require("../db/index");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const un = req.headers['username'];
    const pwd = req.headers['password'];

    const userExists = await db.User.findOne({ username: un, password: pwd });
    if (userExists!=null && userExists !=undefined) {
        next();
    }
    else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = userMiddleware;