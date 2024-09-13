import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

// Fetch tutorials with pagination
export const fetchTutorials = createAsyncThunk(
  'tutorials/fetchTutorials',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tutorials?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Search tutorials by query
export const searchTutorials = createAsyncThunk(
  'tutorials/searchTutorials',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/tutorials/search?q=${query}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTutorialById = createAsyncThunk(
  'tutorials/fetchTutorialById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tutorials/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchComments = createAsyncThunk(
  'tutorials/fetchComments',
  async ({ tutorialId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/tutorials/${tutorialId}/comments?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a new comment for a tutorial
export const addComment = createAsyncThunk(
  'tutorials/addComment',
  async ({ tutorialId, comment_text }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/tutorials/${tutorialId}/comments`, {
        comment_text,
      });
      toast.success('Comment added successfully!');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  'tutorials/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await api.delete(`/tutorials/comments/${commentId}`);
      return { id: commentId }; // Return commentId to remove from state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState: {
    tutorials: [],
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 1,
    noMoreTutorials: false,

    // Comments states
    comments: [],
    loadingComments: false,
    commentsError: null,
    commentsHasMore: true,
    commentsCurrentPage: 1,
    noMoreComments: false,
  },
  reducers: {
    resetTutorials(state) {
      state.tutorials = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.noMoreTutorials = false;
    },
    resetComments(state) {
      state.comments = [];
      state.commentsCurrentPage = 1;
      state.commentsHasMore = true;
      state.noMoreComments = false;
    },
  },
  extraReducers: (builder) => {
    // Tutorials fetching
    builder
      .addCase(fetchTutorialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorialById.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorials = [...state.tutorials, action.payload]; // Add the tutorial to the state
      })
      .addCase(fetchTutorialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchTutorials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.loading = false;
        const { data: tutorials, next_page_url: nextPageUrl } = action.payload;

        const newTutorials = tutorials.filter(
          (newTutorial) =>
            !state.tutorials.some(
              (existingTutorial) => existingTutorial.id === newTutorial.id
            )
        );

        if (!newTutorials.length) {
          state.noMoreTutorials = true;
        } else {
          state.tutorials = [...state.tutorials, ...newTutorials];
        }

        state.hasMore = !!nextPageUrl;
        state.currentPage += 1;
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Search tutorials
    builder
      .addCase(searchTutorials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTutorials.fulfilled, (state, action) => {
        state.loading = false;
        const { data: tutorials, next_page_url: nextPageUrl } = action.payload;

        state.tutorials = tutorials;
        state.hasMore = !!nextPageUrl;
        state.currentPage += 1;
      })
      .addCase(searchTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Comments fetching
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loadingComments = true;
        state.commentsError = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loadingComments = false;
        const { data: comments, next_page_url: nextPageUrl } = action.payload;

        const newComments = comments.filter(
          (newComment) =>
            !state.comments.some(
              (existingComment) => existingComment.id === newComment.id
            )
        );

        if (!newComments.length) {
          state.noMoreComments = true;
        } else {
          state.comments = [...state.comments, ...newComments];
        }

        state.commentsHasMore = !!nextPageUrl;
        state.commentsCurrentPage += 1;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loadingComments = false;
        state.commentsError = action.payload;
      });
    // Add comment
    builder
      .addCase(addComment.pending, (state) => {
        state.loadingComments = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loadingComments = false;
        state.comments = [action.payload, ...state.comments]; // Add the new comment at the top
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loadingComments = false;
        state.commentsError = action.payload;
      });

    // Delete comment
    builder
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload.id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.commentsError = action.payload;
      });
  },
});

export const { resetTutorials, resetComments } = tutorialsSlice.actions;

export default tutorialsSlice.reducer;
