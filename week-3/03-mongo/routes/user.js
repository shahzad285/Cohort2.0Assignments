const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const db = require("../db/index");

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

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    db.Course.find().then(courses => {
        res.json(courses);
    });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    let un = req.headers['username'];
    let courseId = req.params.courseId;
    const purchasedCourse = new db.PurchasedCourse({
        username: un,
        courseId:courseId
    });
    purchasedCourse.save();
    res.json({ message: 'Course purchased successfully' });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    let purchasedCourses=await db.PurchasedCourse.find({"username":req.headers["username"]});
    let courseIds=purchasedCourses.map(a=>a.courseId);
    let courses=await db.Course.find({"id":{$in:courseIds}});
    res.json(courses);

    
});
module.exports = router;