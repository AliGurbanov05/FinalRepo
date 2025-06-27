import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otpController.js';

const router = express.Router();

router.post('/send-otp', sendOTP);      // telefon nömrəsinə OTP göndər
router.post('/verify-otp', verifyOTP);  // OTP-ni təsdiqlə

export default router;
