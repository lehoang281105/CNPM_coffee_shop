import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/admin/Dashboard';
import AgentDetailPage from './pages/admin/AgentDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/agents/:id" element={<AgentDetailPage />} />
      {/* Catch-all route to redirect unknown URLs like /admin/bots to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
