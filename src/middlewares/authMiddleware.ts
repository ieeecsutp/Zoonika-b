
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // ¡Debería estar en una variable de entorno!

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado: Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string; iat: number; exp: number };
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'No autorizado: Token inválido' });
  }
};
