const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  subjectName: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true
  },
  subjectCode: {
    type: String,
    required: true,
    trim: true,
    unique: true,
     uppercase: true,

  }
  
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);
