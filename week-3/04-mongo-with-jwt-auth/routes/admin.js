const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt=require('jsonwebtoken');
const db = require('../db/index');
const router = Router();
const jwtSecret = '123456'
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    var un = req.body.username;
    var pwd = req.body.password;
    const admin = new db.Admin({
        username: un,
        password: pwd
    });
    admin.save();
    res.json({ message: 'Admin created successfully' });
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    // Implement admin signup logic
    const admin = db.Admin.find({ username: req.body.username, password: req.body.password })
    if (admin != null && admin != undefined) {
        res.status(200).json(jwt.sign({ username: req.body.username }, jwtSecret));
    }
    else
    res.status(404).json('User not found');
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    let newId = 1;
    let courses=await db.Course.find();
        courses.forEach(element => {
            if(newId<element.id)
            {
                newId=element.id;
            }
        });
    
    newId=newId+1;
    const course = new db.Course({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        id: newId

    });
    course.save();
    res.json({ message: 'course created successfully' });

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    db.Course.find().then(courses => {
        res.json(courses);
    });
});

module.exports = router;