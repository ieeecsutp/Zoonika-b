
import { prisma } from '../db';

export const findCommentByUserAndGallery = async (usuarioId: number, galeriaId: number) => {
  return await prisma.comentario.findFirst({ where: { usuarioId, galeriaId } });
};

export const createNewComment = async (comentario: string, valoracion: number, usuarioId: number, galeriaId: number) => {
  return await prisma.comentario.create({
    data: { comentario, valoracion, usuarioId, galeriaId }
  });
};

export const findCommentById = async (id: number) => {
  return await prisma.comentario.findUnique({ where: { id } });
};

export const updateExistingComment = async (id: number, comentario: string, valoracion: number) => {
  return await prisma.comentario.update({
    where: { id },
    data: { comentario, valoracion }
  });
};

export const deleteExistingComment = async (id: number) => {
  return await prisma.comentario.delete({ where: { id } });
};
