import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8030/result';

// Diaqnoz əlavə etmək üçün thunk
export const submitDiagnosis = createAsyncThunk(
    'result/submitDiagnosis',
    async ({ appointmentId, diagnosis }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${BASE_URL}/add/${appointmentId}`, { diagnosis }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const resultSlice = createSlice({
    name: 'result',
    initialState: {
        diagnosis: '',
        success: false,
        loading: false,
        error: null,
    },
    reducers: {
        clearResultState: (state) => {
            state.diagnosis = '';
            state.success = false;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitDiagnosis.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitDiagnosis.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.diagnosis = action.payload.diagnosis;
            })
            .addCase(submitDiagnosis.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearResultState } = resultSlice.actions;
export default resultSlice.reducer;
