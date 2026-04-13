import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import FlashVolt from './components/FlashVolt/FlashVolt';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import History from './pages/History';
import Stations from './pages/Stations';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { useEffect } from 'react';
import ErrorBoundary from './components/Layout/ErrorBoundary';

export default function App() {
  useEffect(() => {
    if (localStorage.getItem('vr_theme_pref') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/stations" element={<ProtectedRoute><Stations /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
        <FlashVolt />
      </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
