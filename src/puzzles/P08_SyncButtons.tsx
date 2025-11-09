import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export const P08SyncButtons: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [solved, setSolved] = useState(false);

  const handleComplete = () => {
    setSolved(true);
    setTimeout(() => {
      solvePuzzle('P08');
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl mb-4">⚡</div>
      <h2 className="text-2xl font-bold mb-4">Sincronizzazione Multitemporale</h2>
      <p className="text-text-dim">Puzzle cooperativo - richiede 4 giocatori sincronizzati</p>
      <div className="bg-dark-2 p-8 rounded-lg">
        <p className="mb-4 text-text-dim">
          In una versione completa, ogni giocatore dovrebbe premere pulsanti specifici contemporaneamente.
          Per questa demo, clicca per completare.
        </p>
        <button onClick={handleComplete} className="btn-primary">Sincronizzazione Completa</button>
      </div>
      {solved && <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-primary font-bold">✅ Sincronizzazione riuscita!</div>}
    </div>
  );
};
