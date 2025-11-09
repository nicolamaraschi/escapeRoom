import { useGameStore } from '../store/gameStore';
import type { Puzzle } from '../types';

interface PuzzleCardProps {
  puzzle: Puzzle;
  onClick?: () => void;
}

export const PuzzleCard: React.FC<PuzzleCardProps> = ({ puzzle, onClick }) => {
  const { isPuzzleUnlocked, isPuzzleSolved } = useGameStore();

  const isUnlocked = isPuzzleUnlocked(puzzle.id, puzzle.dependencies);
  const isSolved = isPuzzleSolved(puzzle.id);

  const getStatusIcon = () => {
    if (isSolved) return '✅';
    if (isUnlocked) return '🔓';
    return '🔒';
  };

  const getStatusText = () => {
    if (isSolved) return 'Completato';
    if (isUnlocked) return 'Disponibile';
    return 'Bloccato';
  };

  const cardClass = isSolved
    ? 'puzzle-card-solved'
    : isUnlocked
    ? 'puzzle-card'
    : 'puzzle-card-locked';

  return (
    <div
      className={`${cardClass} ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={() => isUnlocked && onClick && onClick()}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getStatusIcon()}</span>
          <div>
            <h3 className="font-bold text-lg">{puzzle.title}</h3>
            <span className="text-xs text-text-dim">{puzzle.id}</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            isSolved
              ? 'bg-primary text-dark'
              : isUnlocked
              ? 'bg-secondary text-white'
              : 'bg-gray-700 text-text-dim'
          }`}
        >
          {getStatusText()}
        </span>
      </div>

      <p className="text-sm text-text-dim mb-3 line-clamp-2">{puzzle.description}</p>

      <div className="flex items-center justify-between text-xs text-text-dim">
        <span className="flex items-center gap-1">
          📍 {puzzle.location}
        </span>
        <span className="flex items-center gap-1">
          ⏱️ ~{puzzle.timeEstimate} min
        </span>
      </div>

      {puzzle.dependencies.length > 0 && !isSolved && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <span className="text-xs text-text-dim">
            Richiede: {puzzle.dependencies.map(d => (
              <span key={d} className={`inline-block px-2 py-1 rounded ml-1 ${isPuzzleSolved(d) ? 'bg-primary text-dark' : 'bg-gray-700'}`}>
                {d}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};
