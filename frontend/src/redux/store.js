import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../redux/reducers/basketSlice";
import adminReducer from "../redux/reducers/adminSlice";
import productReducer from "../redux/reducers/productSlice";

const store = configureStore({
  reducer: {
    basket: basketReducer,
    products: productReducer,
    admin:adminReducer
  },
});

export default store;
