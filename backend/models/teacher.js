const mongoose=require("mongoose");

const teacherSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
      },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true, 
      match: [/.+\@.+\..+/, 'Enter a valid email'] 
    },
    password: { type: String, required: true },
    phone: {
        type: String,
        validate: {
          validator: v => /^[0-9]{10,15}$/.test(v),
          message: props => `${props.value} is not a valid phone number!`
        }
    },
    code: { type: String, unique: true },
    salary:{
      type:Number,
    },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dob: { type: Date, required: true },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
    },
    joiningDate: { type: Date, default: Date.now },
    qualifications: String,
    specializations: [String],
    experience: String,
   isActive: { type: Boolean, default: true },
  }, { timestamps: true });

  module.exports = mongoose.model("Teacher", teacherSchema);
