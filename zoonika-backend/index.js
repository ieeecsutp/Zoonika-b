
// Backend básico con Express y Prisma para Zoonika
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Registro de usuario
app.post('/auth/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: { nombre, email, password: hashed }
    });
    res.status(201).json({ id: user.id, nombre: user.nombre, email: user.email });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Login de usuario
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
  // No JWT, solo datos básicos para sesión en memoria frontend
  res.json({ id: user.id, nombre: user.nombre, email: user.email });
});

// Obtener todas las galerías con especialista
app.get('/galerias', async (req, res) => {
  const galerias = await prisma.galeria.findMany({
    include: { especialista: true }
  });
  res.json(galerias);
});

// Obtener detalle de una galería
app.get('/galerias/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const galeria = await prisma.galeria.findUnique({
    where: { id },
    include: { especialista: true, comentarios: true }
  });
  if (!galeria) return res.status(404).json({ error: 'No encontrada' });
  res.json(galeria);
});

// Obtener todos los especialistas
app.get('/especialistas', async (req, res) => {
  const especialistas = await prisma.especialista.findMany();
  res.json(especialistas);
});

// Crear un comentario (solo si no existe uno previo del usuario en esa galería)
app.post('/comentarios', async (req, res) => {
  const { comentario, valoracion, usuarioId, galeriaId } = req.body;
  try {
    // Solo un comentario por usuario por galería
    const existente = await prisma.comentario.findFirst({ where: { usuarioId, galeriaId } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un comentario para esta galería de este usuario.' });
    }
    const nuevo = await prisma.comentario.create({
      data: { comentario, valoracion, usuarioId, galeriaId }
    });
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Editar comentario propio
app.put('/comentarios/:id', async (req, res) => {
  const { id } = req.params;
  const { comentario, valoracion, usuarioId } = req.body;
  try {
    // Solo el autor puede editar
    const existente = await prisma.comentario.findUnique({ where: { id: parseInt(id) } });
    if (!existente || existente.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    const actualizado = await prisma.comentario.update({
      where: { id: parseInt(id) },
      data: { comentario, valoracion }
    });
    res.json(actualizado);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
