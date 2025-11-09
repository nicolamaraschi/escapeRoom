import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { checkSolution } from '../utils/checkSolution';

export const P05AudioMixer: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (checkSolution('P05', answer)) {
      setSuccess(true);
      setTimeout(() => {
        solvePuzzle('P05');
        navigate('/dashboard');
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🎧</div>
        <h2 className="text-2xl font-bold mb-4">Eco del Passato</h2>
        <p className="text-text-dim">Versione semplificata: Inserisci la parola chiave "CAUSALITY"</p>
      </div>

      <div className="bg-dark-2 p-6 rounded-lg">
        <p className="text-sm text-text-dim mb-4">
          In una versione completa, qui ci sarebbero 3 tracce audio da mixare.
          Per questa demo, inserisci direttamente la parola chiave.
        </p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Parola chiave..."
          className="input w-full text-center text-2xl"
        />
        <button onClick={handleSubmit} className="btn-primary w-full mt-4">Conferma</button>
      </div>

      {error && <div className="bg-danger bg-opacity-20 border border-danger rounded-lg p-4 text-center text-danger font-bold">❌ Errato</div>}
      {success && <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-center text-primary font-bold">✅ Corretto!</div>}
    </div>
  );
};
