const express = require('express');
const router = express.Router();
const db = require('../db');

// Guardar pregunta en una materia específica
router.post('/:subject', async (req, res) => {
  const { subject } = req.params;
  const { name, difficulty, statement, options } = req.body;

  try {
    await db.query(`
      INSERT INTO "${subject}" (name, difficulty, statement, options)
      VALUES ($1, $2, $3, $4)
    `, [name, difficulty, statement, JSON.stringify(options)]);

    res.json({ message: 'Pregunta guardada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
