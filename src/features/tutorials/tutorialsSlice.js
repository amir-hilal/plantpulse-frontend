import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

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
      const response = await api.get(`/tutorials/search?q=${query}&page=${page}`);
      return response.data;
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
  },
  reducers: {
    resetTutorials(state) {
      state.tutorials = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.noMoreTutorials = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tutorials
      .addCase(fetchTutorials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.loading = false;
        const { data: tutorials, next_page_url: nextPageUrl } = action.payload;

        const newTutorials = tutorials.filter(
          (newTutorial) =>
            !state.tutorials.some((existingTutorial) => existingTutorial.id === newTutorial.id)
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
      })
      // Search tutorials
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
  },
});

export const { resetTutorials } = tutorialsSlice.actions;

export default tutorialsSlice.reducer;
