
import { prisma } from '../db';

export const getGalleriesWithSpecialist = async () => {
  return await prisma.galeria.findMany({
    include: { especialista: true }
  });
};

export const getGalleryDetailById = async (id: number) => {
  return await prisma.galeria.findUnique({
    where: { id },
    include: {
      especialista: true,
      comentarios: {
        include: {
          usuario: {
            select: { id: true, nombre: true, email: true }
          }
        }
      }
    }
  });
};
