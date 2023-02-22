import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        isLogin: false,
        profile: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.profile = action.payload;
        },
        refresh: (state, action) => {
            state.profile.token = action.payload?.token;
        },
        logout: (state) => {
            state.isLogin = false;
            state.profile = null;
        },
    },
});

export default authSlice.reducer;
export const { login, logout, refresh } = authSlice.actions;
