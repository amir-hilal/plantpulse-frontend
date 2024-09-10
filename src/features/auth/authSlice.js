import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const initialState = {
  isLoggedIn: false,
  userProfile: null,
  loading: false,
};

// Async thunk to fetch user data if a token exists
export const initializeUser = createAsyncThunk(
  'auth/initializeUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userProfile = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userProfile = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userProfile = action.payload;
        state.loading = false;
      })
      .addCase(initializeUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.userProfile = null;
        state.loading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
