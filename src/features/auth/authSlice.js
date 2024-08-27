import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData } from '../../services/authService';

const initialState = {
    isLoggedIn: false,
    userProfile: null,
};

// Async thunk to fetch user data if a token exists
export const initializeUser = createAsyncThunk(
    'auth/initializeUser',
    async (_, { rejectWithValue }) => {
        try {
            const user = await fetchUserData();
            return user;
        } catch (error) {
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
            localStorage.removeItem('token'); // Remove token from localStorage on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.userProfile = action.payload;
            })
            .addCase(initializeUser.rejected, (state) => {
                state.isLoggedIn = false;
                state.userProfile = null;
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
