const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section');
//const schoolAuth = require('../middleware/schoolAuth');
const protect=require("../middleware/auth") 
// Create section
router.post('/addSection',protect, sectionController.createSection);
router.get('/getAllSectionById/:id',protect ,sectionController.getSectionsByClassId);

// Update section info (e.g., rename)
router.put('/updateSection/:id',  sectionController.updateSection);

// Assign or change class teacher
router.patch('/assignTeacher/:id', sectionController.assignClassTeacher);

// Delete section
router.delete('/deleteSection/:sectionId', sectionController.deleteSection);

// Get sections (optionally by classId)
router.get('getSection/',protect, sectionController.getSections);
router.post('/add/assignSubject/:sectionId',sectionController.assignSubjectToSection);
router.put('/class/update-subject-teacher/:classId',sectionController.updateSubjectTeacherInClass);
router.delete('/class/remove-subject/:classId',sectionController.removeSubjectFromClass);

module.exports = router;
