import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Start } from './pages/Start';
import { Briefing } from './pages/Briefing';
import { Dashboard } from './pages/Dashboard';
import { Puzzle } from './pages/Puzzle';
import { Ending } from './pages/Ending';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/briefing" element={<Briefing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/puzzle/:id" element={<Puzzle />} />
        <Route path="/ending" element={<Ending />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
