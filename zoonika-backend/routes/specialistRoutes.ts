import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los especialistas
router.get('/', async (req: Request, res: Response) => {
  const especialistas = await prisma.especialista.findMany();
  res.json(especialistas);
});

export default router;
