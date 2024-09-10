import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all users with pagination
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/all?page=${page}`);
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
      const response = await api.get(`/users/all/search?query=${query}`);
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
    nextPageUrl: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.noMoreUsers = false;
      state.nextPageUrl = null;
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
        const { users, nextPageUrl } = action.payload;

        // Avoid duplicates by filtering out users already in the list
        const newUsers = users.filter(
          (newUser) =>
            !state.users.some((existingUser) => existingUser.id === newUser.id)
        );

        if (!newUsers.length) {
          state.noMoreUsers = true;
        } else {
          state.users = [...state.users, ...newUsers];
        }

        state.nextPageUrl = nextPageUrl;
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
        const { users } = action.payload;
        state.users = users; // Replace users instead of appending
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
