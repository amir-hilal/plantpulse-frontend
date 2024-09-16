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

// Define the async thunk for updating a plant
export const updatePlant = createAsyncThunk(
  'plants/updatePlant',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/plants/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
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
      state.plant = null;
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
      })
      .addCase(updatePlant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlant.fulfilled, (state, action) => {
        state.loading = false;
        state.plant = action.payload; // Update the plant details in the state
        const index = state.plants.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.plants[index] = action.payload; // Update the specific plant in the plants array
        }
      })
      .addCase(updatePlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearPlants } = plantsSlice.actions;
export default plantsSlice.reducer;
