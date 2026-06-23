import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMatchDetails, generateAnalysis } from '../services/api';
import AnalysisPanel from '../components/AnalysisPanel';
import { Loader2, ArrowLeft, Bot, AlertTriangle } from 'lucide-react';

function Analysis() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const matchData = await getMatchDetails(id);
        setMatch(matchData);
        // Não buscamos a análise automaticamente para economizar tokens,
        // mas em um app real, poderíamos verificar se já existe no banco.
      } catch (err) {
        setError('Não foi possível carregar os detalhes da partida.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  const handleGenerateAnalysis = async () => {
    setGenerating(true);
    setError(null);
    try {
      const response = await generateAnalysis(id);
      setAnalysis(response.data || response); // Depende da resposta exata do backend
    } catch (err) {
      setError('Erro ao gerar análise. O limite de requisições da API do Gemini pode ter sido atingido.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-emerald-400">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-slate-400">Carregando detalhes da partida...</p>
      </div>
    );
  }

  if (!match) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Jogos</span>
      </Link>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 relative overflow-hidden">
        {/* Fundo decorativo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center flex-1">
            <img src={match.homeTeam.crest || `https://crests.football-data.org/${match.homeTeam.id}.png`} alt={match.homeTeam.name} className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-xl mb-4" onError={(e) => e.target.style.display='none'}/>
            <h2 className="text-2xl md:text-3xl font-black text-center">{match.homeTeam.name}</h2>
          </div>

          <div className="text-center shrink-0">
            <div className="text-sm font-bold text-emerald-400 tracking-widest mb-2">VS</div>
            <div className="text-slate-400 font-mono text-sm">
              {new Date(match.utcDate).toLocaleDateString('pt-BR')} <br />
              {new Date(match.utcDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div className="flex flex-col items-center flex-1">
            <img src={match.awayTeam.crest || `https://crests.football-data.org/${match.awayTeam.id}.png`} alt={match.awayTeam.name} className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-xl mb-4" onError={(e) => e.target.style.display='none'}/>
            <h2 className="text-2xl md:text-3xl font-black text-center">{match.awayTeam.name}</h2>
          </div>
        </div>
      </div>

      {!analysis && !generating && (
        <div className="text-center py-12">
          <button 
            onClick={handleGenerateAnalysis}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:scale-105"
          >
            <Bot className="w-6 h-6" />
            Gerar Análise Profissional com IA
          </button>
          <p className="text-slate-500 mt-4 text-sm max-w-md mx-auto">
            A IA irá pesquisar notícias recentes, desfalques, histórico e gerar um prognóstico detalhado com mercados de apostas.
          </p>
        </div>
      )}

      {generating && (
        <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-12 text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
            <Bot className="absolute inset-0 m-auto w-8 h-8 text-emerald-400 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-emerald-400 mb-2">A IA está analisando a partida...</h3>
          <p className="text-slate-400">Coletando dados, pesquisando notícias recentes e calculando tendências táticas.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-lg mb-1">Aviso do Sistema</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {analysis && <AnalysisPanel analysis={analysis} />}
    </div>
  );
}

export default Analysis;
