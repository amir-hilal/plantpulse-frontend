import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch plants by garden
export const fetchPlantsByGarden = createAsyncThunk(
  'plants/fetchPlantsByGarden',
  async (gardenId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gardens/${gardenId}/plants`);
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
      state.plants = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlantsByGarden.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlantsByGarden.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = action.payload;
      })
      .addCase(fetchPlantsByGarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPlants } = plantsSlice.actions;
export default plantsSlice.reducer;
