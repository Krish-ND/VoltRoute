import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  // Landing page has its own nav; hide the shared navbar there
  if (pathname === '/') return null;

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/history', label: 'History' },
    { to: '/stations', label: 'Stations' },
    { to: '/settings', label: 'Settings' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-6 h-14 border-b border-outline-variant/30">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white text-sm" style={{fontVariationSettings:"'FILL' 1"}}>bolt</span>
          </div>
          <span className="text-lg font-extrabold tracking-tighter text-on-surface font-headline">VoltRoute</span>
        </Link>
        {user && (
          <nav className="hidden md:flex gap-5">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`text-sm font-semibold transition-colors ${pathname === l.to ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}>
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-xs font-bold text-on-surface-variant hidden sm:block">{user.displayName || user.email}</span>
            <button onClick={logout} className="px-3 py-1.5 text-xs font-bold text-error hover:bg-error/5 rounded-lg transition-colors">Logout</button>
          </>
        ) : (
          <Link to="/auth" className="px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-bold text-sm shadow-md hover:opacity-90 transition-all">
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
}
