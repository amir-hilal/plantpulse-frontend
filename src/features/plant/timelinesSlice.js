import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api'; // Import your api file

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
      });
  },
});

export default timelinesSlice.reducer;
