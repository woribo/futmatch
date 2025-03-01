// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes dosyalarını import edin
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/matches');
const messageRoutes = require('./routes/messages');
const rentalAdRoutes = require('./routes/rentalAds');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware ayarları
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı (yerel bağlantı örneği; gerçek projede ortam değişkenleri kullanın)
mongoose.connect('mongodb://localhost/futmatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB bağlantısı başarılı!'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Route'ları kullanma
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/rental-ads', rentalAdRoutes);

// Ana sayfa
app.get('/', (req, res) => {
  res.send('Futmatch Backend Çalışıyor!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
