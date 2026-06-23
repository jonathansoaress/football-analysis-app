const footballDataService = require('../services/footballDataService');

exports.getTeamData = async (req, res) => {
  try {
    const { id } = req.params;
    const teamData = await footballDataService.getTeamData(id);
    res.json(teamData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados do time', error: error.message });
  }
};
