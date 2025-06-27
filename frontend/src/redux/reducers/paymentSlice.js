// redux/reducers/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPaymentIntent = createAsyncThunk(
    'payment/createPaymentIntent',
    async (amount, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8030/payment',
                { amount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Stripe error');
        }
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentIntent: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearPayment: (state) => {
            state.paymentIntent = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentIntent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentIntent = action.payload;
            })
            .addCase(createPaymentIntent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
