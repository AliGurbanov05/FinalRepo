import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../redux/reducers/basketSlice";
import adminReducer from "../redux/reducers/adminSlice";
import productReducer from "../redux/reducers/productSlice";
import registerReducer from "./reducers/registerSlice";
import dashboardReducer from "./reducers/dashboardSlice";
import authReducer from "./reducers/authSlice";
import paymentReducer from "./reducers/paymentSlice"
import doctorReducer from "./reducers/doctorSlice"
import resultReducer from "./reducers/resultSlice"
import appointmentReducer from "./reducers/apponitmentSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer,
    basket: basketReducer,
    products: productReducer,
    admin: adminReducer,
    register: registerReducer,
    dashboard: dashboardReducer,
    payment: paymentReducer,
    doctor: doctorReducer,
    result: resultReducer
  },
});

export default store;
