
import { Request, Response, NextFunction } from 'express';
import { getGalleriesWithSpecialist, getGalleryDetailById } from '../services/galleryService';

export const getAllGalleries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const galerias = await getGalleriesWithSpecialist();
    res.json(galerias);
  } catch (e) {
    next(e);
  }
};

export const getGalleryById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const galeria = await getGalleryDetailById(id);
    if (!galeria) return res.status(404).json({ error: 'No encontrada' });
    res.json(galeria);
  } catch (e) {
    next(e);
  }
};
