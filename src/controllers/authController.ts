
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET no definido en las variables de entorno');

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { nombre, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: { nombre, email, password: hashed }
    });
    res.status(201).json({ id: user.id, nombre: user.nombre, email: user.email });
  } catch (e) {
    next(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      id: user.id, 
      nombre: user.nombre, 
      email: user.email, 
      token 
    });
  } catch (e) {
    next(e);
  }
};
