
import { Router } from 'express';
import { getAllSpecialists } from '../controllers/specialistController';

const router = Router();

// Obtener todos los especialistas
router.get('/', getAllSpecialists);

export default router;

