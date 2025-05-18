// routes/subjectRoutes.js

const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject');
//const authenticate = require('../middleware/authenticate'); // Middleware to set req.schoolId
const protect=require("../middleware/auth")
//router.use(authenticate); // All routes require schoolId

router.post('/addSubject',protect, subjectController.createSubject);
router.get('/getAllSubject',protect,  subjectController.getAllSubjects);
router.get('/getSubject/:id',protect,  subjectController.getSubjectById);
router.put('/updateSubject/:id',protect,  subjectController.updateSubject);
router.delete('/deleteSubject/:id',protect,  subjectController.deleteSubject);

module.exports = router;
