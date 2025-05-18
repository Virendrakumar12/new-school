const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parent');
const protect=require("../middleware/auth") 

router.post('/addParent',protect, parentController.createParent);
router.get("/parentStudent/:parentId",parentController.getStudentsByParentId)
router.post("/loginParent",parentController.loginParent);
router.get('/getAllParent',protect,parentController.getParentsBySchool);
router.get('/getParent/:id',protect, parentController.getParentById);
router.get('/parent/by-code/:code',protect, parentController.getParentByCode);
router.put('/updateParent/:id',protect, parentController.updateParent);
router.delete('/deleteParent/:id',protect, parentController.deleteParent);

module.exports = router;