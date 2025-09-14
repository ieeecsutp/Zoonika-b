const express = require('express');
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

const router = express.Router();
// shared prisma instance

// Registro de usuario
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
  // No JWT, solo datos básicos para sesión en memoria frontend
  res.json({ id: user.id, nombre: user.nombre, email: user.email });
});

module.exports = router;
