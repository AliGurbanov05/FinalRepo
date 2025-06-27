import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPatientDashboard = createAsyncThunk(
    'dashboard/fetchPatientDashboard',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8030/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchPatientAppointments = createAsyncThunk(
    'dashboard/fetchPatientAppointments',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8030/patient/appointments', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updatePatientDashboard = createAsyncThunk(
    'dashboard/updatePatientDashboard',
    async (updatedData, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('http://localhost:8030/patient/update', updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deletePatientAccountThunk = createAsyncThunk(
    'dashboard/deletePatientAccount',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete('http://localhost:8030/patient/delete-account', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        data: null,
        appointments: [],
        responses: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatientDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatientDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPatientDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Xəta baş verdi';
            })

            .addCase(updatePatientDashboard.fulfilled, (state, action) => {
                state.data = action.payload;
            })

            .addCase(deletePatientAccountThunk.fulfilled, (state) => {
                state.data = null;
            })

            .addCase(fetchPatientAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload.appointments || [];
                state.responses = action.payload.responses || [];
            })
            .addCase(fetchPatientAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Görüşlər yüklənərkən xəta baş verdi';
            });
    },
});

export default dashboardSlice.reducer;
