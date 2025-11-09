import { useState } from 'react';

interface CodeInputProps {
  length: number;
  type?: 'numeric' | 'alpha' | 'alphanumeric';
  onComplete: (code: string) => void;
  placeholder?: string;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  length,
  type = 'numeric',
  onComplete,
  placeholder = 'Inserisci codice'
}) => {
  const [code, setCode] = useState('');

  const handleKeyPress = (key: string) => {
    if (key === 'BACK') {
      setCode(code.slice(0, -1));
      return;
    }

    if (key === 'CLEAR') {
      setCode('');
      return;
    }

    if (code.length < length) {
      const newCode = code + key;
      setCode(newCode);

      if (newCode.length === length) {
        onComplete(newCode);
      }
    }
  };

  const getKeyboard = () => {
    if (type === 'numeric') {
      return [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['CLEAR', '0', 'BACK']
      ];
    }

    if (type === 'alpha') {
      return [
        ['A', 'B', 'C', 'D', 'E'],
        ['F', 'G', 'H', 'I', 'J'],
        ['K', 'L', 'M', 'N', 'O'],
        ['P', 'Q', 'R', 'S', 'T'],
        ['U', 'V', 'W', 'X', 'Y'],
        ['Z', 'CLEAR', 'BACK']
      ];
    }

    // alphanumeric
    return [
      ['1', '2', '3', '4', '5'],
      ['6', '7', '8', '9', '0'],
      ['A', 'B', 'C', 'D', 'E'],
      ['F', 'G', 'H', 'I', 'J'],
      ['K', 'L', 'M', 'N', 'O'],
      ['P', 'Q', 'R', 'S', 'T'],
      ['U', 'V', 'W', 'X', 'Y'],
      ['Z', 'CLEAR', 'BACK']
    ];
  };

  const keyboard = getKeyboard();

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Display */}
      <div className="mb-6">
        <div className="text-xs text-text-dim mb-2">{placeholder}</div>
        <div className="flex gap-2 justify-center">
          {Array.from({ length }).map((_, i) => (
            <div
              key={i}
              className={`w-12 h-16 flex items-center justify-center text-2xl font-mono border-2 rounded-lg ${
                i < code.length
                  ? 'border-primary bg-dark-2 text-primary'
                  : 'border-gray-700 bg-dark text-text-dim'
              }`}
            >
              {code[i] || ''}
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard */}
      <div className="space-y-2">
        {keyboard.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all active:scale-95 ${
                  key === 'BACK' || key === 'CLEAR'
                    ? 'bg-danger text-white hover:bg-opacity-80'
                    : 'bg-secondary text-white hover:bg-primary hover:text-dark'
                } ${key.length > 1 ? 'text-xs' : 'text-lg'}`}
              >
                {key === 'BACK' ? '←' : key === 'CLEAR' ? '✕' : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
