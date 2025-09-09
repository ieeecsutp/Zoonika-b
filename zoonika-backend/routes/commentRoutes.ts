import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Crear un comentario (solo si no existe uno previo del usuario en esa galería)
router.post('/', async (req: Request, res: Response) => {
  const { comentario, valoracion, usuarioId, galeriaId } = req.body;
  try {
    // Solo un comentario por usuario por galería
    const existente = await prisma.comentario.findFirst({ where: { usuarioId, galeriaId } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un comentario para esta galería de este usuario.' });
    }
    const nuevo = await prisma.comentario.create({
      data: { comentario, valoracion, usuarioId, galeriaId }
    });
    res.status(201).json(nuevo);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Editar comentario propio
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comentario, valoracion, usuarioId } = req.body;
  try {
    // Solo el autor puede editar
    const existente = await prisma.comentario.findUnique({ where: { id: parseInt(id) } });
    if (!existente || existente.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    const actualizado = await prisma.comentario.update({
      where: { id: parseInt(id) },
      data: { comentario, valoracion }
    });
    res.json(actualizado);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
