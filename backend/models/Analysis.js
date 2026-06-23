const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    unique: true
  },
  homeTeam: {
    name: String,
    id: String
  },
  awayTeam: {
    name: String,
    id: String
  },
  aiAnalysis: {
    type: String, // Análise gerada pelo Gemini em formato HTML ou Markdown
    required: true
  },
  mostProbableScore: String,
  confidenceLevel: Number,
  bettingTips: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Expira em 24h automaticamente (opcional)
  }
});

module.exports = mongoose.model('Analysis', analysisSchema);
