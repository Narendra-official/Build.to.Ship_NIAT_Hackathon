import { Router } from 'express';
import { register, login, getMe, logout, updateProfile } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);
router.put('/me', authenticate, updateProfile);

export default router;
