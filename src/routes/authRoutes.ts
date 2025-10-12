
import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// Registro de usuario
router.post('/register', register);

// Login de usuario
router.post('/login', login);

export default router;

