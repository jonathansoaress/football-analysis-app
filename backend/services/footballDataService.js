const axios = require('axios');

// Criar instância do Axios para a API football-data.org
const footballApi = axios.create({
  baseURL: 'http://api.football-data.org/v4',
  headers: {
    'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY
  }
});

// A Copa do Mundo de 2026 pode ter um ID específico na API, 
// o ID 2000 refere-se à Copa do Mundo (World Cup) genérica ou edições recentes.
const WORLD_CUP_ID = 2000;

class FootballDataService {
  /**
   * Busca os próximos jogos de uma competição específica (Copa do Mundo por padrão)
   */
  async getUpcomingMatches(competitionId = WORLD_CUP_ID) {
    try {
      // Retorna jogos agendados
      const response = await footballApi.get(`/competitions/${competitionId}/matches`, {
        params: { status: 'SCHEDULED' }
      });
      return response.data.matches;
    } catch (error) {
      console.error('Erro ao buscar próximos jogos:', error.response?.data || error.message);
      throw new Error('Falha ao obter dados da API de Futebol.');
    }
  }

  /**
   * Busca detalhes de uma partida específica
   */
  async getMatchDetails(matchId) {
    try {
      const response = await footballApi.get(`/matches/${matchId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar detalhes do jogo ${matchId}:`, error.response?.data || error.message);
      throw new Error('Falha ao obter detalhes da partida.');
    }
  }

  /**
   * Busca dados e histórico recente de uma seleção (time)
   */
  async getTeamData(teamId) {
    try {
      // Informações da equipe
      const teamResponse = await footballApi.get(`/teams/${teamId}`);
      
      // Últimos jogos da equipe para analisar momento/forma
      const matchesResponse = await footballApi.get(`/teams/${teamId}/matches`, {
        params: { status: 'FINISHED', limit: 5 }
      });

      return {
        info: teamResponse.data,
        recentMatches: matchesResponse.data.matches
      };
    } catch (error) {
      console.error(`Erro ao buscar dados do time ${teamId}:`, error.response?.data || error.message);
      throw new Error('Falha ao obter dados do time.');
    }
  }
}

module.exports = new FootballDataService();
