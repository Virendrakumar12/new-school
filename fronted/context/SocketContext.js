import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children, userId, userType }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('https://new-school-g37a.onrender.com', {
      autoConnect: true,
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to socket server');
      setIsConnected(true);
      if (userId) {
        console.log('Emitting userOnline:', userId, userType);
        newSocket.emit('userOnline', { userId, userType });
      }
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from socket server');
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId, userType]); // recreate socket if user changes

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
