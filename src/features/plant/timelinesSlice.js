import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api'; // Assuming you have an API service

export const fetchTimelines = createAsyncThunk(
  'timelines/fetchTimelines',
  async ({ plantId, page }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const currentPage = state.timelines.page || 1;
      const response = await api.get(
        `/plants/${plantId}/timelines?page=${page || currentPage}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a new timeline event for the plant
export const addTimelineEvent = createAsyncThunk(
  'timelines/addTimelineEvent',
  async ({ plantId, message }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/plants/${plantId}/timelines`, {
        message,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const timelinesSlice = createSlice({
  name: 'timelines',
  initialState: {
    timelines: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimelines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTimelines.fulfilled, (state, action) => {
        state.loading = false;
        // Append new timelines to the existing ones
        state.timelines = [...state.timelines, ...action.payload.data];
        state.page += 1;
        state.hasMore = action.payload.current_page < action.payload.last_page;
      })
      .addCase(fetchTimelines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTimelineEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTimelineEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.timelines.push(action.payload); // Add new timeline event
      })
      .addCase(addTimelineEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default timelinesSlice.reducer;
