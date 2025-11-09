import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { STORY } from '../data/story';

export const Briefing: React.FC = () => {
  const navigate = useNavigate();
  const { playerName } = useGameStore();

  const handleBegin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="card space-y-6">
          {/* Header */}
          <div className="text-center border-b border-gray-700 pb-6">
            <div className="text-red-500 text-sm font-mono mb-2">
              ⚠️ CLASSIFICAZIONE: TOP SECRET ⚠️
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              {STORY.briefing.title}
            </h1>
            <p className="text-text-dim">Agente: {playerName}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-line text-text-main leading-relaxed">
              {STORY.briefing.content}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-danger bg-opacity-10 border border-danger rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-danger mb-1">ATTENZIONE</h3>
                <p className="text-sm text-text-dim">
                  Una volta iniziata la missione, il timer partirà e non potrà essere
                  fermato. Assicurati di essere pronto prima di procedere.
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary flex-1"
            >
              ← Indietro
            </button>
            <button
              onClick={handleBegin}
              className="btn-primary flex-1 animate-pulse-glow"
            >
              Accetta Missione →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
