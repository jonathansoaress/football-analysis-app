import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Analysis from './pages/Analysis';
import { Activity } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-emerald-500/30">
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-400">
              <Activity className="w-6 h-6" />
              <span>Copa<span className="text-white">Analytics</span></span>
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link to="/" className="text-slate-300 hover:text-emerald-400 transition-colors">Início</Link>
              <Link to="/matches" className="text-slate-300 hover:text-emerald-400 transition-colors">Jogos</Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/analysis/:id" element={<Analysis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
