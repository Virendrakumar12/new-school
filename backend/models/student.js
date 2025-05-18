const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
      },
      currentSection: {
        type: mongoose.Schema.Types.ObjectId, ref:'ClassSection'
      },
      parent:{
        type:mongoose.Schema.Types.ObjectId,ref:"Parent"
      },

      parentCode: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{6}$/, 'Must be exactly 6 digits']
      },
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    validate: {
      validator: v => /^[0-9]{10,15}$/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    }
},
email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: [/.+\@.+\..+/, 'Enter a valid email'] 
  },
  

  gender: { type: String, enum: ['male', 'female', 'other'], required: true },

  dob: { type: Date, required: true },

  registrationNumber: {
    type: String,
    required: true,
    match: [/^\d{6}$/, 'Must be exactly 6 digits']
  },
   aadhaarCard:{
    type:String,
    required: true,
    match: [/^\d{12}$/, 'Must be exactly 12 digits']
   },

  admissionDate: {
    type: Date,
    required: true,
    default: Date.now
  },


    bloodGroup: {
      type:String,
    }
    ,
    allergies:{
      type:String
    },
    medicalConditions:{
      type:String
    },

  achievements: {
    
    type:String,
    
  },
  hasFeeGenerated: {
    type: Boolean,
    default: false
  },
  
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'transferred'],
    default: 'active'
  },
 
},{timestamps:true});

module.exports = mongoose.model('Student', studentSchema);  