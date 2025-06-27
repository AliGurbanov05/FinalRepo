// redux/reducers/otpSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendOTP = createAsyncThunk(
  'otp/sendOTP',
  async (phone, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8030/otp/send-otp', { phone });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Kod göndərilmədi');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'otp/verifyOTP',
  async ({ phone, code }, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8030/otp/verify-otp', { phone, code });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Kod təsdiqlənmədi');
    }
  }
);

const otpSlice = createSlice({
    name: 'otp',
    initialState: {
        loading: false,
        error: null,
        verified: false,
        message: '',
        codeSent: false, // Əlavə et
    },
    reducers: {
        resetOTPState: (state) => {
            state.loading = false;
            state.error = null;
            state.verified = false;
            state.message = '';
            state.codeSent = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
                state.codeSent = false;
            })
            .addCase(sendOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.codeSent = true; // Burada true et
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.codeSent = false;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.verified = true;
                state.message = action.payload.message;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.verified = false;
            });
    }
});
  
  
export const { resetOTPState } = otpSlice.actions;
export default otpSlice.reducer;
