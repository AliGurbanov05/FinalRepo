import express from 'express';
import { sendReceiptEmail } from '../controllers/emailController.js';

const router = express.Router();
router.post('/send-receipt', sendReceiptEmail);

export default router;
