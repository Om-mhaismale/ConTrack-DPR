import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';
import { LogIn } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-3 rounded-full mb-3">
            <LogIn className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">ConTrack DPR</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your projects</p>
        </div>

        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
              placeholder="test@test.com"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none ${
                errors.email ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              placeholder="123456"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none ${
                errors.password ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Demo credentials: test@test.com / 123456
        </p>
      </div>
    </div>
  );
}
