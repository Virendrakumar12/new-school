const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true,uppercase:true },
  tuitionFee: { type: Number, required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = mongoose.model('SchoolClass', classSchema);
