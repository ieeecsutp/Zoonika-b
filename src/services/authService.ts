
import { prisma } from '../db';
import bcrypt from 'bcryptjs';

export const registerUser = async (nombre: string, email: string, passwordPlain: string) => {
  const hashed = await bcrypt.hash(passwordPlain, 10);
  const user = await prisma.usuario.create({
    data: { nombre, email, password: hashed }
  });
  return { id: user.id, nombre: user.nombre, email: user.email };
};

export const findUserByEmail = async (email: string) => {
  return await prisma.usuario.findUnique({ where: { email } });
};

export const comparePassword = async (passwordPlain: string, passwordHashed: string) => {
  return await bcrypt.compare(passwordPlain, passwordHashed);
};

export const recordLogin = async (usuarioId: number) => {
  return await prisma.historialLogin.create({
    data: { usuarioId }
  });
};
