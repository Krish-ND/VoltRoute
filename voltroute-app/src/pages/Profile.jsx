import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Profile() {
  const { user, IS_DEMO_MODE } = useAuth();
  const [profile, setProfile] = useState({ displayName: '', city: '', state: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      setProfile(prev => ({ ...prev, displayName: user.displayName || '' }));
      if (IS_DEMO_MODE) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (err) {
        console.warn('Could not load profile:', err);
      }
      setLoading(false);
    }
    loadProfile();
  }, [user, IS_DEMO_MODE]);

  const showToast = (msg, type='info') => { setToast({msg,type}); setTimeout(()=>setToast(null), 3000); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (IS_DEMO_MODE) {
      showToast('Profile saved (Demo Mode)', 'success');
      return;
    }
    setSaving(true);
    try {
      await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to update profile.', 'error');
    }
    setSaving(false);
  };

  if (loading) return <div className="pt-24 flex justify-center"><div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>;

  return (
    <div className="pt-20 min-h-screen bg-surface-container-low px-6 pb-12">
      {toast && <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] ${toast.type==='error'?'bg-error':'bg-primary'} text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg fade-in-up`}>{toast.msg}</div>}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold font-headline tracking-tight mb-2">My Profile</h1>
        <p className="text-sm text-on-surface-variant mb-8">Manage your personal details and public profile.</p>

        <form onSubmit={handleSave} className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-outline-variant/30">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {(profile.displayName || user?.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-bold font-headline">{profile.displayName || 'VoltRoute User'}</p>
              <p className="text-sm text-on-surface-variant">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Display Name</label>
              <input value={profile.displayName} onChange={e=>setProfile({...profile, displayName: e.target.value})} className="w-full bg-white rounded-xl px-4 py-3 text-sm font-medium border border-outline-variant/50 focus:border-primary transition-colors" placeholder="e.g. Rahul Sharma" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Email Address</label>
              <input value={user?.email || ''} className="w-full bg-surface-container rounded-xl px-4 py-3 text-sm font-medium border border-outline-variant/30 text-on-surface-variant" disabled />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">City</label>
              <input value={profile.city} onChange={e=>setProfile({...profile, city: e.target.value})} className="w-full bg-white rounded-xl px-4 py-3 text-sm font-medium border border-outline-variant/50 focus:border-primary transition-colors" placeholder="e.g. Bengaluru" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">State</label>
              <input value={profile.state} onChange={e=>setProfile({...profile, state: e.target.value})} className="w-full bg-white rounded-xl px-4 py-3 text-sm font-medium border border-outline-variant/50 focus:border-primary transition-colors" placeholder="e.g. Karnataka" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">Bio / EV Preferences</label>
              <textarea value={profile.bio} onChange={e=>setProfile({...profile, bio: e.target.value})} rows="3" className="w-full bg-white rounded-xl px-4 py-3 text-sm font-medium border border-outline-variant/50 focus:border-primary transition-colors resize-none" placeholder="Tell us about your EV journey..."></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={saving} className="px-8 py-3.5 flex items-center justify-center bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-[0.97] transition-all disabled:opacity-70 gap-2">
              {saving ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <span className="material-symbols-outlined text-lg">save</span>}
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
