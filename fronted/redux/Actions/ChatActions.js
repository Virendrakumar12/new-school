
import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '@/Utils/axiosInstance'


export const fetchChatHistory = createAsyncThunk(
    'chat/fetchChatHistory',
    async ({ participant1, participant2 }, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/getConversation', {
          params: { participant1, participant2 }
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  // src/redux/actions/messageActions.js


// Send message action (calls backend)
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ senderId, receiverId, message, senderType, receiverType }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/sendMessage', {
        senderId,
        receiverId,
        message,
        senderType,
        receiverType,
      });
      return response.data.newMessage; // returning newMessage to store
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
