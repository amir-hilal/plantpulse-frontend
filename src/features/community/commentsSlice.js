import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ postId, page }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${postId}/comments?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
    page: 1,
    noMoreComments: false,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.page = 1;
      state.noMoreComments = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.length === 0) {
          state.noMoreComments = true;
        } else {
          state.comments = [...state.comments, ...action.payload.data];
        }
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;

