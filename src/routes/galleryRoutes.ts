
import { Router } from 'express';
import { getAllGalleries, getGalleryById } from '../controllers/galleryController';

const router = Router();

// Obtener todas las galerías con especialista
router.get('/', getAllGalleries);

// Obtener detalle de una galería
router.get('/:id', getGalleryById);

export default router;

