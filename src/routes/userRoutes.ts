
import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Obtener todos los usuarios (protegido)
router.get('/', authMiddleware, getAllUsers);

// Obtener un usuario por ID (público)
router.get('/:id', getUserById);

// Actualizar un usuario (protegido, solo el propio usuario)
router.put('/:id', authMiddleware, updateUser);

// Eliminar un usuario (protegido, solo el propio usuario)
router.delete('/:id', authMiddleware, deleteUser);

export default router;

