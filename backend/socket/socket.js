// socket/socket.js
const Message = require('../models/messageSchema');
const Conversation = require('../models/conversationSchema');

const mongoose=require("mongoose")


// Online users storage (userId: socketId)
let onlineUsers = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Track online users
    socket.on('userOnline', ({ userId, userType }) => {
      onlineUsers[userId] = socket.id;
      console.log(`User ${userId} is online`)
      console.log(`user is online type${userType}`)
      io.emit('onlineStatus', { userId, status: 'online' });
    
    });

    socket.on('disconnect', () => {
      let userIdToRemove;
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          userIdToRemove = userId;
          break;
        }
      }

      if (userIdToRemove) {
        delete onlineUsers[userIdToRemove];
        io.emit('onlineStatus', { userId: userIdToRemove, status: 'offline' });
      }

      console.log('A user disconnected:', socket.id);
    });

    // Send a message
    socket.on('sendMessage', async (data) => {
        try {
          
          const { senderId, receiverId, message, senderType, receiverType } = data;
      
          const senderObjectId = new mongoose.Types.ObjectId(senderId);
          const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
      
          const newMessage = await Message.create({
            senderId: senderObjectId,
            receiverId: receiverObjectId,
            senderType,
            receiverType,
            message,
            status: 'sent'
          });
      
          let conversation = await Conversation.findOne({
            $and: [
              { 'participants.participantId': senderObjectId },
              { 'participants.participantId': receiverObjectId }
            ]
          });
      
          if (!conversation) {
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
            await conversation.save();
          }
      
          // Emit to receiver if online
          if (onlineUsers[receiverId]) {
             newMessage.status = 'delivered';
  await newMessage.save();
            io.to(onlineUsers[receiverId]).emit('newMessage', newMessage);

            io.to(socket.id).emit('messageDelivered', {
        messageId: newMessage._id
      });

      
            const unreadCount = await Message.countDocuments({
              receiverId: receiverObjectId,
            read: false
            });
            io.to(onlineUsers[receiverId]).emit('unreadCount', { userId: receiverId, count: unreadCount });
          }
      
          // Emit to sender (optional, for confirmation)
          io.to(socket.id).emit('newMessage', newMessage);

          
          
          console.log('Message sent successfully');
        } catch (error) {
          console.log('Error sending message:', error);
        }
      });
      
//check 
socket.on('readMessages', async ({ senderId, receiverId }) => {
  console.log("Marking messages as seen from", senderId, "to", receiverId);

  // Step 1: find the matching message IDs
const messagesToUpdate = await Message.find(
  {
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId }
    ],
    receiverId,
    status: { $ne: 'seen' }
  },
  { _id: 1 }
);

const messageIds = messagesToUpdate.map(msg => msg._id);

// Step 2: update only those messages
await Message.updateMany(
  { _id: { $in: messageIds } },
  { $set: { status: 'seen' } }
);

// Step 3: notify the sender if online
if (onlineUsers[senderId]) {
  io.to(onlineUsers[senderId]).emit('messagesRead', { messageIds });
}

});








socket.on('markAsSeen', async ({ messageId, senderId }) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { status: 'seen', read: true },
      { new: true }
    );

    // Notify sender that message is seen
    if (onlineUsers[senderId]) {
      io.to(onlineUsers[senderId]).emit('messageSeen', updatedMessage);
    }

    console.log(`Message ${messageId} marked as seen`);
  } catch (error) {
    console.log('Error marking message as seen:', error);
  }
});

socket.on('markConversationAsSeen', async ({ conversationId, receiverId }) => {
  try {
    const conversationObjectId = new mongoose.Types.ObjectId(conversationId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    // Update all messages sent TO the receiver, not sent BY them, and not yet seen
    const updated = await Message.updateMany(
      {
        conversationId: conversationObjectId,
        receiverId: receiverObjectId,
        senderId: { $ne: receiverObjectId },
        status: { $ne: 'seen' }
      },
      { status: 'seen', read: true }
    );

    // Fetch conversation participants
    const conversation = await Conversation.findById(conversationId);

    if (conversation) {
      conversation.participants.forEach(participant => {
        const participantId = participant.participantId.toString();

        // Notify all other participants (excluding the one who just saw)
        if (participantId !== receiverId && onlineUsers[participantId]) {
          io.to(onlineUsers[participantId]).emit('conversationSeen', { conversationId });
        }
      });
    }

    console.log(`Conversation ${conversationId} marked as seen`);

  } catch (error) {
    console.log('Error marking conversation as seen:', error);
  }
});



    // Mark message as read
    socket.on('markAsRead', async (messageId) => {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(messageId, { isRead: true }, { new: true });

        if (updatedMessage) {
          io.emit('messageRead', messageId);

          // 🔥 Update unread count for this user
          const unreadCount = await Message.countDocuments({
            receiverId: updatedMessage.receiverId,
            isRead: false
          });

          if (onlineUsers[updatedMessage.receiverId]) {
            io.to(onlineUsers[updatedMessage.receiverId]).emit('unreadCount', {
              userId: updatedMessage.receiverId,
              count: unreadCount
            });
          }
        }

        console.log('Message marked as read:', messageId);
      } catch (error) {
        console.log('Error marking message as read:', error);
      }
    });

    // Manual: get unread count
    socket.on('getUnreadCount', async (userId) => {
      try {
        const unreadCount = await Message.countDocuments({
          receiverId: userId,
          isRead: false
        });

        io.to(socket.id).emit('unreadCount', { userId, count: unreadCount });
        console.log(`Unread count for user ${userId}: ${unreadCount}`);
      } catch (error) {
        console.log('Error fetching unread count:', error);
        io.to(socket.id).emit('unreadCountError', { error: 'Failed to fetch unread count' });
      }
    });
  });
};
