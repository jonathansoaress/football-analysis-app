const footballDataService = require('../services/footballDataService');

exports.getUpcomingMatches = async (req, res) => {
  try {
    const matches = await footballDataService.getUpcomingMatches();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar próximos jogos', error: error.message });
  }
};

exports.getMatchDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await footballDataService.getMatchDetails(id);
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar detalhes da partida', error: error.message });
  }
};
