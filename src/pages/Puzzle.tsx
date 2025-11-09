import { useParams, useNavigate } from 'react-router-dom';
import { getPuzzleById } from '../data/puzzles';
import { useGameStore } from '../store/gameStore';
import { Timer } from '../components/Timer';
import { HintButton } from '../components/HintButton';

// Puzzle Components (importeremo questi dopo averli creati)
import { P01CodeInput } from '../puzzles/P01_CodeInput';
import { P02QRScanner } from '../puzzles/P02_QRScanner';
import { P03TextInput } from '../puzzles/P03_TextInput';
import { P04Timeline } from '../puzzles/P04_Timeline';
import { P05AudioMixer } from '../puzzles/P05_AudioMixer';
import { P06MirrorGrid } from '../puzzles/P06_MirrorGrid';
import { P07Calculator } from '../puzzles/P07_Calculator';
import { P08SyncButtons } from '../puzzles/P08_SyncButtons';
import { P09PhotoGallery } from '../puzzles/P09_PhotoGallery';
import { P10FinalSequence } from '../puzzles/P10_FinalSequence';

export const Puzzle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { startTime, isPuzzleUnlocked, isPuzzleSolved } = useGameStore();

  const puzzle = getPuzzleById(id || '');

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card text-center">
          <h2 className="text-2xl font-bold mb-4">Puzzle non trovato</h2>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            ← Torna alla Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isUnlocked = isPuzzleUnlocked(puzzle.id, puzzle.dependencies);
  const isSolved = isPuzzleSolved(puzzle.id);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Puzzle Bloccato</h2>
          <p className="text-text-dim mb-6">
            Questo puzzle richiede che tu completi prima:{' '}
            {puzzle.dependencies.join(', ')}
          </p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            ← Torna alla Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getPuzzleComponent = () => {
    switch (puzzle.id) {
      case 'P01': return <P01CodeInput />;
      case 'P02': return <P02QRScanner />;
      case 'P03': return <P03TextInput />;
      case 'P04': return <P04Timeline />;
      case 'P05': return <P05AudioMixer />;
      case 'P06': return <P06MirrorGrid />;
      case 'P07': return <P07Calculator />;
      case 'P08': return <P08SyncButtons />;
      case 'P09': return <P09PhotoGallery />;
      case 'P10': return <P10FinalSequence />;
      default: return <div>Puzzle non implementato</div>;
    }
  };

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary hover:text-secondary transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Dashboard</span>
          </button>
          <Timer startTime={startTime} />
        </div>

        {/* Puzzle Info */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm text-text-dim mb-1">{puzzle.id} • Atto {puzzle.act}</div>
              <h1 className="text-3xl font-bold text-gradient">{puzzle.title}</h1>
            </div>
            {isSolved && (
              <span className="px-4 py-2 bg-primary text-dark font-bold rounded-lg">
                ✅ RISOLTO
              </span>
            )}
          </div>

          <p className="text-text-dim mb-4">{puzzle.description}</p>

          <div className="flex items-center gap-4 text-sm text-text-dim">
            <span className="flex items-center gap-1">
              📍 {puzzle.location}
            </span>
            <span className="flex items-center gap-1">
              ⏱️ ~{puzzle.timeEstimate} min
            </span>
          </div>
        </div>

        {/* Puzzle Component */}
        <div className="card">
          {getPuzzleComponent()}
        </div>

        {/* Hints */}
        {!isSolved && (
          <div className="card">
            <HintButton puzzleId={puzzle.id} hints={puzzle.hints} />
          </div>
        )}
      </div>
    </div>
  );
};
