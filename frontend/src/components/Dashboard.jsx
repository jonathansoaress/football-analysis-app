import MatchCard from './MatchCard';

function Dashboard({ matches }) {
  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700">
        <p className="text-slate-400">Nenhum jogo agendado para os próximos dias.</p>
      </div>
    );
  }

  // Pegamos apenas os primeiros 6 jogos para destaque no Dashboard
  const featuredMatches = matches.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-8 bg-emerald-500 rounded-full inline-block"></span>
          Próximos Jogos em Destaque
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredMatches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
