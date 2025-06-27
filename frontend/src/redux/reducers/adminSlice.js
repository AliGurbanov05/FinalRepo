// src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8030"; // Backend URL-ni buraya yaz

// İstifadəçiləri gətir
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        const res = await axios.get(`${BASE_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "İstifadəçi xətası");
    }
});

// Görüşləri gətir
export const fetchAppointments = createAsyncThunk("admin/fetchAppointments", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/admin/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Görüş xətası");
    }
});

// İstifadəçini yenilə
export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, updates }, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${BASE_URL}/admin/users/${id}`, updates, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Yeniləmə xətası");
    }
});

export const deleteAppointment = createAsyncThunk("admin/deleteAppointment", async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${BASE_URL}/admin/appointments/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Silinmə xətası");
    }
});

// İstifadəçini sil
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8030/admin/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return id; // Silinən userin id-si qayıtsın
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Silinmə xətası");
    }
});


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        appointments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                // action.payload array yoxla
                state.users = Array.isArray(action.payload) ? action.payload : [];
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "İstifadəçilər yüklənmədi";
            })
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.appointments = Array.isArray(action.payload) ? action.payload : [];
                state.loading = false;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Görüşlər yüklənmədi";
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                // update edilən useru tap və dəyiş
                const idx = state.users.findIndex((u) => u._id === action.payload._id);
                if (idx !== -1) {
                    state.users[idx] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "İstifadəçi yenilənmədi";
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.appointments = state.appointments.filter((appt) => appt._id !== action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u._id !== action.payload);
            })
            
    },
});

export default adminSlice.reducer;
