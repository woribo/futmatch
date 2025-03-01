// models/RentalAd.js
const mongoose = require('mongoose');

const RentalAdSchema = new mongoose.Schema({
  player:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number }, // Fiyat veya ücret (opsiyonel)
  available:   { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('RentalAd', RentalAdSchema);
