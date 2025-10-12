
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';

export const getAllSpecialists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const especialistas = await prisma.especialista.findMany();
    res.json(especialistas);
  } catch (e) {
    next(e);
  }
};
