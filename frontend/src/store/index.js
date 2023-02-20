import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import noteSlice from './noteSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        note: noteSlice,
    },
});

export default store;
