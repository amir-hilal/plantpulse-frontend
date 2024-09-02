import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ username, page = 1 }, { rejectWithValue }) => {
    try {
      const endpoint = username ? `/users/${username}/posts` : '/posts';
      const response = await api.get(endpoint, {
        params: { page },
      });
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
    hasMore: true, // To track if there are more posts to load
  },
  reducers: {
    resetPosts(state) {
      state.posts = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.data];
        state.hasMore = action.payload.next_page_url !== null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
