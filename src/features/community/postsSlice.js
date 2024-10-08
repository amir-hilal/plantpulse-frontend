import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch friends' posts
export const fetchFriendsPosts = createAsyncThunk(
  'posts/fetchFriendsPosts',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/friends/all?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ( postId , { rejectWithValue }) => {
    try {
      const response = await api.delete(`/posts/${postId}`);
      return { postId, message: response.data.message };
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
    addNewPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFriendsPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.data];
        if (action.payload.data.length < 5) {
          state.noMorePosts = true;
        }
      })
      .addCase(fetchFriendsPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching posts';
      })
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
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.postId
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error deleting post';
      });
  },
});

export const { clearPosts, addNewPost } = postsSlice.actions;
export default postsSlice.reducer;
