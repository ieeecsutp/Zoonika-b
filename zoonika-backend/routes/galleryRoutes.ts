import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las galerías con especialista
router.get('/', async (req: Request, res: Response) => {
  const galerias = await prisma.galeria.findMany({
    include: { especialista: true }
  });
  res.json(galerias);
});

// Obtener detalle de una galería (mejorado con datos de usuario en comentarios)
router.get('/:id', async (req: Request, res: Response) => {
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
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
