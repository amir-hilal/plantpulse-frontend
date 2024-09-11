import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api'; // Import your api file

export const fetchPlants = createAsyncThunk(
  'plants/fetchPlants',
  async (gardenId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/garden/${gardenId}/plants`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewPlant = createAsyncThunk(
  'plants/addNewPlant',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/plants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plants: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPlants: (state) => {
      state.plants = []; // Clear plants when switching gardens
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = action.payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewPlant.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewPlant.fulfilled, (state, action) => {
        state.loading = false;
        state.plants.push(action.payload);
      })
      .addCase(addNewPlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPlants } = plantsSlice.actions;
export default plantsSlice.reducer;
