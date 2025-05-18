const ClassSection = require('../models/class/section');
const SchoolClass=require("../models/class/class")
//const Teacher = require('../models/teacher');
const Teacher=require("../models/teacher")
const Subject = require('../models/subject');
// 1. Create section (no teacher on creation)
exports.createSection = async (req, res) => {
  try {

    const {sectionName, classId } = req.body;
    
    const classFind = await SchoolClass.findById(classId);
    const schoolId =req.school.id;
  
   
      if(!classFind){
        return res.status(404).json({message:"class not found"});
      }
      const existingSection = await ClassSection.findOne({ sectionName, classId });
      if (existingSection) {
        return res.status(400).json({ message: "Section already exists for this class" });
      }

   

    const section = new ClassSection({sectionName, classId, schoolId });
    await section.save();

    res.status(201).json(section);
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};



exports.getSectionsByClassId = async (req, res) => {
  try {
   
    const { id } = req.params; // classId
    

    
    const sections = await ClassSection.find({ classId: id })
    .populate('classId', 'className')
    .populate('classTeacher', 'firstName lastName')
    .populate('subjects.subject', 'subjectName')
    .populate('subjects.teacher', 'firstName lastName') // returns full teacher document

      
       // Adjust fields as needed
      

    if (!sections || sections.length === 0) {
      return res.status(404).json({ message: 'No sections found for this class' });
    }
    
      
    res.status(200).json(sections);
  } catch (error) {
    console.error("Error fetching sections:", error.message);
    res.status(500).json({ error: error.message });
  }
};






exports.updateSection = async (req, res) => {
  try {

    
    
    const { id } = req.params;
    const { classTeacher, subjects } = req.body;
     
    // Optional validation (can extend more)
    if (!Array.isArray(subjects)) {
      return res.status(400).json({ error: 'Invalid subject-teacher data.' });
    }

    // Validate that all teachers and subjects exist
    for (const pair of subjects) {
      const subjectExists = await Subject.findById(pair.subject);
      const teacherExists = await Teacher.findById(pair.teacher);
      if (!subjectExists || !teacherExists) {
        return res.status(400).json({ error: 'Invalid subject or teacher ID.' });
      }
    }

    const updatedSection = await ClassSection.findByIdAndUpdate(
      id,
      {
        classTeacher,
        subjects, // Array of { subject, teacher }
      },
      { new: true }
    )
      .populate('classTeacher')
      .populate('subjects.subject')
      .populate('subjects.teacher');

    res.status(200).json(updatedSection);
  } catch (error) {
    console.error('Update Section Error:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};


// 3. Assign or change class teacher dynamically
exports.assignClassTeacher = async (req, res) => {
  try {
    console.log("class Teacher",req.params.id);
    const { classTeacher } = req.body;

    const teacher = await Teacher.findOne({ _id: classTeacher });
    if (!teacher) return res.status(400).json({ message: 'Invalid teacher ID' });

    const updatedSection = await ClassSection.findByIdAndUpdate(
      req.params.id,
      { classTeacher },
      { new: true }
    );

    if (!updatedSection) return res.status(404).json({ message: 'Section not found' });

    res.status(200).json({ message: 'Class teacher updated successfully', section: updatedSection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


 

// 4. Delete section
exports.deleteSection = async (req, res) => {
  try {
    console.log("delete section ",req.params);
    const sectionId = req.params.sectionId;
   console.log("sectionId",sectionId)
    const deleted = await ClassSection.findByIdAndDelete({_id:sectionId});
    if (!deleted) return res.status(404).json({ message: 'Section not found' });
     if(deleted){
      console.log("deleted section successfully");
     }
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ error: error.message });
  }
};

// 5. Get all sections for a class or school
exports.getSections = async (req, res) => {
  try {
    const { classId } = req.query;
    const schoolId = req.schoolId;

    const query = { schoolId };
    if (classId) query.classId = classId;

    const sections = await ClassSection.find(query).populate('classTeacher', 'name email');

    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Add a subject-teacher pair to a class
// Controller function
// route: POST /section/assign-subject/:sectionId
exports.assignSubjectToSection = async (req, res) => {
  try {
    console.log(" iam at contoller ",req.params.sectionId);
    const { sectionId } = req.params;
    const { subjectId, teacherId } = req.body;
    console.log(sectionId);
    console.log(subjectId,teacherId,"teacherID");
    const section = await ClassSection.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    const alreadyAssigned = section.subjects.some(subj =>
      subj.subject.toString() === subjectId
    );

    if (alreadyAssigned) {
      return res.status(400).json({ message: 'Subject already assigned to this section' });
    }

    section.subjects.push({ subject: subjectId, teacher: teacherId });
    await section.save();

    res.status(200).json({ message: 'Subject assigned successfully', section });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
  exports.updateSubjectTeacherInClass = async (req, res) => {
    try {
      const { classId } = req.params;
      const { subjectId, newTeacherId } = req.body;
  
      const schoolClass = await  SchoolClass.findById(classId);
      if (!schoolClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      const subjectEntry = schoolClass.subjects.find(subj =>
        subj.subject.toString() === subjectId
      );
  
      if (!subjectEntry) {
        return res.status(404).json({ message: 'Subject not found in this class' });
      }
  
      subjectEntry.teacher = newTeacherId;
  
      await schoolClass.save();
      res.status(200).json({ message: 'Teacher updated for the subject', class: schoolClass });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  exports.removeSubjectFromClass = async (req, res) => {
    try {
      const { classId } = req.params;
      const { subjectId } = req.body;
  
      const schoolClass = await SchoolClass.findById(classId);
      if (!schoolClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      schoolClass.subjects = SchoolClass.subjects.filter(subj =>
        subj.subject.toString() !== subjectId
      );
  
      await schoolClass.save();
      res.status(200).json({ message: 'Subject removed from class', class: schoolClass });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
    