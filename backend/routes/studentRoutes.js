const express = require('express');
const router = express.Router();
const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, loginStudent } = require('../controllers/student');
const protect=require("../middleware/auth")
const MonthPayment = require('../models/monthlyPayment');
// CRUD routes for students
router.post('/addStudent',protect, createStudent);
router.post("/loginStudent",loginStudent)
router.get('/getAllStudent',protect, getAllStudents);
router.get('/getStudents/:id',protect, getStudentById);
router.put('/updatedStudent/:id',protect, updateStudent);
router.delete('/deleteStudent/:studentId',protect, deleteStudent);



// DELETE all monthly payments by student ID



module.exports = router;
