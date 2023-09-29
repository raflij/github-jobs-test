import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { setAuthenticated, logout } = authSlice.actions;

export default authSlice.reducer;