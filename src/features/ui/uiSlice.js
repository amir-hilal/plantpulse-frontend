import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openMenu(state) {
            state.isMenuOpen = true;
        },
        closeMenu(state) {
            state.isMenuOpen = false;
        },
    },
});

export const { openMenu, closeMenu } = uiSlice.actions;
export default uiSlice.reducer;
