const { GoogleGenAI } = require('@google/genai');

class GeminiService {
  constructor() {
    // Inicializa a SDK do Gemini com a chave de API do .env
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  /**
   * Gera uma análise profissional da partida usando o Gemini com ferramenta de busca.
   * @param {Object} matchData - Dados gerais da partida
   * @param {Object} homeTeamData - Dados e últimos jogos do time da casa
   * @param {Object} awayTeamData - Dados e últimos jogos do time visitante
   * @returns {Object} Análise estruturada
   */
  async generateMatchAnalysis(matchData, homeTeamData, awayTeamData) {
    const homeTeamName = matchData.homeTeam.name;
    const awayTeamName = matchData.awayTeam.name;
    const competition = matchData.competition.name;
    const date = new Date(matchData.utcDate).toLocaleDateString('pt-BR');

    const prompt = `
    Você é um analista de futebol profissional e especialista em prognósticos esportivos com foco na ${competition}.
    Preciso que você analise a próxima partida entre ${homeTeamName} x ${awayTeamName} que ocorrerá no dia ${date}.
    
    Aqui estão os dados recentes fornecidos pela API:
    
    TIME MANDANTE (${homeTeamName}):
    - Posição atual / Informações: ${JSON.stringify(homeTeamData.info)}
    - Últimos 5 jogos: ${homeTeamData.recentMatches.map(m => m.homeTeam.name + ' ' + m.score.fullTime.home + '-' + m.score.fullTime.away + ' ' + m.awayTeam.name).join(' | ')}
    
    TIME VISITANTE (${awayTeamName}):
    - Posição atual / Informações: ${JSON.stringify(awayTeamData.info)}
    - Últimos 5 jogos: ${awayTeamData.recentMatches.map(m => m.homeTeam.name + ' ' + m.score.fullTime.home + '-' + m.score.fullTime.away + ' ' + m.awayTeam.name).join(' | ')}
    
    TAREFA:
    Com base nesses dados e **usando a ferramenta de busca do Google para obter informações em tempo real**, pesquise notícias recentes sobre ambas as seleções, como:
    - Possíveis desfalques por lesão ou suspensão
    - Clima, ânimos no vestiário e pressão da mídia
    - Declarações de treinadores ou jogadores principais
    - Tendências táticas
    
    Formate sua resposta como um objeto JSON rigoroso contendo as seguintes chaves:
    1. "analysisHtml": Uma string contendo a análise detalhada em formato HTML (use tags como <h3>, <p>, <ul>, <li>, <strong>). Inclua subtítulos para: Momento das Seleções, Diferenças Técnicas, Necessidade de Resultado, Desfalques e Notícias Recentes, Estilo de Jogo e Ânimos.
    2. "mostProbableScore": Uma string prevendo o placar exato mais provável (ex: "2-1").
    3. "bettingTips": Um array de strings com as 3 dicas de mercado de apostas mais prováveis (ex: ["Ambas marcam: Sim", "Mais de 2.5 gols", "Vitória do Mandante"]).
    4. "confidenceLevel": Um número inteiro de 0 a 10 indicando o grau de confiança nessa previsão.
    5. "mainRisks": Uma string breve descrevendo os principais riscos dessa entrada/previsão.
    
    Atenção: A resposta deve ser EXCLUSIVAMENTE um objeto JSON válido, sem formatação markdown envolvendo blocos de código (ex: sem \`\`\`json no início).
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          temperature: 0.7,
        }
      });

      const responseText = response.text;
      
      // Parse do JSON retornado pelo Gemini
      const analysisObj = JSON.parse(responseText);
      
      return analysisObj;

    } catch (error) {
      console.error('Erro ao gerar análise com Gemini:', error);
      throw new Error('Falha ao gerar análise profissional.');
    }
  }
}

module.exports = new GeminiService();
