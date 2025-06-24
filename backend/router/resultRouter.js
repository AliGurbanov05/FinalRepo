// routes/responseRoutes.js
import express from 'express';
import { createResponse, getResponseByAppointmentId } from '../controllers/resultController.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Həkim diaqnoz əlavə edir
router.post('/add/:id', verifyToken, authorizeRoles('doctor'), createResponse);
router.post('/:id', verifyToken, authorizeRoles('doctor'), createResponse);

// Xəstə diaqnozu görür
router.get('/:id', verifyToken, authorizeRoles('patient'), getResponseByAppointmentId);

export default router;
