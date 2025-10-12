
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';

export const getAllGalleries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const galerias = await prisma.galeria.findMany({
      include: { especialista: true }
    });
    res.json(galerias);
  } catch (e) {
    next(e);
  }
};

export const getGalleryById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const galeria = await prisma.galeria.findUnique({
      where: { id },
      include: {
        especialista: true,
        comentarios: {
          include: {
            usuario: {
              select: { id: true, nombre: true, email: true } // Excluir password
            }
          }
        }
      }
    });
    if (!galeria) return res.status(404).json({ error: 'No encontrada' });
    res.json(galeria);
  } catch (e) {
    next(e);
  }
};
