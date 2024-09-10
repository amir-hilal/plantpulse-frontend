import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

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
    modalOpen: false,
    loading: false,
    error: null,
  },
  reducers: {
    openTimelineModal: (state) => {
      state.modalOpen = true;
    },
    closeTimelineModal: (state) => {
      state.timelines = [];

      state.modalOpen = false;
    },
  },
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
export const { openTimelineModal, closeTimelineModal } = timelinesSlice.actions;

export default timelinesSlice.reducer;
