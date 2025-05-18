const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  fatherName: {
    type: String,
    required: true,
    trim: true
  },
  motherName: {
    type: String,
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: [/.+\@.+\..+/, 'Enter a valid email'] 
  },
  parentCode: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{6}$/, 'Must be exactly 6 digits']
  },
  aadhaarCard:{
    type:String,
    required: true,
    match: [/^\d{12}$/, 'Must be exactly 12 digits']
   },
  occupation: {
    type: String,
    trim: true
  },
  
    phone: {
      type: String,
      validate: {
        validator: v => /^[0-9]{10,15}$/.test(v),
        message: props => `${props.value} is not a valid phone number!`
      },
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
       
      },

 
  
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });




module.exports = mongoose.model('Parent', parentSchema);