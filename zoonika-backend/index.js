const express = require('express');
// use shared prisma instance
const prisma = require('./prisma');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const userRoutes = require('./routes/userRoutes');
const specialistRoutes = require('./routes/specialistRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/galerias', galleryRoutes);
app.use('/usuarios', userRoutes);
app.use('/especialistas', specialistRoutes);
app.use('/comentarios', commentRoutes);

const PORT = parseInt(process.env.PORT || '4000', 10);
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
