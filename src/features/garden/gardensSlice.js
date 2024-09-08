import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api'; // Axios instance for API requests

// Async thunk for fetching gardens
export const fetchGardens = createAsyncThunk(
  'gardens/fetchGardens',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/garden');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addGarden = createAsyncThunk(
  'gardens/addGarden',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/garden', formData, {
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

export const updateGarden = createAsyncThunk(
  'gardens/updateGarden',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      console.log(formData.get('name'));
      const response = await api.put(`/garden/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete a garden
export const deleteGarden = createAsyncThunk(
  'gardens/deleteGarden',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/garden/${id}`);
      return id; // Return the id of the deleted garden so we can remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      })
      .addCase(addGarden.pending, (state) => {
        state.loading = true;
      })
      .addCase(addGarden.fulfilled, (state, action) => {
        state.loading = false;
        state.gardens.push(action.payload);
      })
      .addCase(addGarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGarden.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGarden.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.gardens.findIndex(
          (garden) => garden.id === action.payload.id
        );
        if (index !== -1) {
          state.gardens[index] = action.payload;
        }
      })
      .addCase(updateGarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteGarden.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGarden.fulfilled, (state, action) => {
        state.loading = false;
        state.gardens = state.gardens.filter(
          (garden) => garden.id !== action.payload
        );
      })
      .addCase(deleteGarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete garden';
      });
  },
});

export const { clearGardens } = gardensSlice.actions;

export default gardensSlice.reducer;
