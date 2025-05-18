const SchoolClass = require('../models/class/class');
const School = require('../models/school');

// Create Class
exports.createClass = async (req, res) => {
  try {
    const { className, tuitionFee } = req.body;
   
    const schoolId =req.school.id;
    
const existingSection = await SchoolClass.findOne({className, schoolId });
      if (existingSection) {
        return res.status(400).json({ message: "class already exists for this class" });
      }
    const newClass = new SchoolClass({ className, tuitionFee, schoolId });
    await newClass.save();

    await School.findByIdAndUpdate(schoolId, {
      $push: { classes: newClass._id }
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all classes for the current school
exports.getClassesBySchool = async (req, res) => {
  try {
    console.log("classes");
    const schoolId =req.school.id;
   console.log(schoolId);
    const classes = await SchoolClass.find({ schoolId });
    
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single class by ID
exports.getClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const schoolClass = await SchoolClass.findById(classId);

    if (!schoolClass) return res.status(404).json({ message: 'Class not found' });
    res.status(200).json(schoolClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { className, tuitionFee } = req.body;

    const updated = await SchoolClass.findByIdAndUpdate(
      classId,
      { className, tuitionFee },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Class not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const schoolId =req.school._id;

    const deleted = await SchoolClass.findByIdAndDelete(classId);
    if (!deleted) return res.status(404).json({ message: 'Class not found' });

    await School.findByIdAndUpdate(schoolId, {
      $pull: { classes: classId }
    });

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
