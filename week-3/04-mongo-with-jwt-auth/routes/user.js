const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const jwtSecret = '123456'
const db = require("../db/index")


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    var un = req.body.username;
    var pwd = req.body.password;
    const user = new db.User({
        username: un,
        password: pwd
    });
    user.save();
    res.json({ message: 'user created successfully' });
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const user = db.User.find({ username: req.body.username, password: req.body.password })
    if (user != null && user != undefined) {
        res.status(200).json(jwt.sign({ username: req.body.username }, jwtSecret));
    }
    else
    res.status(404).json('User not found');
});

router.get('/courses', userMiddleware,(req, res) => {
    // Implement listing all courses logic
    db.Course.find().then(courses => {
        res.json(courses);
    });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const tokenHeader = req.headers['authorization'];
    
    const token = tokenHeader.split(' ')[1];

    var data=jwt.decode(token);
    let courseId = req.params.courseId;
    const purchasedCourse = new db.PurchasedCourse({
        username: data.username,
        courseId: courseId
    });
    purchasedCourse.save();
    res.json({ message: 'Course purchased successfully' });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const tokenHeader = req.headers['authorization'];   

    const token = tokenHeader.split(' ')[1];

    var data=jwt.decode(token);
    let purchasedCourses = await db.PurchasedCourse.find({ "username": data.username });
    let courseIds = purchasedCourses.map(a => a.courseId);
    let courses = await db.Course.find({ "id": { $in: courseIds } });
    res.json(courses);


});

module.exports = router