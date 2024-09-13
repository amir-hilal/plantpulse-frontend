import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk to fetch tutorials with pagination
export const fetchTutorials = createAsyncThunk(
  'tutorials/fetchTutorials',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tutorials?page=${page}`);
      return response.data; // Assuming the API returns data in a pagination format
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
    nextPageUrl: null,
  },
  reducers: {
    resetTutorials(state) {
      state.tutorials = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.noMoreTutorials = false;
      state.nextPageUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.loading = false;
        const { data: tutorials, next_page_url: nextPageUrl } = action.payload;

        // Filter out duplicate tutorials
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
        state.nextPageUrl = nextPageUrl;
        state.currentPage += 1;
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTutorials } = tutorialsSlice.actions;

export default tutorialsSlice.reducer;
