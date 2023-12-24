const { Router } = require("express");
const app = Router();
const userMiddleware = require("../middleware/user");

// User Routes
app.post('/signup', (req, res) => {
    // Implement user signup logic
});

app.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

app.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

app.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});
module.exports = app;