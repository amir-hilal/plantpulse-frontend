import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Fetch plants for a specific garden
export const fetchPlantsByGarden = createAsyncThunk(
  'plants/fetchPlantsByGarden',
  // async (gardenId, { rejectWithValue }) => {
  //   try {
  //     const response = await api.get(`/gardens/${gardenId}/plants`);
  //     return response.data;
  //   } catch (error) {
  //     return rejectWithValue(error.response.data);
  //   }
  // }

  async (gardenId, { rejectWithValue }) => {
    // Here, use the mock data directly for testing:
    const mockPlantData = [
      {
        id: 1,
        name: 'Snake Plant',
        age: '2 years',
        category: 'Perennials',
        health_status: 'Healthy',
        last_time_watered: 'Today',
        next_watering: 'Tuesday, 10:00 AM',
        height: '50 cm',
        important_note:
          'Noticed some yellowing leaves, might need extra nutrients.',
        image_url: 'https://example.com/plant1.jpg',
      },
      {
        id: 2,
        name: 'Fiddle Leaf Fig',
        age: '1 year',
        category: 'Tropicals',
        health_status: 'Needs Attention',
        last_time_watered: '2 days ago',
        next_watering: 'Thursday, 2:00 PM',
        height: '120 cm',
        important_note: 'Drooping leaves, monitor soil moisture.',
        image_url: 'https://example.com/plant2.jpg',
      },
      // Add more mock data as needed...
    ];

    // Return the mock data after a short delay to simulate an API call:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPlantData);
      }, 1000);
    });
  }
);

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plants: [], // Initialize plants as an empty array
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
      .addCase(fetchPlantsByGarden.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlantsByGarden.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = action.payload;
      })
      .addCase(fetchPlantsByGarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching plants';
      });
  },
});

export const { clearPlants } = plantsSlice.actions;
export default plantsSlice.reducer;
