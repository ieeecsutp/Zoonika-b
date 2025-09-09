import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/authRoutes';
import galleryRoutes from './routes/galleryRoutes';
import userRoutes from './routes/userRoutes';
import specialistRoutes from './routes/specialistRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/galerias', galleryRoutes);

app.use('/usuarios', userRoutes);

app.use('/especialistas', specialistRoutes);

app.use('/comentarios', commentRoutes);

const PORT: number = parseInt(process.env.PORT || '4000', 10);
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});