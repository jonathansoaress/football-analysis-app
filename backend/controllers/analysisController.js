const Analysis = require('../models/Analysis');
const footballDataService = require('../services/footballDataService');
const geminiService = require('../services/geminiService');

exports.getAnalysis = async (req, res) => {
  try {
    const { matchId } = req.params;

    // Verifica se já existe análise no banco para não gastar token à toa
    const existingAnalysis = await Analysis.findOne({ matchId });
    if (existingAnalysis) {
      return res.json(existingAnalysis);
    }

    res.status(404).json({ message: 'Análise não encontrada no banco. Gere uma nova.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar análise', error: error.message });
  }
};

exports.generateAnalysis = async (req, res) => {
  try {
    const { matchId } = req.body;

    if (!matchId) {
      return res.status(400).json({ message: 'O ID da partida é obrigatório' });
    }

    // 1. Verificar se já existe (evitar requisições duplicadas)
    let analysis = await Analysis.findOne({ matchId });
    if (analysis) {
      return res.json({ message: 'Análise já existe', data: analysis });
    }

    // 2. Buscar dados gerais do jogo
    const matchData = await footballDataService.getMatchDetails(matchId);
    
    // 3. Buscar dados de cada time
    const homeTeamId = matchData.homeTeam.id;
    const awayTeamId = matchData.awayTeam.id;

    const [homeTeamData, awayTeamData] = await Promise.all([
      footballDataService.getTeamData(homeTeamId),
      footballDataService.getTeamData(awayTeamId)
    ]);

    // 4. Gerar análise com o Gemini (com busca no Google)
    const geminiResult = await geminiService.generateMatchAnalysis(matchData, homeTeamData, awayTeamData);

    // 5. Salvar no MongoDB
    analysis = new Analysis({
      matchId,
      homeTeam: {
        id: homeTeamId,
        name: matchData.homeTeam.name
      },
      awayTeam: {
        id: awayTeamId,
        name: matchData.awayTeam.name
      },
      aiAnalysis: geminiResult.analysisHtml,
      mostProbableScore: geminiResult.mostProbableScore,
      confidenceLevel: geminiResult.confidenceLevel,
      bettingTips: geminiResult.bettingTips,
      mainRisks: geminiResult.mainRisks
    });

    await analysis.save();

    res.status(201).json({ message: 'Análise gerada com sucesso!', data: analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao gerar análise', error: error.message });
  }
};
