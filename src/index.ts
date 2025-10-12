import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes';
import galleryRoutes from './routes/galleryRoutes';
import userRoutes from './routes/userRoutes';
import specialistRoutes from './routes/specialistRoutes';
import commentRoutes from './routes/commentRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/galerias', galleryRoutes);

app.use('/usuarios', userRoutes);

app.use('/especialistas', specialistRoutes);

app.use('/comentarios', commentRoutes);

app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || '4000', 10);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  });
}

export default app;