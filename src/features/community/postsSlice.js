import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch posts by username
export const fetchPostsByUsername = createAsyncThunk(
  'posts/fetchPostsByUsername',
  async ({ username, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${username}?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all posts (for a general feed)
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    noMorePosts: false,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.noMorePosts = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.data];
        if (action.payload.data.length < 5) {
          state.noMorePosts = true;
        }
      })
      .addCase(fetchPostsByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching posts';
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.data];
        if (action.payload.data.length < 5) {
          state.noMorePosts = true;
        }
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching posts';
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
