import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chattedFriends: [],
  unreadMessages: {},
  lastMessages: {}, // Add this to store the last message per user
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    moveUserToChatted(state, action) {
      const users = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      users.forEach((user) => {
        // Ensure the user is not already in chattedFriends
        const isAlreadyChatted = state.chattedFriends.some(
          (chattedUser) => chattedUser.id === user.id
        );

        if (!isAlreadyChatted) {
          state.chattedFriends.push(user);
        }
      });
    },

    incrementUnreadMessages(state, action) {
      const { userId } = action.payload;
      state.unreadMessages[userId] = (state.unreadMessages[userId] || 0) + 1;
    },

    resetUnreadMessages(state, action) {
      const { userId } = action.payload;
      state.unreadMessages[userId] = 0;
    },

    updateLastMessage(state, action) {
      const { userId, message } = action.payload;
      state.lastMessages[userId] = message; // Store the last message in state
    },
  },
});

export const {
  moveUserToChatted,
  incrementUnreadMessages,
  resetUnreadMessages,
  updateLastMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
