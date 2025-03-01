// models/Match.js
const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  homeTeam:  { type: String, required: true },
  awayTeam:  { type: String, required: true },
  homeScore: { type: Number, required: true },
  awayScore: { type: Number, required: true },
  date:      { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);
