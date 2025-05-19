import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/Utils/axiosInstance';

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchChatHistory',
  async ({ participant1, participant2 }, thunkAPI) => {
    try {
      console.log("paritciparnts 1",participant1);
      console.log("participants 2",participant2);
      const response = await axiosInstance.get('/messages/getConversation', {
        params: { participant1, participant2 },
      });
      if(!response){
        alert("mesage is reached");
        }
      console.log("res.data in fetch history",response.data.messages);
      
      return response.data;
    } catch (error) {
      alert("mesage is reached error");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);





const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    conversationId: null,
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const incoming = action.payload;

      // Attach current conversationId if missing (important!)
      if (!incoming.conversationId && state.conversationId) {
        incoming.conversationId = state.conversationId;
      }

      const exists = state.messages.some(
        (msg) => msg._id === incoming._id || (incoming.tempId && msg.tempId === incoming.tempId)
      );

      if (!exists) {
        state.messages.push(incoming);
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    updateMessageStatus: (state, action) => {
  const { messageId, status } = action.payload;
  const msg = state.messages.find((m) => m._id === messageId);
  if (msg) {
    msg.status = status;
  }
},
markMessagesAsRead: (state, action) => {
  const { messageIds } = action.payload;

  state.messages = state.messages.map(msg => {
    if (messageIds.includes(msg._id)) {
      return { ...msg, status: 'seen' };
    }
    return msg;
  })
},

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
    state.loading = false;
    state.conversationId = action.payload.conversationId;
    console.log("conversationid at fetchhistoryh",action.payload.conversationId);
     state.messages = action.payload.messages;

    // Ensure messages is always an arra
})

      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      
      
  },
});

export const { addMessage,updateMessageStatus ,setMessages,markMessagesAsRead } = messageSlice.actions;
export default messageSlice.reducer;
