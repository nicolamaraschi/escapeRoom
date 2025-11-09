import { useEffect, useState } from 'react';

interface TimerProps {
  startTime: number | null;
  format?: 'mm:ss' | 'hh:mm:ss';
  critical?: boolean;
  onTimeUp?: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  startTime,
  format = 'mm:ss',
  critical = false,
  onTimeUp
}) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - startTime;
      setElapsed(elapsedMs);

      // Check se sono passate 2 ore (120 minuti)
      if (elapsedMs >= 120 * 60 * 1000 && onTimeUp) {
        onTimeUp();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, onTimeUp]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (format === 'hh:mm:ss') {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const totalMinutes = Math.floor(totalSeconds / 60);
    return `${totalMinutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const remainingTime = 120 * 60 * 1000 - elapsed; // 2 ore - tempo trascorso
  const remainingMinutes = Math.floor(remainingTime / 60000);
  const isCritical = critical || remainingMinutes < 10;

  if (!startTime) {
    return (
      <div className="flex items-center gap-2 font-mono text-text-dim">
        <span className="text-2xl">⏱️</span>
        <span className="text-xl">00:00</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 font-mono ${isCritical ? 'text-danger' : 'text-primary'}`}>
      <span className="text-2xl">⏱️</span>
      <div className="flex flex-col">
        <span className="text-xl font-bold">{formatTime(elapsed)}</span>
        <span className="text-xs text-text-dim">
          {remainingMinutes > 0 ? `${remainingMinutes} min rimasti` : 'TEMPO SCADUTO'}
        </span>
      </div>
    </div>
  );
};
