import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        profile: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.profile = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.profile = null;
        },
        refreshToken: (state, action) => {
            state.profile.token = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { login, logout, refreshToken } = authSlice.actions;
