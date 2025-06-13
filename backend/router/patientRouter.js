import express from 'express';
import { getPatientDashboard } from '../controllers/patientController.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', verifyToken, authorizeRoles('patient'), getPatientDashboard);


export default router;
