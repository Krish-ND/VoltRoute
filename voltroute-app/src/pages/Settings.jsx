import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { VEHICLE_PRESETS } from '../services/vehicles';

export default function Settings() {
  const { user, logout } = useAuth();
  const [saved, setSaved] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_PRESETS[0]?.id || '');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  return (
    <div className="pt-14 min-h-screen bg-surface-container-low">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold font-headline tracking-tight mb-1">Settings</h1>
        <p className="text-sm text-on-surface-variant mb-6">Manage your profile, vehicles, and preferences.</p>

        {saved && <div className="mb-4 px-4 py-2.5 bg-secondary/10 text-secondary text-sm font-bold rounded-xl fade-in-up">✓ Settings saved!</div>}

        {/* Profile */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Profile</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white text-xl font-bold">
              {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-bold">{user?.displayName || 'User'}</p>
              <p className="text-sm text-on-surface-variant">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Display Name</label>
              <input defaultValue={user?.displayName||''} className="w-full bg-white rounded-xl px-3 py-2.5 text-sm border border-outline-variant/50" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Email</label>
              <input defaultValue={user?.email||''} className="w-full bg-white rounded-xl px-3 py-2.5 text-sm border border-outline-variant/50" disabled />
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Default Vehicle</h3>
          <select value={selectedVehicle} onChange={e=>setSelectedVehicle(e.target.value)} className="w-full bg-white rounded-xl px-3 py-2.5 text-sm border border-outline-variant/50 cursor-pointer">
            {VEHICLE_PRESETS.map(v=><option key={v.id} value={v.id}>{v.name} — {v.batteryCapacity} kWh, {v.fullRangeKm} km range</option>)}
          </select>
        </div>

        {/* Preferences */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-bold">Notifications</p><p className="text-[11px] text-on-surface-variant">Trip reminders and station alerts</p></div>
              <button onClick={()=>setNotifications(!notifications)} className={`w-11 h-6 rounded-full transition-colors ${notifications?'bg-primary':'bg-outline-variant'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${notifications?'translate-x-5.5':'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-bold">Dark Mode</p><p className="text-[11px] text-on-surface-variant">Coming soon</p></div>
              <button onClick={()=>setDarkMode(!darkMode)} className={`w-11 h-6 rounded-full transition-colors ${darkMode?'bg-primary':'bg-outline-variant'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${darkMode?'translate-x-5.5':'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} className="flex-1 py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">Save Settings</button>
          <button onClick={logout} className="px-6 py-3 border border-error/30 text-error rounded-xl font-bold hover:bg-error/5 transition-colors">Sign Out</button>
        </div>
      </div>
    </div>
  );
}
