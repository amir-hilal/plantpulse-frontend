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
export const addTimelineEvent = createAsyncThunk(
  'timelines/addTimelineEvent',
  async ({ plant_id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/plants/${plant_id}/timelines`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for handling FormData
          },
        }
      );

      // Include both the user message and the assistant's response
      const { timeline, assistant_response } = response.data;
      return { timeline, assistant_response };
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

        const newTimelines = action.payload.data.filter(
          (newTimeline) =>
            !state.timelines.some((timeline) => timeline.id === newTimeline.id)
        );

        state.timelines = [...state.timelines, ...newTimelines]; // Append new timelines
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

        const timeline = action.payload?.timeline;
        if (timeline && timeline.description) {
          state.timelines.push(timeline); // Add the new timeline event
        }

        if (action.payload?.assistant_response) {
          state.timelines.push({
            description: action.payload.assistant_response,
            isAssistantResponse: true, // Mark it as a response from GPT-4
          });
        }
      });
  },
});

export default timelinesSlice.reducer;
