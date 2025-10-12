
import { prisma } from '../db';

export const getAllUsersFromDb = async () => {
  return await prisma.usuario.findMany({
    select: { id: true, nombre: true, email: true },
  });
};

export const getUserByIdFromDb = async (id: number) => {
  return await prisma.usuario.findUnique({
    where: { id },
    select: { id: true, nombre: true, email: true } // Excluir password
  });
};

export const updateUserInDb = async (id: number, nombre: string, email: string) => {
  return await prisma.usuario.update({
    where: { id },
    data: { nombre, email },
    select: { id: true, nombre: true, email: true },
  });
};

export const deleteUserFromDb = async (id: number) => {
  return await prisma.usuario.delete({ where: { id } });
};
