// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:           { type: String, required: true, unique: true },
  email:              { type: String, required: true, unique: true },
  password:           { type: String, required: true },
  isVerified:         { type: Boolean, default: false },
  verificationToken:  { type: String }  // E-posta doğrulama için token
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
