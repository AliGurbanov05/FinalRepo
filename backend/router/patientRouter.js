import express from 'express';
import {
    getPatientDashboard,
    updatePatientProfile,
    deletePatientAccount,
    getPatientAppointmentsWithDiagnosis
} from '../controllers/patientController.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', verifyToken, authorizeRoles('patient'), getPatientDashboard);
router.put('/update-profile', verifyToken, updatePatientProfile);
router.delete('/delete-account', verifyToken, authorizeRoles('patient'), deletePatientAccount);

// Yeni endpoint xəstənin görüşləri və diaqnozları üçün
router.get('/appointments', verifyToken, authorizeRoles('patient'), getPatientAppointmentsWithDiagnosis);

export default router;
