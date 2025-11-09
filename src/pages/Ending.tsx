import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { STORY } from '../data/story';

export const Ending: React.FC = () => {
  const navigate = useNavigate();
  const {
    playerName,
    startTime,
    endTime,
    solvedPuzzles,
    calculateScore,
    resetGame
  } = useGameStore();

  const success = solvedPuzzles.length === 10;
  const finalScore = calculateScore();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const getTimeBonus = () => {
    if (!startTime || !endTime) return 0;
    const elapsed = (endTime - startTime) / 60000; // minuti
    return Math.max(0, Math.floor((120 - elapsed) * 5));
  };

  const handleRestart = () => {
    if (window.confirm('Vuoi davvero ricominciare? Tutti i progressi saranno persi.')) {
      resetGame();
      navigate('/');
    }
  };

  const story = success ? STORY.ending.success : STORY.ending.failure;
  const timeBonus = getTimeBonus();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6">
        {/* Header */}
        <div className="card text-center">
          <div className={`text-6xl mb-4 ${success ? 'animate-pulse-glow' : ''}`}>
            {success ? '🎉' : '⚠️'}
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${success ? 'text-gradient' : 'text-danger'}`}>
            {story.title}
          </h1>
          <p className="text-text-dim">Agente: {playerName}</p>
        </div>

        {/* Story */}
        <div className="card">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-line text-text-main leading-relaxed">
              {story.content}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-center">Statistiche Missione</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-dark rounded-lg">
              <div className="text-3xl font-bold text-primary">{solvedPuzzles.length}/10</div>
              <div className="text-sm text-text-dim mt-1">Puzzle Risolti</div>
            </div>

            <div className="text-center p-4 bg-dark rounded-lg">
              <div className="text-3xl font-bold text-secondary">
                {startTime && endTime ? formatTime(endTime - startTime) : 'N/A'}
              </div>
              <div className="text-sm text-text-dim mt-1">Tempo Impiegato</div>
            </div>

            {success && (
              <>
                <div className="text-center p-4 bg-dark rounded-lg">
                  <div className="text-3xl font-bold text-primary">+{timeBonus}</div>
                  <div className="text-sm text-text-dim mt-1">Bonus Tempo</div>
                </div>

                <div className="text-center p-4 bg-dark rounded-lg">
                  <div className="text-3xl font-bold text-gradient">{finalScore}</div>
                  <div className="text-sm text-text-dim mt-1">Punteggio Finale</div>
                </div>
              </>
            )}
          </div>

          {success && (
            <div className="mt-6 p-4 bg-primary bg-opacity-10 border border-primary rounded-lg">
              <div className="text-center">
                <div className="text-sm text-text-dim mb-1">Rank Agente</div>
                <div className="text-2xl font-bold text-primary">
                  {finalScore >= 1500 ? '⭐⭐⭐ LEGGENDARIO' :
                   finalScore >= 1200 ? '⭐⭐ ECCELLENTE' :
                   finalScore >= 900 ? '⭐ ESPERTO' : 'COMPETENTE'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleRestart}
            className="btn-secondary flex-1"
          >
            🔄 Gioca Ancora
          </button>
          {success && (
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Cronache dell\'Osservatorio Temporale',
                    text: `Ho completato l'Escape Room con un punteggio di ${finalScore}! 🎉`,
                  });
                }
              }}
              className="btn-primary flex-1"
            >
              📱 Condividi
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-text-dim">
          <p>Grazie per aver giocato a Cronache dell'Osservatorio Temporale</p>
          <p className="mt-1">Progetto Cronos • Versione DIY</p>
        </div>
      </div>
    </div>
  );
};
