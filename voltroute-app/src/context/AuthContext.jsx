import { createContext, useContext, useState, useEffect } from 'react';
import { auth, IS_DEMO_MODE } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const DEMO_USER = { uid: 'demo_uid_001', email: 'demo@voltroute.io', displayName: 'Demo User' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      const saved = sessionStorage.getItem('vr_demo_user');
      if (saved) setUser(JSON.parse(saved));
      setLoading(false);
      return;
    }
    if (!auth) { setLoading(false); return; }
    return onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
  }, []);

  const login = async (email, password) => {
    if (IS_DEMO_MODE) { const u = { ...DEMO_USER, email }; sessionStorage.setItem('vr_demo_user', JSON.stringify(u)); setUser(u); return u; }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password, name) => {
    if (IS_DEMO_MODE) { const u = { ...DEMO_USER, email, displayName: name }; sessionStorage.setItem('vr_demo_user', JSON.stringify(u)); setUser(u); return u; }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  const loginWithGoogle = async () => {
    if (IS_DEMO_MODE) {
      const u = { ...DEMO_USER, displayName: 'Google User', email: 'google@voltroute.io' };
      sessionStorage.setItem('vr_demo_user', JSON.stringify(u));
      setUser(u);
      return u;
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  };

  const logout = async () => {
    if (IS_DEMO_MODE) { sessionStorage.removeItem('vr_demo_user'); setUser(null); return; }
    return signOut(auth);
  };

  const resetPassword = async (email) => {
    if (IS_DEMO_MODE) return;
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, resetPassword, loginWithGoogle, IS_DEMO_MODE }}>
      {children}
    </AuthContext.Provider>
  );
}
