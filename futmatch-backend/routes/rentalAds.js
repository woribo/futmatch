// routes/rentalAds.js
const express = require('express');
const router = express.Router();
const RentalAd = require('../models/RentalAd');

// Tüm kiralık oyuncu ilanlarını listele
router.get('/', async (req, res) => {
  try {
    const ads = await RentalAd.find().populate('player', 'username email');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: 'İlanlar alınırken hata oluştu.' });
  }
});

// Yeni kiralık oyuncu ilanı oluşturma
router.post('/', async (req, res) => {
  const { player, title, description, price } = req.body;
  try {
    const newAd = new RentalAd({ player, title, description, price });
    await newAd.save();
    res.json({ message: 'İlan başarıyla oluşturuldu.', ad: newAd });
  } catch (err) {
    res.status(500).json({ error: 'İlan oluşturulurken hata oluştu.' });
  }
});

// (Opsiyonel) İlan güncelleme ve silme endpoint'leri ekleyebilirsiniz.

module.exports = router;
