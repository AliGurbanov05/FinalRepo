import express from "express";
import {
    getAllUsers,
    updateUser,
    deleteUser,
    deleteAppointment,
    getAllAppointments,
    updateAppointmentStatus,
} from "../controllers/adminController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/users", getAllUsers);
router.get("/appointments", getAllAppointments);

router.put("/users/:id", updateUser);

router.patch("/appointments/:id/status", updateAppointmentStatus);


router.delete("/users/:id", deleteUser);
router.delete("/appointments/:id", deleteAppointment);

export default router;
