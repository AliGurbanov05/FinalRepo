import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8030/doctor';

// Dashboard-u gətirən thunk
export const fetchDoctorDashboard = createAsyncThunk(
    'doctor/fetchDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${BASE_URL}/dashboard`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Profil yeniləmə thunk
export const updateDoctorProfile = createAsyncThunk(
    'doctor/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${BASE_URL}/profile`, profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Görüşü silmək thunk (əvvəl var idi)
export const deleteAppointment = createAsyncThunk(
    'doctor/deleteAppointment',
    async (appointmentId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${BASE_URL}/appointments/${appointmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return appointmentId;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Görüşü bitirmək thunk (əvvəl var idi)
export const finishAppointment = createAsyncThunk(
    'doctor/finishAppointment',
    async (appointmentId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${BASE_URL}/appointments/${appointmentId}/complete`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Yeni: Həkim hesabını silmək thunk
export const deleteDoctorAccountThunk = createAsyncThunk(
    'doctor/deleteAccount',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`${BASE_URL}/delete-account`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        doctor: null,
        appointments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctorDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDoctorDashboard.fulfilled, (state, action) => {
                console.log('Dashboard data:', action.payload); // ƏLAVƏ ET
                state.loading = false;
                state.doctor = action.payload.doctor;
                state.appointments = action.payload.appointments;
            })            
            .addCase(fetchDoctorDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            .addCase(updateDoctorProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDoctorProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.doctor = action.payload;
            })
            .addCase(updateDoctorProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.appointments = state.appointments.filter(app => app._id !== action.payload);
            })
            .addCase(finishAppointment.fulfilled, (state, action) => {
                const index = state.appointments.findIndex(app => app._id === action.payload._id);
                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
            })
            .addCase(deleteDoctorAccountThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDoctorAccountThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.doctor = null;
                state.appointments = [];
            })
            .addCase(deleteDoctorAccountThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default doctorSlice.reducer;
