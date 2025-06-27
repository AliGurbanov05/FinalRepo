// redux/reducers/registerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8030/register', userData);
            return response.data;
        } catch (err) {
            // Axios response yoxdursa (məs. network error), fallback mesaj ver
            const message = err.response?.data?.message || err.message || 'Qeydiyyat xətası baş verdi';
            return rejectWithValue(message);
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    // Reducer state strukturu
    initialState: {
        user: null,         // ⬅️ Əlavə edilməlidir
        data: null,
        appointments: [],
        responses: [],
        message: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.user = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { message: action.payload };
                state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            });
    },
});

export default registerSlice.reducer;
