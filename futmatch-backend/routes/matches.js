// routes/matches.js
const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Tüm maç sonuçlarını listele
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Maç sonuçları alınırken hata oluştu.' });
  }
});

// Yeni maç sonucu ekleme (admin yetkisi eklenebilir)
router.post('/', async (req, res) => {
  const { homeTeam, awayTeam, homeScore, awayScore, date } = req.body;
  try {
    const match = new Match({ homeTeam, awayTeam, homeScore, awayScore, date });
    await match.save();
    res.json({ message: 'Maç sonucu başarıyla eklendi.', match });
  } catch (err) {
    res.status(500).json({ error: 'Maç sonucu eklenirken hata oluştu.' });
  }
});

module.exports = router;
