// routes/messageRoutes.js
const express = require('express');
const mongoose=require("mongoose")
const router = express.Router();
const Message = require('../models/messageSchema');
const Conversation = require('../models/conversationSchema');

// Route to fetch conversations of a user
router.get('/conversations/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch conversations where the user is one of the participants
        const conversations = await Conversation.find({
            'participants.participantId': userId
        })
        .sort({ updatedAt: -1 })
        .populate({
            path: 'participants.participantId',
            select: 'firstName lastName email phone'
            // No 'model' here because refPath handles it dynamically
        })
        .populate('messages');  // Optionally populate messages if you want

        return res.json({ conversations });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});


// Route to fetch messages of a conversation
router.get('/messages/:conversationId', async (req, res) => {
    try {
      const { conversationId } = req.params;
  
      const conversation = await Conversation.findById(conversationId)
        .populate({
          path: 'messages',
          options: { sort: { timestamp: -1 } },  // sort newest first
        })
        .exec();
  
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
  
      res.status(200).json({ messages: conversation.messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Error fetching messages' });
    }
  });
  
// Route to send a message
router.post('/sendMessage', async (req, res) => {
    try {
        
      const { senderId, receiverId, message, senderType, receiverType } = req.body;
  
      const senderObjectId = new mongoose.Types.ObjectId(senderId);
      const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
      
      // Create a new message
      const newMessage = await Message.create({
        senderId: senderObjectId,
        receiverId: receiverObjectId,
        senderType,
        receiverType,
        message
      });
  
      // Check if a conversation already exists
      let conversation = await Conversation.findOne({
        'participants.participantId': { $all: [senderObjectId, receiverObjectId] }
      });
  
      if (!conversation) {
        // Create new conversation with participant objects
        conversation = await Conversation.create({
          participants: [
            { participantId: senderObjectId, participantType: senderType },
            { participantId: receiverObjectId, participantType: receiverType }
          ],
          messages: [newMessage._id],
          lastMessage: message
        });
      } else {
        conversation.messages.push(newMessage._id);
        conversation.lastMessage = message;
        conversation.updatedAt = new Date();
        await conversation.save();
      }
  
      res.status(200).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending message', error: error.message });
    }
  });

//load chats 

router.get('/getConversation', async (req, res) => {
  try {
    const { participant1, participant2 } = req.query;
    

    const participant1Id = new mongoose.Types.ObjectId(participant1);
    const participant2Id = new mongoose.Types.ObjectId(participant2);

    const conversation = await Conversation.findOne({
      'participants.participantId': { $all: [participant1Id, participant2Id] }
    }).populate({
      path: 'messages',
      options: { sort: { createdAt: 1 } }
    });

    
    
       if(conversation){
         
        res.status(200).json({
      conversationId: conversation._id,
      participants: conversation.participants,
      messages: Array.isArray(conversation.messages) ? conversation.messages : []
    });
       }
   
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ message: 'Error fetching conversation', error: error.message });
  }
});


 




// Route to mark message as read
// Mark all messages as read
router.post('/markAsRead', async (req, res) => {
  try {
    const { conversationId, userId } = req.body;
    await Message.updateMany(
      { conversationId, receiverId: userId, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating messages' });
  }
});

// Delete a message by ID and update conversation
router.delete('/messages/:messageId', async (req, res) => {
    try {
      const { messageId } = req.params;
  
      // Find and delete the message
      const deletedMessage = await Message.findByIdAndDelete(messageId);
  
      if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      // Remove message reference from conversations
      await Conversation.updateMany(
        { messages: messageId },
        { $pull: { messages: messageId } }
      );
  
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ message: 'Error deleting message' });
    }
  });
  

module.exports = router;


/*.populate({
  path: 'messages',
  populate: [
    { path: 'senderId', select: 'firstName lastName email', model: message => message.senderType },
    { path: 'receiverId', select: 'firstName lastName email', model: message => message.receiverType }
  ],
  options: { sort: { timestamp: -1 } }
})
*/