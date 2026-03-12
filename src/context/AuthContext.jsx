import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_EMAIL = 'test@test.com';
const MOCK_PASSWORD = '123456';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('contrack_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, password) => {
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const userData = { email };
      setUser(userData);
      sessionStorage.setItem('contrack_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('contrack_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
