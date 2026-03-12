import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const validationErrors = validateLogin(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const result = login(email, password);
    if (result.success) {
      navigate('/projects');
    } else {
      setAuthError(result.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 sm:px-6 overflow-hidden">
      {/* Background — same slate palette as the rest of the app */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(148,163,184,0.05)_0%,transparent_60%)]" />

      {/* Floating decorative orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-orange-500/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/logo.svg" alt="ConTrack" className="w-11 h-11 rounded-xl shadow-lg" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-bold text-xl tracking-tight">ConTrack</span>
            <span className="text-orange-400 font-bold text-sm tracking-wide">DPR</span>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/8 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/30">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-slate-400 text-sm mb-7">Enter your credentials to continue</p>

          {authError && (
            <div className="bg-red-500/15 backdrop-blur border border-red-400/20 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2.5">
              <span className="w-2 h-2 bg-red-400 rounded-full shrink-0" />
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                  placeholder="test@test.com"
                  className={`w-full rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                    errors.email
                      ? 'bg-red-500/10 border border-red-400/30'
                      : 'bg-white/5 border border-white/10 hover:border-white/20 focus:border-orange-500/60 focus:bg-white/8'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                  placeholder="Enter password"
                  className={`w-full rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                    errors.password
                      ? 'bg-red-500/10 border border-red-400/30'
                      : 'bg-white/5 border border-white/10 hover:border-white/20 focus:border-orange-500/60 focus:bg-white/8'
                  }`}
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-orange-600/25"
            >
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="mt-7 pt-5 border-t border-white/8">
            <p className="text-xs text-slate-500 text-center">
              Demo &mdash; <span className="font-mono text-slate-400">test@test.com</span> / <span className="font-mono text-slate-400">123456</span>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          &copy; 2026 ConTrack DPR &middot; Built with React + Tailwind
        </p>
      </div>
    </div>
  );
}
