import { ShieldAlert, TrendingUp, CheckCircle, Crosshair } from 'lucide-react';

function AnalysisPanel({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Placar Provável e Confiança */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-900/50 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-slate-400 font-semibold mb-1 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-emerald-400" />
              Placar Mais Provável
            </h3>
            <p className="text-4xl font-black text-white">{analysis.mostProbableScore || 'N/A'}</p>
          </div>
          <div className="text-6xl opacity-20 font-black text-emerald-500">
            {analysis.mostProbableScore?.replace('-', 'x') || ''}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
          <h3 className="text-slate-400 font-semibold mb-2">Grau de Confiança IA</h3>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-white">{analysis.confidenceLevel || 0}</span>
            <span className="text-xl text-slate-500 font-bold mb-1">/10</span>
          </div>
          
          {/* Barra de Progresso */}
          <div className="w-full bg-slate-900 h-3 rounded-full mt-4 overflow-hidden">
            <div 
              className={`h-full rounded-full ${analysis.confidenceLevel > 7 ? 'bg-emerald-500' : analysis.confidenceLevel > 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${(analysis.confidenceLevel || 0) * 10}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Dicas de Apostas */}
      {analysis.bettingTips && analysis.bettingTips.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 lg:p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            Mercados Recomendados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysis.bettingTips.map((tip, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-700 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-200">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Análise Textual (HTML) */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 lg:p-8">
        <h3 className="text-xl font-bold mb-6">Análise Detalhada da IA</h3>
        <div 
          className="prose prose-invert prose-emerald max-w-none 
          prose-h3:text-lg prose-h3:font-bold prose-h3:text-emerald-400 prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
          prose-li:text-slate-300 prose-ul:list-disc prose-ul:pl-5
          prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: analysis.aiAnalysis || analysis.analysisHtml }}
        />
      </div>

      {/* Riscos */}
      {analysis.mainRisks && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 lg:p-8">
          <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6" />
            Principais Riscos da Entrada
          </h3>
          <p className="text-red-200/80 leading-relaxed">
            {analysis.mainRisks}
          </p>
        </div>
      )}

    </div>
  );
}

export default AnalysisPanel;
