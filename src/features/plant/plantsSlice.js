import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

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

// Fetch plant details
export const fetchPlantDetails = createAsyncThunk(
  'plants/fetchPlantDetails',
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/plants/${plantId}`);
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

// New deletePlant action
export const deletePlant = createAsyncThunk(
  'plants/deletePlant',
  async (plantId, { rejectWithValue }) => {
    try {
      await api.delete(`/plants/${plantId}`);
      return plantId; // Return the id of the deleted plant
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plants: [],
    plant: {},
    garden_name: '',
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
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = state.plants.filter(
          (plant) => plant.id !== action.payload
        );
      })
      .addCase(deletePlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPlantDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlantDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.plant = action.payload;
        state.garden_name = action.payload.garden_name; // Assuming API returns plant details and garden name
      })
      .addCase(fetchPlantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPlants } = plantsSlice.actions;
export default plantsSlice.reducer;
