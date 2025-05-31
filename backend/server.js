import cors from "cors";
import express from "express";
import { configDotenv } from "dotenv";
import basketRouter from "./router/basketRouter.js";
import productRouter from "./router/productRouter.js";
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

app.listen(PORT || 8030, () => {
    console.log("Server is running on port "+PORT);
});

// mongose_URL = mongodb + srv://Ali:Qurbanov2005@cluster0.bx39qu2.mongodb.net/