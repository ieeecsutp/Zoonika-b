const express = require('express');
const prisma = require('../prisma');

const router = express.Router();

// Obtener un usuario por ID (sin password)
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: { id: true, nombre: true, email: true } // Excluir password
    });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
