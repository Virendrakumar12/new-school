const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  sectionName: { type: String, required: true,  uppercase: true,  }, // "A", "B", etc.
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'SchoolClass', required: true },
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  subjects: [{
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
  }]
  

}, { timestamps: true });

// After defining your schema
sectionSchema.index({ sectionName: 1, classId: 1 }, { unique: true });

module.exports = mongoose.model('ClassSection', sectionSchema);

