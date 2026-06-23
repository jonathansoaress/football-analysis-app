import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

function MatchCard({ match }) {
  const matchDate = new Date(match.utcDate);
  const formattedDate = matchDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  const formattedTime = matchDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="group bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] relative overflow-hidden">
      
      {/* Detalhes de Data/Hora */}
      <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-slate-400 mb-6 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-full">
          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
          <span>{formattedDate.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-emerald-500" />
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* Times */}
      <div className="flex justify-between items-center mb-8 relative">
        <div className="flex flex-col items-center gap-3 w-2/5">
          <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center border-2 border-slate-700 group-hover:border-emerald-500/30 transition-colors p-2">
             <img 
               src={match.homeTeam.crest || `https://crests.football-data.org/${match.homeTeam.id}.png`} 
               alt={match.homeTeam.name} 
               className="w-full h-full object-contain drop-shadow-md"
               onError={(e) => { e.target.style.display = 'none'; }}
             />
          </div>
          <span className="font-bold text-center text-sm md:text-base line-clamp-2">{match.homeTeam.shortName || match.homeTeam.name}</span>
        </div>

        <div className="text-xl font-black text-slate-600 absolute left-1/2 -translate-x-1/2">
          VS
        </div>

        <div className="flex flex-col items-center gap-3 w-2/5">
          <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center border-2 border-slate-700 group-hover:border-emerald-500/30 transition-colors p-2">
             <img 
               src={match.awayTeam.crest || `https://crests.football-data.org/${match.awayTeam.id}.png`} 
               alt={match.awayTeam.name} 
               className="w-full h-full object-contain drop-shadow-md"
               onError={(e) => { e.target.style.display = 'none'; }}
             />
          </div>
          <span className="font-bold text-center text-sm md:text-base line-clamp-2">{match.awayTeam.shortName || match.awayTeam.name}</span>
        </div>
      </div>

      {/* Botão de Ação */}
      <Link 
        to={`/analysis/${match.id}`}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/20"
      >
        <span>Gerar Análise IA</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

export default MatchCard;
