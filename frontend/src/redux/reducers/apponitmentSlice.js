import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8030/appointment";

export const createAppointment = createAsyncThunk(
    "appointment/create",
    async (data, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token || localStorage.getItem("token");
            const res = await axios.post(BASE_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const getAppointmentsByPatient = createAsyncThunk(
    "appointment/getByPatient",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token || localStorage.getItem("token");
            const res = await axios.get(`${BASE_URL}/my-appointments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const getAppointmentsByDoctor = createAsyncThunk(
    "appointment/getByDoctor",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token || localStorage.getItem("token");
            const res = await axios.get(`${BASE_URL}/doctor-appointments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const updateAppointmentStatus = createAsyncThunk(
    "appointment/updateStatus",
    async ({ appointmentId, status }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token || localStorage.getItem("token");
            const res = await axios.put(
                `${BASE_URL}/update-status/${appointmentId}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deleteAppointment = createAsyncThunk(
    "appointment/deleteAppointment",
    async (appointmentId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${BASE_URL}/${appointmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return appointmentId;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const finishAppointment = createAsyncThunk(
    "appointment/finishAppointment",
    async (appointmentId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `${BASE_URL}/${appointmentId}/finish`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload.appointment || action.payload);
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(getAppointmentsByPatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAppointmentsByPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getAppointmentsByPatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(getAppointmentsByDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAppointmentsByDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getAppointmentsByDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
                const updated = action.payload.appointment || action.payload;
                const index = state.list.findIndex((app) => app._id === updated._id);
                if (index !== -1) {
                    state.list[index] = updated;
                }
            })

            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.list = state.list.filter((app) => app._id !== action.payload);
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })

            .addCase(finishAppointment.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.list.findIndex((app) => app._id === updated._id);
                if (index !== -1) {
                    state.list[index] = updated;
                }
            })
            .addCase(finishAppointment.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    },
});

export default appointmentSlice.reducer;
