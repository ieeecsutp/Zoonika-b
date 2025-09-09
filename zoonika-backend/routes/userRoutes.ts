import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener un usuario por ID (sin password)
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: { id: true, nombre: true, email: true } // Excluir password
    });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
