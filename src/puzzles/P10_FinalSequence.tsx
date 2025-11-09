import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { checkSolution } from '../utils/checkSolution';

export const P10FinalSequence: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle, endGame } = useGameStore();
  const [phase, setPhase] = useState(1);
  const [inputs, setInputs] = useState({ alpha: '', beta: '', gamma: '' });
  const [error, setError] = useState('');

  const handlePhaseSubmit = (phaseNum: number) => {
    const inputKey = phaseNum === 1 ? 'alpha' : phaseNum === 2 ? 'beta' : 'gamma';
    const input = inputs[inputKey];

    if (checkSolution(`P0${phaseNum === 1 ? 5 : phaseNum === 2 ? 7 : 9}`, input)) {
      setError('');
      if (phaseNum === 3) {
        solvePuzzle('P10');
        endGame();
        setTimeout(() => navigate('/ending'), 1000);
      } else {
        setPhase(phaseNum + 1);
      }
    } else {
      setError('Codice errato per questa fase!');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-4 text-danger">Protocollo di Reset</h2>
        <p className="text-text-dim">Sequenza finale - Usa le soluzioni dei puzzle precedenti</p>
      </div>

      <div className="space-y-4">
        {/* Fase 1 */}
        <div className={`card ${phase > 1 ? 'border-primary' : 'border-gray-700'}`}>
          <h3 className="font-bold mb-2">FASE 1/3: Codice Alfa {phase > 1 && '✅'}</h3>
          <p className="text-sm text-text-dim mb-3">Parola dall'Eco del Passato (P05)</p>
          {phase === 1 ? (
            <>
              <input
                type="text"
                value={inputs.alpha}
                onChange={(e) => setInputs({ ...inputs, alpha: e.target.value.toUpperCase() })}
                placeholder="CAUSALITY"
                className="input w-full mb-2"
              />
              <button onClick={() => handlePhaseSubmit(1)} className="btn-primary w-full">Conferma Fase 1</button>
            </>
          ) : (
            <div className="text-primary font-mono">CAUSALITY ✓</div>
          )}
        </div>

        {/* Fase 2 */}
        {phase >= 2 && (
          <div className={`card ${phase > 2 ? 'border-primary' : 'border-gray-700'}`}>
            <h3 className="font-bold mb-2">FASE 2/3: Codice Beta {phase > 2 && '✅'}</h3>
            <p className="text-sm text-text-dim mb-3">Password Quantistica (P07)</p>
            {phase === 2 ? (
              <>
                <input
                  type="text"
                  value={inputs.beta}
                  onChange={(e) => setInputs({ ...inputs, beta: e.target.value })}
                  placeholder="29960602"
                  className="input w-full mb-2 font-mono"
                />
                <button onClick={() => handlePhaseSubmit(2)} className="btn-primary w-full">Conferma Fase 2</button>
              </>
            ) : (
              <div className="text-primary font-mono">29960602 ✓</div>
            )}
          </div>
        )}

        {/* Fase 3 */}
        {phase >= 3 && (
          <div className="card border-danger">
            <h3 className="font-bold mb-2">FASE 3/3: Codice Gamma</h3>
            <p className="text-sm text-text-dim mb-3">Archivio Olografico (P09)</p>
            <input
              type="text"
              value={inputs.gamma}
              onChange={(e) => setInputs({ ...inputs, gamma: e.target.value })}
              placeholder="472916"
              className="input w-full mb-2 font-mono"
            />
            <button onClick={() => handlePhaseSubmit(3)} className="btn-danger w-full animate-pulse-glow">
              🚨 ATTIVA RESET FINALE
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-danger bg-opacity-20 border border-danger rounded-lg p-4 text-center text-danger font-bold">
          ❌ {error}
        </div>
      )}
    </div>
  );
};
