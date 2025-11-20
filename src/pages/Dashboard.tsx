import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { PUZZLES, getPuzzlesByAct } from '../data/puzzles';
import { PuzzleCard } from '../components/PuzzleCard';
import { Timer } from '../components/Timer';
import { STORY } from '../data/story';
import { SyncButton } from '../components/SyncButton';
import { useAutoSync } from '../hooks/useAutoSync';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    playerName,
    currentAct,
    solvedPuzzles,
    score,
    startTime,
    isPuzzleUnlocked,
    isSyncing,
    lastSyncTime,
    syncError
  } = useGameStore();

  // Abilita sincronizzazione automatica
  useAutoSync(true);

  const totalPuzzles = PUZZLES.length;
  const solvedCount = solvedPuzzles.length;
  const progress = Math.floor((solvedCount / totalPuzzles) * 100);

  const actPuzzles = getPuzzlesByAct(currentAct);
  const availablePuzzles = PUZZLES.filter(p =>
    isPuzzleUnlocked(p.id, p.dependencies) && !solvedPuzzles.includes(p.id)
  );

  const getActInfo = () => {
    return STORY.actIntros[currentAct];
  };

  const actInfo = getActInfo();

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                Osservatorio Temporale Omega
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-text-dim">Agente: {playerName}</p>
                {isSyncing && (
                  <span className="text-xs text-primary animate-pulse">🔄 Sync...</span>
                )}
                {!isSyncing && lastSyncTime && (
                  <span className="text-xs text-green-500">✓ Sincronizzato</span>
                )}
                {syncError && (
                  <span className="text-xs text-danger" title={syncError}>⚠️ Errore sync</span>
                )}
              </div>
            </div>
            <Timer startTime={startTime} critical={true} />
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progresso Missione</span>
              <span className="font-mono">{solvedCount}/{totalPuzzles} Puzzle</span>
            </div>
            <div className="w-full bg-dark h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-xs text-text-dim">Punteggio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">Atto {currentAct}</div>
              <div className="text-xs text-text-dim">di 3</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{availablePuzzles.length}</div>
              <div className="text-xs text-text-dim">Disponibili</div>
            </div>
          </div>
        </div>

        {/* Act Intro */}
        <div className="card bg-gradient-to-r from-dark-2 to-dark border-secondary">
          <h2 className="text-xl font-bold mb-3">{actInfo.title}</h2>
          <p className="text-text-dim text-sm leading-relaxed whitespace-pre-line">
            {actInfo.content}
          </p>
        </div>

        {/* Available Puzzles */}
        {availablePuzzles.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🎯</span>
              <span>Puzzle Disponibili</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePuzzles.map(puzzle => (
                <PuzzleCard
                  key={puzzle.id}
                  puzzle={puzzle}
                  onClick={() => navigate(`/puzzle/${puzzle.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Current Act Puzzles */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>Atto {currentAct}: Tutti i Puzzle</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actPuzzles.map(puzzle => (
              <PuzzleCard
                key={puzzle.id}
                puzzle={puzzle}
                onClick={() => navigate(`/puzzle/${puzzle.id}`)}
              />
            ))}
          </div>
        </div>

        {/* All Puzzles */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🗺️</span>
            <span>Mappa Completa</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PUZZLES.map(puzzle => (
              <PuzzleCard
                key={puzzle.id}
                puzzle={puzzle}
                onClick={() => navigate(`/puzzle/${puzzle.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pulsante di sincronizzazione */}
      <SyncButton />
    </div>
  );
};