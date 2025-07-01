const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las materias (tablas existentes)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT tablename FROM pg_tables WHERE schemaname = 'public'`
    );
    const nombres = result.rows.map(r => r.tablename);
    res.json(nombres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva materia (crear tabla con nombre dado)
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS "${name}" (
        id SERIAL PRIMARY KEY,
        name TEXT,
        difficulty TEXT,
        statement TEXT,
        options JSONB
      )
    `);
    res.json({ message: 'Tabla creada con éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
