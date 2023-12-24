const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://shahzadahamad285:7FvbeKV3VYuw40O1@cohort2cluster.rqtbsxm.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String

});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    sername: String,
    password: String
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    id:Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}