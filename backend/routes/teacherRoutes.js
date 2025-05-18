// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');
const protect=require("../middleware/auth") 

router.post('/addTeacher',protect, teacherController.createTeacher);
router.post('/loginTeacher',teacherController.loginTeacher)
router.get('/getAllTeacher',protect, teacherController.getAllTeachers);
router.get('/getTeacher/:id', teacherController.getTeacherById);
router.put('/updateTeacher/:id', teacherController.updateTeacher);
router.delete('/deleteTeacher/:id', teacherController.deleteTeacher);

module.exports = router;
