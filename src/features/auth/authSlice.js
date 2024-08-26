import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userProfile: null,
};

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
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
