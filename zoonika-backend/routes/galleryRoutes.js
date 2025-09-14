const express = require('express');
const prisma = require('../prisma');

const router = express.Router();

// Obtener todas las galerías con especialista
router.get('/', async (req, res) => {
  const galerias = await prisma.galeria.findMany({
    include: { especialista: true }
  });
  res.json(galerias);
});

// Obtener detalle de una galería (mejorado con datos de usuario en comentarios)
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const galeria = await prisma.galeria.findUnique({
      where: { id },
      include: {
        especialista: true,
        comentarios: {
          include: {
            usuario: {
              select: { id: true, nombre: true, email: true } // Excluir password
            }
          }
        }
      }
    });
    if (!galeria) return res.status(404).json({ error: 'No encontrada' });
    res.json(galeria);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
