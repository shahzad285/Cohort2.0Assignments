async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const un = req.headers['user-agent'];
    const pwd = req.headers['user-agent'];

    const userExists = await User.findOne({ username: un, password: pwd });
    if (userExists) {
        next();
    }
    else {
        res.json(401).send('Unauthorized');
    }
}

module.exports = userMiddleware;