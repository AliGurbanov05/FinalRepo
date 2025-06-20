import express from 'express';
import {
    getDoctorDashboard,
    updateDoctorProfile,
    getDoctorAppointments,
    completeAppointment,
    deleteDoctorAccount // Yeni import
} from '../controllers/doctorController.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', verifyToken, authorizeRoles('doctor'), getDoctorDashboard);
router.put('/profile', verifyToken, authorizeRoles('doctor'), updateDoctorProfile);
router.get('/appointments', verifyToken, authorizeRoles('doctor'), getDoctorAppointments);
router.put('/appointments/:id/complete', verifyToken, authorizeRoles('doctor'), completeAppointment);

// Yeni route hesab silmək üçün
router.delete('/delete-account', verifyToken, authorizeRoles('doctor'), deleteDoctorAccount);

export default router;
