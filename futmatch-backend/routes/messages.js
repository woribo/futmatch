// routes/messages.js
const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

// Yeni mesaj gönderme / Konuşma başlatma
router.post('/', async (req, res) => {
  const { participants, sender, content } = req.body;
  try {
    // Eğer katılımcıları içeren bir konuşma varsa onu bul, yoksa yeni oluştur
    let conversation = await Conversation.findOne({ participants: { $all: participants } });
    if (!conversation) {
      conversation = new Conversation({ participants, messages: [] });
    }
    conversation.messages.push({ sender, content });
    await conversation.save();
    res.json({ message: 'Mesaj gönderildi.', conversation });
  } catch (err) {
    res.status(500).json({ error: 'Mesaj gönderilirken hata oluştu.' });
  }
});

// Belirli bir konuşmayı getirme
router.get('/:conversationId', async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId)
      .populate('participants', 'username email')
      .populate('messages.sender', 'username email');
    if (!conversation)
      return res.status(404).json({ error: 'Konuşma bulunamadı.' });
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: 'Konuşma getirilirken hata oluştu.' });
  }
});

module.exports = router;
