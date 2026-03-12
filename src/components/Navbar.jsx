import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 dark:bg-slate-950 border-b border-slate-800/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/projects" className="flex items-center gap-3">
          <img src="/logo.svg" alt="ConTrack" className="w-9 h-9 rounded-lg" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-bold text-lg tracking-tight">ConTrack</span>
            <span className="text-orange-400 font-bold text-sm tracking-wide">DPR</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {user && (
            <div className="hidden sm:flex items-center gap-2 mr-1">
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                <span className="text-xs font-bold text-orange-400 uppercase">
                  {user.email.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-slate-400">{user.email}</span>
            </div>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center w-9 h-9 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
