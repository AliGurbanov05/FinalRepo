// redux/reducers/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8030/products";

// Async Thunks
export const fetchAdminProducts = createAsyncThunk(
    "admin/fetchAdminProducts",
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

export const deleteProductAPI = createAsyncThunk(
    "admin/deleteProductAPI",
    async (productId) => {
        await axios.delete(`${API_URL}/${productId}`);
        return productId;
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProductAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            })
            .addCase(deleteProductAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default adminSlice.reducer;
