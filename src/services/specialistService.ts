
import { prisma } from '../db';

export const getAllSpecialistsFromDb = async () => {
  return await prisma.especialista.findMany();
};
