const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'senderType',  // Dynamically resolve to the sender type (Student, Teacher, Parent)
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'receiverType',  // Dynamically resolve to the receiver type (Student, Teacher, Parent)
  },
  senderType: {
    type: String,
    required: true,
    enum: ['Student', 'Teacher', 'Parent','School'],  // Types of participants who can send the message
  },
  receiverType: {
    type: String,
    required: true,
    enum: ['Student', 'Teacher', 'Parent','School'],  // Types of participants who can receive the message
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  status: {
  type: String,
  enum: ['sent', 'delivered', 'seen'], // or 'sent', 'delivered', 'read'
  default: 'sent'
},

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', messageSchema);
