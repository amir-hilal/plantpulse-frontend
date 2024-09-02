// src/features/friends/friendsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch friends for the logged-in user
export const fetchFriends = createAsyncThunk('friends/fetchFriends', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/friends');
        return response.data.friends;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Search friends for the logged-in user
export const searchFriends = createAsyncThunk('friends/searchFriends', async (searchTerm, { rejectWithValue }) => {
    try {
        const response = await api.get(`/friends/search?query=${searchTerm}`);
        return response.data.friends;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: [],
        loading: false,
        error: null,
        searchResults: [],
    },
    reducers: {
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.friends = action.payload;
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchFriends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSearchResults } = friendsSlice.actions;

export default friendsSlice.reducer;
