import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

type CellType = 'empty' | 'obstacle' | 'mirror-/' | 'mirror-\\' | 'start' | 'target' | 'laser';
type Direction = 'right' | 'left' | 'up' | 'down';

interface Cell {
  type: CellType;
  hasLaser: boolean;
}

export const P06MirrorGrid: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [mirrorsLeft, setMirrorsLeft] = useState(6);
  const [selectedMirror, setSelectedMirror] = useState<'/' | '\\' | null>(null);
  const [success, setSuccess] = useState(false);

  const OBSTACLES = [[2, 1], [4, 3], [5, 5], [6, 2]];
  const START = [0, 0];
  const TARGET = [7, 7];

  useEffect(() => {
    initGrid();
  }, []);

  const initGrid = () => {
    const newGrid: Cell[][] = Array(8).fill(null).map(() =>
      Array(8).fill(null).map(() => ({ type: 'empty' as CellType, hasLaser: false }))
    );

    // Set obstacles
    OBSTACLES.forEach(([r, c]) => {
      newGrid[r][c].type = 'obstacle';
    });

    // Set start and target
    newGrid[START[0]][START[1]].type = 'start';
    newGrid[TARGET[0]][TARGET[1]].type = 'target';

    setGrid(newGrid);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!selectedMirror) return;
    if (grid[row][col].type !== 'empty') return;
    if (mirrorsLeft === 0) return;

    const newGrid = [...grid.map(r => [...r])];
    newGrid[row][col].type = `mirror-${selectedMirror}` as CellType;
    setGrid(newGrid);
    setMirrorsLeft(mirrorsLeft - 1);
    setSelectedMirror(null);
  };

  const removeMirror = (row: number, col: number) => {
    if (!grid[row][col].type.startsWith('mirror')) return;

    const newGrid = [...grid.map(r => [...r])];
    newGrid[row][col].type = 'empty';
    setGrid(newGrid);
    setMirrorsLeft(mirrorsLeft + 1);
  };

  const simulateLaser = () => {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell, hasLaser: false })));

    let [row, col] = START;
    let direction: Direction = 'right';
    let steps = 0;
    const MAX_STEPS = 100;

    while (steps < MAX_STEPS) {
      newGrid[row][col].hasLaser = true;

      // Check if reached target
      if (row === TARGET[0] && col === TARGET[1]) {
        setGrid(newGrid);
        setSuccess(true);
        setTimeout(() => {
          solvePuzzle('P06');
          navigate('/dashboard');
        }, 3000);
        return;
      }

      // Move in current direction
      let nextRow = row;
      let nextCol = col;

      switch (direction) {
        case 'right': nextCol++; break;
        case 'left': nextCol--; break;
        case 'up': nextRow--; break;
        case 'down': nextRow++; break;
      }

      // Check bounds
      if (nextRow < 0 || nextRow >= 8 || nextCol < 0 || nextCol >= 8) {
        break; // Laser goes out of bounds
      }

      const nextCell = newGrid[nextRow][nextCol];

      // Check obstacle
      if (nextCell.type === 'obstacle') {
        break; // Laser blocked
      }

      // Check mirrors and reflect
      if (nextCell.type === 'mirror-/') {
        if (direction === 'right') direction = 'up';
        else if (direction === 'left') direction = 'down';
        else if (direction === 'up') direction = 'right';
        else if (direction === 'down') direction = 'left';
      } else if (nextCell.type === 'mirror-\\') {
        if (direction === 'right') direction = 'down';
        else if (direction === 'left') direction = 'up';
        else if (direction === 'up') direction = 'left';
        else if (direction === 'down') direction = 'right';
      }

      row = nextRow;
      col = nextCol;
      steps++;
    }

    setGrid(newGrid);
  };

  const getCellSymbol = (cell: Cell) => {
    if (cell.type === 'start') return '🔴';
    if (cell.type === 'target') return '🎯';
    if (cell.type === 'obstacle') return '⬛';
    if (cell.type === 'mirror-/') return '/';
    if (cell.type === 'mirror-\\') return '\\';
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2">🪞</div>
        <h2 className="text-2xl font-bold">Stanza degli Specchi</h2>
        <p className="text-sm text-text-dim mt-2">
          Posiziona {mirrorsLeft} specchi per portare il laser 🔴 al target 🎯
        </p>
      </div>

      {/* Mirror selection */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setSelectedMirror('/')}
          className={`px-6 py-3 rounded-lg font-bold text-2xl ${
            selectedMirror === '/' ? 'bg-primary text-dark' : 'bg-dark-2 border border-gray-700'
          }`}
        >
          / Mirror
        </button>
        <button
          onClick={() => setSelectedMirror('\\')}
          className={`px-6 py-3 rounded-lg font-bold text-2xl ${
            selectedMirror === '\\' ? 'bg-primary text-dark' : 'bg-dark-2 border border-gray-700'
          }`}
        >
          \ Mirror
        </button>
      </div>

      <div className="text-center text-sm text-text-dim">
        Specchi rimanenti: <span className="text-primary font-bold">{mirrorsLeft}</span>
      </div>

      {/* Grid */}
      <div className="flex justify-center">
        <div className="inline-grid grid-cols-8 gap-1 bg-dark-2 p-4 rounded-lg">
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  removeMirror(r, c);
                }}
                className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded
                  ${cell.hasLaser ? 'bg-danger bg-opacity-40' : ''}
                  ${cell.type === 'obstacle' ? 'bg-gray-900' : ''}
                  ${cell.type === 'empty' ? 'bg-dark border border-gray-700 hover:bg-gray-800' : ''}
                  ${cell.type.startsWith('mirror') ? 'bg-secondary border border-primary' : ''}
                  ${cell.type === 'start' || cell.type === 'target' ? 'bg-dark-2' : ''}
                `}
              >
                {getCellSymbol(cell)}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button onClick={simulateLaser} className="btn-primary px-8 py-3">
          🔦 Attiva Laser
        </button>
        <button onClick={initGrid} className="btn-secondary px-8 py-3">
          🔄 Reset
        </button>
      </div>

      {success && (
        <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-center animate-pulse-glow">
          <span className="text-primary font-bold text-xl">✅ TARGET RAGGIUNTO! Laser riflesso correttamente!</span>
        </div>
      )}

      <div className="bg-dark-2 p-4 rounded-lg text-sm text-text-dim">
        <p className="font-bold mb-2">Istruzioni:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Seleziona un tipo di specchio (/ o \)</li>
          <li>Clicca su una cella vuota per posizionarlo</li>
          <li>Click destro su uno specchio per rimuoverlo</li>
          <li>⬛ = ostacoli (bloccano il laser)</li>
          <li>Gli specchi riflettono il raggio a 90°</li>
          <li>Premi "Attiva Laser" per testare il percorso</li>
        </ul>
      </div>
    </div>
  );
};
