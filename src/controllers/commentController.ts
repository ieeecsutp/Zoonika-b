
import { Request, Response, NextFunction } from 'express';
import { findCommentByUserAndGallery, createNewComment, findCommentById, updateExistingComment, deleteExistingComment } from '../services/commentService';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const { comentario, valoracion, galeriaId } = req.body;
  const usuarioId = req.user!.id;

  try {
    const existente = await findCommentByUserAndGallery(usuarioId, galeriaId);
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un comentario para esta galería de este usuario.' });
    }
    const nuevo = await createNewComment(comentario, valoracion, usuarioId, galeriaId);
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
    const existente = await findCommentById(parseInt(id));
    if (!existente || existente.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    const actualizado = await updateExistingComment(parseInt(id), comentario, valoracion);
    res.json(actualizado);
  } catch (e) {
    next(e);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const usuarioId = req.user!.id;

  try {
    const existente = await findCommentById(parseInt(id));
    if (!existente || existente.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    await deleteExistingComment(parseInt(id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
