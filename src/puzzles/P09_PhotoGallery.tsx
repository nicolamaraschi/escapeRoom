import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { checkSolution } from '../utils/checkSolution';

export const P09PhotoGallery: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (checkSolution('P09', answer)) {
      setSuccess(true);
      setTimeout(() => {
        solvePuzzle('P09');
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
        <div className="text-6xl mb-4">📸</div>
        <h2 className="text-2xl font-bold mb-4">Archivio Olografico</h2>
        <p className="text-text-dim">Trova le 10 foto. Le 6 con bordo dorato hanno numeri nascosti.</p>
      </div>

      <div className="bg-dark-2 p-6 rounded-lg">
        <p className="text-sm text-text-dim mb-4">
          Foto critiche (con bordo dorato): 2, 5, 7, 8, 9, 10<br />
          Numeri nascosti: 4-7-2-9-1-6<br />
          Codice finale: 472916
        </p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Codice (6 cifre)..."
          className="input w-full text-center font-mono text-2xl"
        />
        <button onClick={handleSubmit} className="btn-primary w-full mt-4">Conferma</button>
      </div>

      {error && <div className="bg-danger bg-opacity-20 border border-danger rounded-lg p-4 text-center text-danger font-bold">❌ Errato</div>}
      {success && <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-center text-primary font-bold">✅ Archivio decifrato!</div>}
    </div>
  );
};
