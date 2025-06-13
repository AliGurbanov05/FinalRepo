import cors from "cors";
import express from "express";
import { configDotenv } from "dotenv";
import basketRouter from "./router/basketRouter.js";
import productRouter from "./router/productRouter.js";
import loginRouter from "./router/loginRouter.js";
import registerRouter from "./router/registerRouter.js";
import patientRouter from "./router/patientRouter.js"
import { connectDB } from "./db/config.js";

configDotenv();
connectDB();

const PORT = 8030;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);
app.use("/basket", basketRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use('/patient', patientRouter);

app.listen(PORT || 8030, () => {
    console.log("Server is running on port " + PORT);
});