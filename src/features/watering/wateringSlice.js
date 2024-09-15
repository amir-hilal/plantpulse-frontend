import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch watering schedules from the backend
export const fetchWateringSchedules = createAsyncThunk(
  'watering/fetchSchedules',
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/plants/${plantId}/watering-events`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wateringSlice = createSlice({
  name: 'watering',
  initialState: {
    schedules: [],
    loading: false, // Use loading instead of status
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWateringSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWateringSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload; // Store schedules from API
      })
      .addCase(fetchWateringSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch schedules';
      });
  },
});

export default wateringSlice.reducer;
