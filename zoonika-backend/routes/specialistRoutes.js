const express = require('express');
const prisma = require('../prisma');

const router = express.Router();

// Obtener todos los especialistas
router.get('/', async (req, res) => {
  const especialistas = await prisma.especialista.findMany();
  res.json(especialistas);
});

module.exports = router;
