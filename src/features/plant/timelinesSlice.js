import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api'; // Assuming you have an API service

export const fetchTimelines = createAsyncThunk(
  'timelines/fetchTimelines',
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/plants/${plantId}/timelines`);
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimelines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTimelines.fulfilled, (state, action) => {
        state.loading = false;
        state.timelines = action.payload;
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
