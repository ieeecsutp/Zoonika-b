
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const { comentario, valoracion, galeriaId } = req.body;
  const usuarioId = req.user!.id;

  try {
    const existente = await prisma.comentario.findFirst({ where: { usuarioId, galeriaId } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un comentario para esta galería de este usuario.' });
    }
    const nuevo = await prisma.comentario.create({
      data: { comentario, valoracion, usuarioId, galeriaId }
    });
    res.status(201).json(nuevo);
  } catch (e) {
    next(e);
  }
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { comentario, valoracion } = req.body;
  const usuarioId = req.user!.id;

  try {
    const existente = await prisma.comentario.findUnique({ where: { id: parseInt(id) } });
    if (!existente || existente.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    const actualizado = await prisma.comentario.update({
      where: { id: parseInt(id) },
      data: { comentario, valoracion }
    });
    res.json(actualizado);
  } catch (e) {
    next(e);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const usuarioId = req.user!.id;

  try {
    const existente = await prisma.comentario.findUnique({ where: { id: parseInt(id) } });
    if (!existente || existente.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    await prisma.comentario.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
