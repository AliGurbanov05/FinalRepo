import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPatientDashboard = createAsyncThunk(
    'dashboard/fetchPatientDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8030/patient/dashboard', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Server xətası');
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPatientDashboard.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatientDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPatientDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default dashboardSlice.reducer;
