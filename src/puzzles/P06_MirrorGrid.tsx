import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export const P06MirrorGrid: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [solved, setSolved] = useState(false);

  const handleSolve = () => {
    setSolved(true);
    setTimeout(() => {
      solvePuzzle('P06');
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl mb-4">🪞</div>
      <h2 className="text-2xl font-bold mb-4">Stanza degli Specchi</h2>
      <p className="text-text-dim">Puzzle grid game - Versione semplificata</p>
      <div className="bg-dark-2 p-8 rounded-lg">
        <p className="mb-4">Questo sarebbe un gioco di riflessione laser con specchi.</p>
        <button onClick={handleSolve} className="btn-primary">Completa Puzzle</button>
      </div>
      {solved && <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-primary font-bold">✅ Laser riflesso correttamente!</div>}
    </div>
  );
};
