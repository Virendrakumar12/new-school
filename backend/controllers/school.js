const School = require('../models/school'); // Adjust path as necessary
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv=require("dotenv");
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Parent = require('../models/parent');
dotenv.config();
// 🔐 SECRET for JWT (in .env usually)


// 🏫 Register a new school
exports.registerSchool = async (req, res) => {
  try {
    const { schoolName, email, password, code, principal } = req.body;

    // Check if email already exists
    const existingSchool = await School.findOne({ email });
    if (existingSchool) return res.status(400).json({ message: 'Email already in use' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSchool = new School({
      schoolName,
      email,
      password: hashedPassword,
      code,
      principal,
    });

    await newSchool.save();

    res.status(201).json({ message: 'School registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔓 Login school
exports.loginSchool = async (req, res) => {
  try {
    const { email, password,code } = req.body;

    const school = await School.findOne({ email }).select('+password');
    if (!school) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, school.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
   if(!school.code==code){
    return res.status(400).json({message:"invalid code"});
   }

    const token = jwt.sign({_id: school._id,schoolId: school._id,role:'School'},process.env.SECRET_KEY, { expiresIn: '1d' });
   console.log(token);
    res.json({
      token:token,
      school: {
        id: school._id,
        schoolName: school.schoolName,
      principal:school.principal,
        email: school.email,
        code: school.code,
      
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getDashboardCounts = async (req, res) => {
  try {
    const schoolId = req.school.id;
  console.log("school id in get dashboard",schoolId)
    const [totalStudents, totalTeachers, totalParents] = await Promise.all([
      Student.countDocuments({ schoolId }),
      Teacher.countDocuments({ schoolId }),
      Parent.countDocuments({ schoolId })
    ]);
    console.log("tatal",totalStudents,totalTeachers,totalParents)
    res.json({
      totalStudents,
      totalTeachers,
      totalParents
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
