// redux/reducers/basketSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8030/basket";

// Async Thunks
export const fetchBasketData = createAsyncThunk(
  "basket/fetchBasketData",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addToBasketAPI = createAsyncThunk(
  "basket/addToBasketAPI",
  async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
  }
);

export const removeFromBasketAPI = createAsyncThunk(
  "basket/removeFromBasketAPI",
  async (productId) => {
    await axios.delete(`${API_URL}/${productId}`);
    return productId;
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasketData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBasketData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBasketData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToBasketAPI.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromBasketAPI.fulfilled, (state, action) => {
        // Əvvəlki `item.id` düzgün deyil, düzəldildi `item._id`
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default basketSlice.reducer;
