// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
        user: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { setUserData, logout } = authSlice.actions;
export default authSlice.reducer;
