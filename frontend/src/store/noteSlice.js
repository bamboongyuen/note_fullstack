import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        active: null,
        listNote: [],
    },
    reducers: {
        create: (state, action) => {
            state.active = action.payload._id;
            state.listNote.unshift(action.payload);
        },
        load: (state, action) => {
            state.active = null;
            state.listNote = action.payload;
        },
        setActive: (state, action) => {
            state.active = action.payload;
        },
        edit: (state, action) => {
            const newList = [...state.listNote].filter((item) => item._id !== state.active);
            newList.unshift(action.payload);
            state.listNote = newList;
        },
        clear: (state) => {
            state.active = null;
            state.listNote = [];
        },
    },
});

export default noteSlice.reducer;
export const { create, load, setActive, edit, clear } = noteSlice.actions;
