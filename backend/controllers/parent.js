const Parent = require("../models/parent");
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
// Generate 6-digit code
const generateParentCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📌 CREATE Parent
exports.createParent = async (req, res) => {
  try {
    console.log("i am at prent create");
    console.log()
    console.log(req.body);
    const { fatherName, motherName,aadhaarCard, email, occupation, phone,address } = req.body;
    const schoolId =req.school.id;
 
    // Generate unique 6-digit code
    let uniqueCode;
    let isUnique = false;

    while (!isUnique) {
      uniqueCode = generateParentCode();
      console.log("code parent",uniqueCode);
      const exists = await Parent.findOne({ parentCode: uniqueCode });
      if (!exists) isUnique = true;
    }

    const newParent = new Parent({
      fatherName,
      motherName,
      email,
      aadhaarCard,
      occupation,
      phone,
      address,
      schoolId,
      parentCode: uniqueCode,
    });

    await newParent.save();
    console.log(" now parent is save and ",newParent);
    res.status(201).json(newParent );
  } catch (err) {
    console.error("❌ Error creating parent:", err);
    console.error("❌ Error creating parent:", err.message);
    res.status(500).json({ error: "Failed to create parent", details: err.message });
  }
};
//login parent
// controllers/parentController.js



exports.loginParent = async (req, res) => {
  const { code } = req.body;
console.log("parent controller",code);
  try {
    // Check if code is provided
    if (!code) {
      return res.status(400).json({ message: 'Parent code is required' });
    }

    const parent = await Parent.findOne({parentCode:code });
console.log(parent);
    if (!parent) {
      return res.status(401).json({ message: 'Invalid parent code' });
    }

    const token = jwt.sign(
      {
        _id: parent._id,
        role: 'Parent',
        schoolId: parent.schoolId,
      },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );
console.log(parent);
    res.status(200).json({
      message: 'Login successful',
      token: token,
      parent:parent
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📌 READ All Parents by School
exports.getParentsBySchool = async (req, res) => {
  try {
    const schoolId = req.school.id;
    const parents = await Parent.find({ schoolId });
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch parents", details: err.message });
  }
};

// 📌 READ Single Parent by ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ error: "Parent not found" });
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch parent", details: err.message });
  }
};

// 📌 READ Parent by Parent Code
exports.getParentByCode = async (req, res) => {
  try {
    const parent = await Parent.findOne({ parentCode: req.params.code });
    if (!parent) return res.status(404).json({ error: "Parent with this code not found" });
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch parent by code", details: err.message });
  }
};

// 📌 UPDATE Parent
exports.updateParent = async (req, res) => {
  try {
    const { fatherName, motherName,aadhaarCard, email, occupation, Contact, status } = req.body;
    const parent = await Parent.findByIdAndUpdate(
      req.params.id,
      { fatherName, motherName,aadhaarCard, email, occupation, Contact, status },
      { new: true, runValidators: true }
    );
    if (!parent) return res.status(404).json({ error: "Parent not found" });
    res.status(200).json({ message: "Parent updated successfully", parent });
  } catch (err) {
    res.status(500).json({ error: "Failed to update parent", details: err.message });
  }
};

// 📌 DELETE Parent
exports.deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) return res.status(404).json({ error: "Parent not found" });
    res.status(200).json({ message: "Parent deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete parent", details: err.message });
  }
};
// controllers/studentController.js



exports.getStudentsByParentId = async (req, res) => {
  try {
    const { parentId } = req.params;
  console.log("parent id in get student",parentId);
    const students = await Student.find({ parent: parentId })
    .populate({
      path: 'currentSection', // First populate the section
      populate: [
        {
          path: 'classId', // Then within section, populate class
          model: 'SchoolClass'
        },
        {
          path: 'classTeacher', // Also populate class teacher of section
          model: 'Teacher'
        }
      ]
    })
    .populate('parent')
    .populate('schoolId');
    

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found for this parent" });
    }

    res.status(200).json(
      students
    );
  } catch (error) {
    console.error("Error fetching students by parent ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
