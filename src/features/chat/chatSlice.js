import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chattedFriends: [],
  unreadMessages: {},
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
        if (!state.chattedFriends.includes(user.id)) {
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
  },
});

export const {
  moveUserToChatted,
  incrementUnreadMessages,
  resetUnreadMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
