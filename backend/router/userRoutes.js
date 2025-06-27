import express from 'express';
import { getCurrentUser }  from '../controllers/userController.js';
import { protect, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/me',protect,verifyToken, getCurrentUser);

export default router;
