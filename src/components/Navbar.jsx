import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HardHat, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-orange-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/projects" className="flex items-center gap-2 text-lg font-bold">
          <HardHat className="w-6 h-6" />
          ConTrack DPR
        </Link>
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-orange-700 hover:bg-orange-800 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
