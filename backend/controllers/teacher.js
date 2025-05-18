const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config({});

// Helper function to generate teacher code
const generateTeacherCode = (firstName) => {
  const trimmedName = firstName.trim().toUpperCase();
  const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
  return `${trimmedName}${randomSixDigit}`;
};

exports.createTeacher = async (req, res) => {
  try {
    const schoolId = req.school?.id;
    if (!schoolId) {
      return res.status(400).json({ message: "You are not authorized" });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      dob,
      address,
      joiningDate,
      qualifications,
      specializations,
      experience,
      isActive
    } = req.body;

    // Check for existing email
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "A teacher with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate teacher code
    const code = generateTeacherCode(firstName);

    const newTeacher = new Teacher({
      schoolId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      address,
      joiningDate,
      qualifications,
      specializations,
      experience,
      isActive,
      code  // You can also add this in your schema if not yet added
    });

    const savedTeacher = await newTeacher.save();
    res.status(201).json({message:"Teacher created successfylly",savedTeacher});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//login teacher 




// Example Teacher Login Controller


exports.loginTeacher = async (req, res) => {
  const { email, password, code } = req.body;

 try {
    let teacher;

    // Login with code
    if (code) {
      teacher = await Teacher.findOne({ code });
      if (!teacher) {
        return res.status(401).json({ message: 'Invalid login code' });
      }
    }

    // Login with email & password
    else if (email && password) {
      teacher = await Teacher.findOne({ email });
      if (!teacher) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      return res.status(400).json({ message: 'Please provide login credentials' });
    }


 const token = jwt.sign(
    {
      _id: teacher._id,
      role: 'Teacher',
      schoolId: teacher.schoolId,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successful",
    token:token,
    teacher: {
      id: teacher._id,
      name: teacher.firstName + " " + teacher.lastName,
      email: teacher.email,
      schoolId: teacher.schoolId,
    },
  });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};









// READ all Teachers
exports.getAllTeachers = async (req, res) => {
  try {

    const schoolId=req.school.id;
    if(!schoolId){
           
      return res.status(404).json({message:"school Id not found please Relogin "});
    }
    const teachers = await Teacher.find({schoolId}).populate("schoolId", "schoolName");;
    if(!teachers){
      return res.status(404).json({message:"teachers not found please add Teachers"});
    }
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one Teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Teacher
exports.updateTeacher = async (req, res) => {
  try {

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // This will update only the fields provided in req.body
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// DELETE Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const deleted = await Teacher.findByIdAndDelete({_id:req.params.id});
    if (!deleted) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
