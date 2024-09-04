import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch friends for the logged-in user
export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/friends');
      return response.data.friends;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch friend requests for the logged-in user
export const fetchFriendRequests = createAsyncThunk(
  'friends/fetchFriendRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/friend-requests');
      return response.data.requests;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Handle sending a friend request
export const sendFriendRequest = createAsyncThunk(
  'friends/sendFriendRequest',
  async (friendId, { rejectWithValue }) => {
    try {
      const response = await api.post('/friends/request', {
        friend_id: friendId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Handle accepting a friend request
export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptFriendRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/friends/accept/${requestId}`);
      return { ...response.data, requestId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Handle declining a friend request
export const declineFriendRequest = createAsyncThunk(
  'friends/declineFriendRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/friends/decline/${requestId}`);
      return { response, requestId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Handle removing a friend
export const removeFriend = createAsyncThunk(
  'friends/removeFriend',
  async (friendId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/friends/remove/${friendId}`);
      return { response, friendId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    friendRequests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFriendRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = action.payload;
      })
      .addCase(fetchFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        const acceptedFriendId = action.payload.friend.id;
        const acceptedFriend = action.payload.friend.user;
        acceptedFriend.relationship_status = "connected"
        state.friends.push(acceptedFriend);
        state.friendRequests = state.friendRequests.filter(
          (request) => request.id !== acceptedFriendId
        );
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(declineFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(declineFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = state.friendRequests.filter(
          (request) => request.id !== action.payload.response.data.friend.id
        );
      })
      .addCase(declineFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = state.friends.filter(
          (friend) => friend.id !== action.payload.friendId
        );
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default friendsSlice.reducer;
