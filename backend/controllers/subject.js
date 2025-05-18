const Subject = require('../models/subject');

// CREATE
exports.createSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode } = req.body;
    const schoolId = req.school.id; // coming from middleware
      
      
    const existing = await Subject.findOne({ subjectName, schoolId });
    if (existing) {
      return res.status(400).json({ message: "Subject already exists in this school" });
    }

    const subject = new Subject({ subjectName, subjectCode, schoolId });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL (for the school only)
exports.getAllSubjects = async (req, res) => {
  try {
    const schoolId =req.school.id;
   
    const subjects = await Subject.find({ schoolId });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
exports.getSubjectById = async (req, res) => {
  try {
    const schoolId =req.school._id;
    const subject = await Subject.findOne({ _id: req.params.id, schoolId });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateSubject = async (req, res) => {
  try {
    console.log("i am at update subject");
    const schoolId =req.school.id;
    console.log("i am at update subject");
    console.log(schoolId)
    const subject = await Subject.findOneAndUpdate(
      { _id: req.params.id, schoolId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!subject) {
      return res.status(404).json({ message: "Subject not found or unauthorized" });
    }
    res.status(200).json(subject);
    console.log("subject updated")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteSubject = async (req, res) => {
  try {
    const schoolId =req.school.id;
    console.log("school id at subject delete",schoolId);
    console.log("subject id",req.params.id)
    const subject = await Subject.findOneAndDelete({ _id: req.params.id, schoolId });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found or unauthorized" });
    }
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
