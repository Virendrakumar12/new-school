const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');
const protect=require("../middleware/auth")

// Class routes
router.post('/addClass',protect, classController.createClass);
router.get('/getAllClass',protect, classController.getClassesBySchool);
router.get('/getClass/:id',protect, classController.getClassById);
router.put('/updateClass/:id',protect, classController.updateClass);
router.delete('/deleteClass/:id',protect, classController.deleteClass);

module.exports = router;
