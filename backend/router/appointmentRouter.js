import express from "express";
import {
    createAppointment,
    getAppointmentsByCategory,
    getAppointmentsByPhone,
} from "../controllers/appointmentControler.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/",verifyToken, createAppointment);
router.get("/category/:category",verifyToken, getAppointmentsByCategory);
router.get("/phone/:phone",verifyToken, getAppointmentsByPhone);

export default router;
