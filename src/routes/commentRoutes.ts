
import { Router } from 'express';
import { createComment, updateComment, deleteComment } from '../controllers/commentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Crear un comentario (protegido)
router.post('/', authMiddleware, createComment);

// Editar comentario propio (protegido)
router.put('/:id', authMiddleware, updateComment);

// Eliminar comentario propio (protegido)
router.delete('/:id', authMiddleware, deleteComment);

export default router;

