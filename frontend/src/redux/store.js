import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../redux/reducers/basketSlice";
import adminReducer from "../redux/reducers/adminSlice";
import productReducer from "../redux/reducers/productSlice";
import registerReducer from "./reducers/registerSlice";
import dashboardReducer from "./reducers/dashboardSlice";

const store = configureStore({
  reducer: {
    basket: basketReducer,
    products: productReducer,
    admin: adminReducer,
    register: registerReducer,
    dashboard:dashboardReducer
  },
});

export default store;
