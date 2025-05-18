const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school');
const protect=require("../middleware/auth")
//const auth = require('../middleware/authMiddleware');

// Public
router.post('/register', schoolController.registerSchool);
router.post('/login', schoolController.loginSchool);
router.get("/getTotal",protect,schoolController.getDashboardCounts)
// Protected (add routes here)
router.get('/profile', (req, res) => {
  res.json({ message: 'School profile accessed', schoolId: req.school.schoolId });
});

module.exports = router;
