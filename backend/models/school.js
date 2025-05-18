const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: [true, 'School name is required'],
    trim: true
  },
  email:{
    type:String,
    required:true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // prevent it from being returned in queries
  },
  
  code: {
    type: String,
    required: [true, 'School code is required'],
    unique: true,
  
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }],
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolClass'
  }],
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent'
  }],
   address: {
      type: String,
  
    },
principal: {
    type: String,
    required: [true, 'Principal name is required'],
    
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
});

module.exports = mongoose.model('School', schoolSchema);