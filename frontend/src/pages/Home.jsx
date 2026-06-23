import { useState, useEffect } from 'react';
import { getUpcomingMatches } from '../services/api';
import Dashboard from '../components/Dashboard';
import { Loader2 } from 'lucide-react';

function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getUpcomingMatches();
        setMatches(data);
      } catch (err) {
        setError('Não foi possível carregar os próximos jogos. Verifique a conexão com o servidor.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-emerald-400">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-slate-400 animate-pulse">Carregando painel de jogos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-2">Ops! Algo deu errado</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-4">
          Análise Profissional da Copa do Mundo
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Utilizamos Inteligência Artificial para gerar prognósticos detalhados, analisando o momento das seleções, desfalques, táticas e ânimos.
        </p>
      </header>

      <Dashboard matches={matches} />
    </div>
  );
}

export default Home;
