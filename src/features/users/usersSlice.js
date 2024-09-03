import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all users with pagination
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Search users by query
export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/search?query=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    noMoreUsers: false,
    nextPageUrlFriends: null,
    nextPageUrlNonFriends: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.noMoreUsers = false;
      state.nextPageUrlFriends = null;
      state.nextPageUrlNonFriends = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const { friends, nonFriends, nextPageUrlFriends, nextPageUrlNonFriends } = action.payload;
        if (!friends.length && !nonFriends.length) {
          state.noMoreUsers = true;
        } else {
          state.users = [...state.users, ...friends, ...nonFriends];
          state.nextPageUrlFriends = nextPageUrlFriends;
          state.nextPageUrlNonFriends = nextPageUrlNonFriends;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const { friends, nonFriends } = action.payload;
        state.users = [...friends, ...nonFriends];
        state.noMoreUsers = true; // Since it's a search, assume no pagination
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
