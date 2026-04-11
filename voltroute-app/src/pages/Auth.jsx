import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GOOGLE_LOGO = 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, resetPassword, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      if (mode === 'login') await login(email, password);
      else if (mode === 'signup') await signup(email, password, name);
      else { await resetPassword(email); setError('Password reset email sent!'); setLoading(false); return; }
      navigate('/dashboard');
    } catch (err) { setError(err.message || 'Something went wrong'); }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError(''); setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) { setError(err.message || 'Google sign-in failed'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'linear-gradient(160deg,rgba(0,74,198,0.05),rgba(0,108,73,0.03),#faf8ff)'}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8 fade-in-up">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-2xl" style={{fontVariationSettings:"'FILL' 1"}}>bolt</span>
          </div>
          <h1 className="text-3xl font-extrabold font-headline tracking-tight">VoltRoute</h1>
          <p className="text-sm text-on-surface-variant mt-1">Smart EV Trip Planning</p>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl shadow-xl p-8 fade-in-up stagger-2">
          <div className="flex mb-6 bg-surface-container-low rounded-xl p-1">
            {['login','signup'].map(m => (
              <button key={m} onClick={() => {setMode(m);setError('')}} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode===m ? 'bg-white shadow-sm text-primary':'text-on-surface-variant'}`}>
                {m==='login'?'Sign In':'Sign Up'}
              </button>
            ))}
          </div>

          {/* Google Sign-In */}
          {mode !== 'reset' && (
            <>
              <button onClick={handleGoogle} disabled={loading}
                className="w-full py-3.5 px-6 bg-white border border-outline-variant/50 rounded-xl flex items-center justify-center gap-3 font-semibold text-on-surface hover:bg-surface-container-low transition-all active:scale-[0.98] disabled:opacity-50 shadow-sm">
                <img alt="Google" src={GOOGLE_LOGO} className="w-5 h-5" />
                Continue with Google
              </button>
              <div className="relative my-5 flex items-center">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="px-4 text-[10px] font-bold text-outline uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Full Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-outline-variant/50 focus:border-primary" placeholder="Your name" required />
              </div>
            )}
            {mode !== 'reset' && (
              <>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Email</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-outline-variant/50 focus:border-primary" placeholder="you@email.com" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Password</label>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-outline-variant/50 focus:border-primary" placeholder="••••••••" required />
                </div>
              </>
            )}
            {mode === 'reset' && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-outline-variant/50 focus:border-primary" placeholder="you@email.com" required />
              </div>
            )}

            {error && <p className={`text-xs font-bold px-3 py-2 rounded-lg ${error.includes('sent')?'bg-secondary/10 text-secondary':'bg-error/10 text-error'}`}>{error}</p>}

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              {mode==='login'?'Sign In':mode==='signup'?'Create Account':'Reset Password'}
            </button>
          </form>

          {mode === 'login' && (
            <button onClick={()=>{setMode('reset');setError('')}} className="w-full mt-3 text-xs font-bold text-primary hover:underline">Forgot password?</button>
          )}
          {mode === 'reset' && (
            <button onClick={()=>{setMode('login');setError('')}} className="w-full mt-3 text-xs font-bold text-primary hover:underline">← Back to Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}
