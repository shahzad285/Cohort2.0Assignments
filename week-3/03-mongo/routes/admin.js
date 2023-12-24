const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const app = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    var un = req.body.username;
    var pwd = req.body.password;
    const admin = new Admin({
        username: un,
        password: pwd
    });
    admin.save();
    res.json({ message: 'Admin created successfully' });
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = app;