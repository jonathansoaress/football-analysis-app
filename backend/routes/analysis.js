const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Rota para buscar análise existente do banco
router.get('/:matchId', analysisController.getAnalysis);

// Rota para gerar uma nova análise
router.post('/generate', analysisController.generateAnalysis);

module.exports = router;
