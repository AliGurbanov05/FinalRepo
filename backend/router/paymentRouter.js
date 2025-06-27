// backend/routes/paymentRoutes.js
import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post('/',verifyToken, createPaymentIntent);

export default router;
