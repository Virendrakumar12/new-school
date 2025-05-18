// models/conversationSchema.js

const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'participants.participantType'  // dynamically resolved
    },
    participantType: {
      type: String,
      required: true,
      enum: ['Teacher', 'Student', 'Parent','School']
    }
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  lastMessage: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Conversation', conversationSchema);
