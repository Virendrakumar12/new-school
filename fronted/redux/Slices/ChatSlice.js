// 📦 Redux slice + actions for fetching chat history

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChatHistory } from '../Actions/ChatActions';

// ✅ Async thunk to fetch chat history


const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversationId: null,
    participants: [],
    messages: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    clearChatHistory(state) {
      state.conversationId = null;
      state.participants = [];
      state.messages = [];
      state.status = 'idle';
      state.error = null;
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversationId = action.payload.conversationId;
        state.participants = action.payload.participants;
        state.messages = action.payload.messages;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to load chat history';
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload); // add new message
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send message';
      });
  }
});

export const { clearChatHistory } = chatSlice.actions;
export default chatSlice.reducer;
