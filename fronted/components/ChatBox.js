import { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '@/context/SocketContext';
import {
  addMessage,
  fetchChatHistory,
  markMessagesAsRead,
  updateMessageStatus,
} from '@/redux/Slices/MessageSlice';

export default function ChatBox({ receiverId, receiverType, currentUserId, currentUserType }) {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { messages, conversationId, loading, error } = useSelector((state) => state.message);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentUserId && receiverId) {
      dispatch(fetchChatHistory({ participant1: currentUserId, participant2: receiverId }));
    }
  }, [dispatch, currentUserId, receiverId]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (
        (msg.senderId === receiverId && msg.receiverId === currentUserId) ||
        (msg.senderId === currentUserId && msg.receiverId === receiverId)
      ) {
        dispatch(addMessage(msg));
      }
    };

    const handleMessageDelivered = ({ messageId }) => {
      dispatch(updateMessageStatus({ messageId, status: 'delivered' }));
    };

    const handleMessagesRead = ({ messageIds }) => {
  dispatch(markMessagesAsRead({ messageIds }));
};

    socket.on('newMessage', handleNewMessage);
    socket.on('messageDelivered', handleMessageDelivered);
    socket.on('messageRead',handleMessagesRead);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('messageDelivered', handleMessageDelivered);
      socket.off('messageRead', handleMessagesRead);
    };
  }, [socket, receiverId, currentUserId, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

 useEffect(() => {
  if (!socket || !messages || messages.length === 0) return;

  const unreadMessages = messages.filter(
    (msg) =>
      msg.senderId === receiverId &&
      msg.receiverId === currentUserId &&
      msg.status !== 'seen'
  );
  console.log("Total unread messages:", unreadMessages);

  if (unreadMessages.length > 0) {
    socket.emit('readMessages', {
      senderId: receiverId,      // person who sent
      receiverId: currentUserId, // person who is reading
    });
    console.log("Sent readMessages event to socket for", receiverId, "->", currentUserId);
  }
}, [messages, socket, receiverId, currentUserId, dispatch]);


  const sendMessage = () => {
    if (input.trim() === '') return;

    socket.emit('sendMessage', {
      senderId: currentUserId,
      receiverId,
      senderType: currentUserType,
      receiverType,
      message: input.trim(),
    });

    setInput('');
  };

  const chatMessages = Array.isArray(messages)
    ? messages.filter(
        (msg) =>
          (msg.senderId === receiverId && msg.receiverId === currentUserId) ||
          (msg.senderId === currentUserId && msg.receiverId === receiverId)
      )
    : [];

  return (
    <div className="border p-4 rounded shadow">
      <div className="h-64 overflow-y-auto bg-gray-100 p-2 mb-2">
        {chatMessages.length === 0 ? (
          <div>No messages yet</div>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg._id}
              className={`mb-1 ${msg.senderId === currentUserId ? 'text-right' : 'text-left'}`}
            >
              <span className="inline-block bg-white p-1 rounded shadow">
                {typeof msg.message === 'string'
                  ? msg.message
                  : msg.message && typeof msg.message === 'object' && msg.message.message
                  ? msg.message.message
                  : JSON.stringify(msg.message)}
                  {msg.status === 'sent' && <span className="text-xs ml-1">✔</span>}
                {msg.status === 'delivered' && <span className="text-xs ml-1">✔✔</span>}
                {msg.status === 'seen' && <span className="text-xs text-amber-700 ml-1">✔t✔</span>}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          className="flex-1 border p-1 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button className="bg-blue-500 text-white px-4 rounded-r" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
