import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { checkSolution } from '../utils/checkSolution';

export const P07Calculator: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (checkSolution('P07', answer)) {
      setSuccess(true);
      setTimeout(() => {
        solvePuzzle('P07');
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
        <div className="text-6xl mb-4">🔢</div>
        <h2 className="text-2xl font-bold mb-4">Password Quantistica</h2>
        <p className="text-text-dim">Trova i biglietti con le costanti fisiche e calcola la password</p>
      </div>

      <div className="bg-dark-2 p-6 rounded-lg space-y-4">
        <div className="text-sm text-text-dim">
          <p>Costanti da trovare:</p>
          <ul className="list-disc list-inside mt-2">
            <li>C = 299792 (velocità luce)</li>
            <li>h = 662607 (Planck)</li>
            <li>Na = 602214 (Avogadro)</li>
            <li>G = 667430 (Gravitazionale)</li>
          </ul>
          <p className="mt-4">Password: 29960602</p>
        </div>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Password..."
          className="input w-full text-center font-mono"
        />
        <button onClick={handleSubmit} className="btn-primary w-full">Conferma</button>
      </div>

      {error && <div className="bg-danger bg-opacity-20 border border-danger rounded-lg p-4 text-center text-danger font-bold">❌ Errato</div>}
      {success && <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-center text-primary font-bold">✅ Password corretta!</div>}
    </div>
  );
};
