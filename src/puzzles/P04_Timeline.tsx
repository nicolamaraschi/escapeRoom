import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useGameStore } from '../store/gameStore';
import type { Event } from '../types';

export const P04Timeline: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [orderedEvents, setOrderedEvents] = useState<Event[]>([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validEvents: Event[] = [
    { id: '1', date: '1945-07-16', location: 'Alamogordo, NM' },
    { id: '2', date: '1952-11-01', location: 'Atollo Marshall' },
    { id: '3', date: '1957-10-04', location: 'Baikonur' },
    { id: '4', date: '1962-10-16', location: 'Cuba' },
    { id: '5', date: '1967-03-15', location: 'Oceano Pacifico' }
  ];

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader-timeline',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          const event = validEvents.find(e => e.date === decodedText);
          if (event && !events.find(e => e.id === event.id)) {
            setEvents([...events, event]);
            setOrderedEvents([...orderedEvents, event]);
          }
          scanner.clear();
          setScanning(false);
        },
        () => {}
      );

      return () => {
        scanner.clear().catch(console.error);
      };
    }
  }, [scanning, events]);

  const handleCheckOrder = () => {
    const sortedEvents = [...orderedEvents].sort((a, b) => a.date.localeCompare(b.date));
    const isCorrect = orderedEvents.every((e, i) => e.id === sortedEvents[i].id);

    if (isCorrect) {
      setSuccess(true);
      setTimeout(() => {
        solvePuzzle('P04');
        navigate('/dashboard');
      }, 2000);
    } else {
      setError('Ordine cronologico errato!');
      setTimeout(() => setError(''), 2000);
    }
  };

  const moveEvent = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...orderedEvents];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newOrder.length) {
      [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
      setOrderedEvents(newOrder);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="text-2xl font-bold mb-4">Coordinate Temporali</h2>
        <p className="text-text-dim max-w-2xl mx-auto">
          Sulla mappa del mondo ci sono 5 località marcate. Scansiona i QR code e ordina gli eventi cronologicamente.
        </p>
      </div>

      <div className="bg-dark-2 p-4 rounded-lg">
        <span className="font-bold">Eventi scansionati: {events.length}/5</span>
      </div>

      {!scanning && events.length < 5 && (
        <button onClick={() => setScanning(true)} className="btn-primary w-full">
          📷 Scansiona QR Code
        </button>
      )}

      {scanning && (
        <div>
          <div id="qr-reader-timeline"></div>
          <button onClick={() => setScanning(false)} className="btn-danger w-full mt-4">
            Annulla
          </button>
        </div>
      )}

      {events.length === 5 && !success && (
        <div className="space-y-4">
          <h3 className="font-bold text-center">Ordina cronologicamente:</h3>
          {orderedEvents.map((event, i) => (
            <div key={event.id} className="flex items-center gap-2 bg-dark-2 p-3 rounded-lg">
              <span className="w-8">{i + 1}.</span>
              <div className="flex-1">
                <div className="font-bold">{event.date}</div>
                <div className="text-sm text-text-dim">{event.location}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => moveEvent(i, 'up')} disabled={i === 0} className="px-3 py-1 bg-secondary rounded disabled:opacity-30">↑</button>
                <button onClick={() => moveEvent(i, 'down')} disabled={i === orderedEvents.length - 1} className="px-3 py-1 bg-secondary rounded disabled:opacity-30">↓</button>
              </div>
            </div>
          ))}
          <button onClick={handleCheckOrder} className="btn-primary w-full">Conferma Ordine</button>
        </div>
      )}

      {error && <div className="bg-danger bg-opacity-20 border border-danger rounded-lg p-4 text-center text-danger font-bold">❌ {error}</div>}
      {success && <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-center text-primary font-bold">✅ Timeline ricostruita!</div>}
    </div>
  );
};
