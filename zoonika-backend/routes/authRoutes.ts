import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = Router();
const prisma = new PrismaClient();

// Registro de usuario
router.post('/register', async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: { nombre, email, password: hashed }
    });
    res.status(201).json({ id: user.id, nombre: user.nombre, email: user.email });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Login de usuario
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
  // No JWT, solo datos básicos para sesión en memoria frontend
  res.json({ id: user.id, nombre: user.nombre, email: user.email });
});

export default router;
