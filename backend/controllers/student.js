const mongoose = require('mongoose');
const Student = require('../models/student');
const Parent = require('../models/parent');
const jwt = require("jsonwebtoken");

const MonthPayment = require('../models/monthlyPayment');
// Helper function to generate 6-digit sequential registration number
const generateRegistrationNumber = async (schoolId) => {
  const lastStudent = await Student.find({ schoolId })
    .sort({ createdAt: -1 })
    .limit(1);

  let lastNumber = 0;
  if (lastStudent.length > 0 && lastStudent[0].registrationNumber) {
    lastNumber = parseInt(lastStudent[0].registrationNumber, 10);
  }

  const newNumber = (lastNumber + 1).toString().padStart(6, '0');
  return newNumber;
};

// CREATE Student
exports.createStudent = async (req, res) => {
  try {
   
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dob,
      aadhaarCard,
      admissionDate,
      currentSection,
      parentCode,
      bloodGroup,
      allergies,
      medicalConditions,
      achievements,
      status,
    } = req.body;

    // Fetch parent ID using parentCode
    const parent = await Parent.findOne({ parentCode });
    if (!parent) {
      return res.status(404).json({ error: 'Parent not found with the given code' });
    }

    
   const schoolId=req.school.id
    // Generate 6-digit sequential registration number for the school
    const registrationNumber = await generateRegistrationNumber(schoolId);

    const newStudent = new Student({
      schoolId:schoolId,
      currentSection,
      parent: parent._id,
      parentCode,
      firstName,
      lastName,
      email,
      phone,
      aadhaarCard,
      gender,
      dob,
      admissionDate,
      registrationNumber,
      bloodGroup,
      allergies,
      medicalConditions,
      achievements,
      status,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// student login 



exports.loginStudent = async (req, res) => {
  const { dob, parentCode } = req.body;
 console.log("student logn in controller",req.body);
  try {
    let student;

    if (!dob || !parentCode) {
      return res.status(400).json({ message: 'DOB and Parent Code are required' });
    }

    // Find parent by parentCode
    const parent = await Parent.findOne({ parentCode: parentCode });
    if (!parent) {
      return res.status(401).json({ message: 'Invalid Parent Code' });
    }
    const startOfDay = new Date(dob);
   startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(dob);
  endOfDay.setUTCHours(23, 59, 59, 999);


    // Find student with matching DOB and parent
    student = await Student.findOne({parent:parent._id }).populate("parent");
    if (!student) {
      console.log("not found student",student);
      return res.status(401).json({ message: 'Invalid DOB or no student found for this parent' });
    }

    // Generate token
    const token = jwt.sign(
      {
        _id: student._id,
        role: 'Student',
        schoolId: student.schoolId,
        section:student.currentSection
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
console.log("all clear by student",student)
    res.status(200).json({
      message: "Login successful",
      token:token,
      student: {
        id: student._id,
        name: student.firstName + " " + student.lastName,
        parent: {
          id: parent._id,
          name: parent.name,
          code: parent.code,
        },
      },
    });
  } catch (error) {
    console.error('Student Login Error:', error);
    res.status(500).json({ error: err.message  });
  }
};


// GET all students in a school
exports.getAllStudents = async (req, res) => {
  try {
   console.log("i am at student get");
    const students = await Student.find({ schoolId: req.school.id })
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
    
    
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET a single student by registration number
exports.getStudentById = async (req, res) => {
    try {
      const student = await Student.findOne({ studentId: req.params.studentId })
        .populate('parent currentClass');  // Populating references like 'parent' and 'currentClass'
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// UPDATE student by registration number


exports.updateStudent = async (req, res) => {
  try {



    const { id } = req.params;

    const {
      firstName,
      lastName,
      phone,
      email,
      gender,
      dob,
      parentCode,
      aadhaarCard,
      admissionDate,
      bloodGroup,
      allergies,
      medicalConditions,
      achievements,
      currentSection, // section ID (ObjectId)
    } = req.body;

    // Validate section ID if provided
    if (currentSection && !mongoose.Types.ObjectId.isValid(currentSection)) {
      return res.status(400).json({ error: 'Invalid section ID' });
    }

    const updatedStudent = await Student.findOneAndUpdate(
      {_id: id },
      {
        firstName,
        lastName,
        phone,
        email,
        gender,
        dob,
        parentCode,
        aadhaarCard,
        admissionDate,
        bloodGroup,
        allergies,
        medicalConditions,
        achievements,
        currentSection
      },
      { new: true, runValidators: true }
    )
     

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
       
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ error: err.message });
  }
};



// DELETE student by registration number


exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // 1. Delete the student
    const student = await Student.findOneAndDelete({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // 2. Delete all month payments related to the student
    await MonthPayment.deleteMany({ studentId });

    res.status(200).json({ message: 'Student and related payments deleted successfully' });
  } catch (err) {
    console.error('Error deleting student and payments:', err);
    res.status(500).json({ error: err.message });
  }
};
