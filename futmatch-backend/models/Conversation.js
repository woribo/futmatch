// models/Conversation.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content:   { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ConversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages:     [MessageSchema]
}, { timestamps: true });

module.exports = mongoose.model('Conversation', ConversationSchema);
