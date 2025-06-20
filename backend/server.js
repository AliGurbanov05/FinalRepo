import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import loginRouter from "./router/loginRouter.js";
import registerRouter from "./router/registerRouter.js";
import patientRouter from "./router/patientRouter.js"
import paymentRouter from "./router/paymentRouter.js"
import userRouter from "./router/userRoutes.js"
import appointmentRouter from "./router/appointmentRouter.js"
import { connectDB } from "./db/config.js";
import doctorRouter from './router/doctorRouter.js';

dotenv.config();
connectDB();

const PORT = 8030;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/patient', patientRouter);
app.use("/appointment", appointmentRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/patients", patientRouter);
app.use('/doctor', doctorRouter);
// app.use("/response", responseRouter);
app.use("/payment", paymentRouter);
app.use("/users", userRouter);
app.listen(PORT || 8030, () => {
    console.log("Server is running on port " + PORT);
});