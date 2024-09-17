import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

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

export const addTimelineEvent = createAsyncThunk(
  'timelines/addTimelineEvent',
  async ({ plant_id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/plants/${plant_id}/timelines`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const { userTimeline, aiResponse } = response.data;
      return { userTimeline, aiResponse };
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
    loadingMore: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    addTempTimeline: (state, action) => {
      state.timelines.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimelines.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.loading = true;
        } else {
          state.loadingMore = true;
        }
      })
      .addCase(fetchTimelines.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;

        const newTimelines = action.payload.data.filter(
          (newTimeline) =>
            !state.timelines.some((timeline) => timeline.id === newTimeline.id)
        );

        state.timelines = [...state.timelines, ...newTimelines];
        state.page += 1;
        state.hasMore = action.payload.current_page < action.payload.last_page;
      })
      .addCase(fetchTimelines.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload;
      })
      .addCase(addTimelineEvent.fulfilled, (state, action) => {
        const { aiResponse } = action.payload;
        console.log(action.payload)


        if (aiResponse) {
          state.timelines.push({
            description: aiResponse,
            source: 'ai',
          });
        }
      });
  },
});

export const { addTempTimeline } = timelinesSlice.actions;

export default timelinesSlice.reducer;
