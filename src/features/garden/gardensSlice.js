import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; // Axios instance for API requests

// Async thunk for fetching gardens
export const fetchGardens = createAsyncThunk('gardens/fetchGardens', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/garden');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const gardensSlice = createSlice({
  name: 'gardens',
  initialState: {
    gardens: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearGardens: (state) => {
      state.gardens = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGardens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGardens.fulfilled, (state, action) => {
        state.loading = false;
        state.gardens = action.payload;
      })
      .addCase(fetchGardens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGardens } = gardensSlice.actions;

export default gardensSlice.reducer;
