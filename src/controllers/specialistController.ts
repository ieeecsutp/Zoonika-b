
import { Request, Response, NextFunction } from 'express';
import { getAllSpecialistsFromDb } from '../services/specialistService';

export const getAllSpecialists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const especialistas = await getAllSpecialistsFromDb();
    res.json(especialistas);
  } catch (e) {
    next(e);
  }
};
