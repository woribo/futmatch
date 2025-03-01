// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Nodemailer transporter ayarları (Gmail örneği)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',       // Kendi email adresinizi girin
    pass: 'your-email-password'           // Email şifrenizi veya app password kullanın
  }
});

// Kayıt olma ve e-posta doğrulama linki gönderme
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Aynı email ile kayıt varsa hata döndür
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Bu email adresi zaten kayıtlı.' });
    }
    
    // Şifreyi hash'leme
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Doğrulama tokeni oluşturma (rastgele bir dize)
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Yeni kullanıcı oluşturma
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken
    });
    await newUser.save();

    // Doğrulama linkini oluşturma (localhost örneği; domaininizi güncelleyin)
    const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`;

    // E-posta gönderimi
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Hesabınızı Doğrulayın',
      text: `Hesabınızı doğrulamak için lütfen şu linke tıklayın: ${verificationLink}`
    });

    res.status(200).json({ message: 'Kullanıcı başarıyla oluşturuldu. Lütfen emailinizi kontrol ederek hesabınızı doğrulayın.' });
  } catch (err) {
    console.error('Kayıt Hatası:', err);
    res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu.' });
  }
});

// E-posta doğrulama endpoint'i
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  try {
    // Verilen token ile kullanıcıyı bulma
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Geçersiz doğrulama tokeni.' });
    }

    // Kullanıcıyı doğrulanmış olarak işaretleme ve tokeni temizleme
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email doğrulama başarılı. Artık giriş yapabilirsiniz.' });
  } catch (err) {
    console.error('Doğrulama Hatası:', err);
    res.status(500).json({ error: 'Doğrulama sırasında bir hata oluştu.' });
  }
});

module.exports = router;
