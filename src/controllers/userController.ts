
import { Request, Response, NextFunction } from 'express';
import { getAllUsersFromDb, getUserByIdFromDb, updateUserInDb, deleteUserFromDb } from '../services/userService';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersFromDb();
    res.json(users);
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const usuario = await getUserByIdFromDb(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  const usuarioId = req.user!.id;

  if (parseInt(id) !== usuarioId) {
    return res.status(403).json({ error: 'No autorizado para actualizar este usuario' });
  }

  try {
    const updatedUser = await updateUserInDb(usuarioId, nombre, email);
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const usuarioId = req.user!.id;

  if (parseInt(id) !== usuarioId) {
    return res.status(403).json({ error: 'No autorizado para eliminar este usuario' });
  }

  try {
    await deleteUserFromDb(usuarioId);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
