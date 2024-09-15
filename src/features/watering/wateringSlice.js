import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

// Thunk to fetch watering schedules from the backend
export const fetchWateringSchedules = createAsyncThunk(
  'watering/fetchSchedules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/watering-schedules`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to mark watering event as done
export const markWateringAsDone = createAsyncThunk(
  'watering/markAsDone',
  async ({ plantId, eventId }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/plants/${plantId}/watering-events/${eventId}`
      );
      return { eventId, updatedEvent: response.data.event }; // return updated event and its ID
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wateringSlice = createSlice({
  name: 'watering',
  initialState: {
    schedules: [],
    loading: false,
    markingDoneById: {}, // Track marking done state per event
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
        state.schedules = action.payload;
      })
      .addCase(fetchWateringSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch schedules';
      })
      .addCase(markWateringAsDone.pending, (state, action) => {
        const { eventId } = action.meta.arg;
        state.markingDoneById[eventId] = true; // Set marking to true for this specific event
      })
      .addCase(markWateringAsDone.fulfilled, (state, action) => {
        const { eventId, updatedEvent } = action.payload;
        state.markingDoneById[eventId] = false; // Set marking to false after done
        // Update the specific event in the schedules
        state.schedules = state.schedules.map((schedule) =>
          schedule.id === eventId ? updatedEvent : schedule
        );
      })
      .addCase(markWateringAsDone.rejected, (state, action) => {
        const { eventId } = action.meta.arg;
        state.markingDoneById[eventId] = false; // Reset marking state on failure
        state.error = action.payload || 'Failed to mark as done';
      });
  },
});

export default wateringSlice.reducer;
