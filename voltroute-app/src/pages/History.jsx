import { useEffect } from 'react';
import { useTrips } from '../hooks/useTrips';
import { formatINR } from '../services/billing';

export default function History() {
  const { trips, loading, loadTrips, deleteTrip } = useTrips();

  useEffect(() => { loadTrips(); }, [loadTrips]);

  const total = trips.reduce((s, t) => ({ cost: s.cost + (t.estimatedCost||0), km: s.km + (t.distanceKm||0), co2: s.co2 + (t.distanceKm||0)*0.12 }), { cost:0, km:0, co2:0 });

  return (
    <div className="pt-14 min-h-screen bg-surface-container-low">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold font-headline tracking-tight mb-1">Trip History</h1>
        <p className="text-sm text-on-surface-variant mb-6">Your past journeys and savings.</p>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm"><span className="text-[10px] font-bold text-on-surface-variant uppercase">Total Distance</span><p className="text-2xl font-extrabold font-headline mt-1">{total.km.toFixed(0)} <span className="text-xs font-normal">km</span></p></div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm"><span className="text-[10px] font-bold text-primary uppercase">Total Spent</span><p className="text-2xl font-extrabold font-headline text-primary mt-1">{formatINR(total.cost)}</p></div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm"><span className="text-[10px] font-bold text-secondary uppercase">CO₂ Saved</span><p className="text-2xl font-extrabold font-headline text-secondary mt-1">{total.co2.toFixed(1)} <span className="text-xs font-normal">kg</span></p></div>
        </div>

        {/* Trips */}
        {loading ? (
          <div className="flex justify-center py-12"><span className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
        ) : trips.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant"><span className="material-symbols-outlined text-5xl mb-3 block opacity-30">route</span><p className="font-bold">No trips yet</p><p className="text-sm">Plan your first trip from the Dashboard!</p></div>
        ) : (
          <div className="space-y-3">
            {trips.map(t => (
              <div key={t.id} className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow fade-in-up">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">route</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{t.source} → {t.destination}</p>
                  <p className="text-[11px] text-on-surface-variant">{t.vehicleName} • {t.distanceKm} km • {new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-extrabold text-primary">{formatINR(t.estimatedCost||0)}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${t.status==='completed'?'bg-secondary/10 text-secondary':'bg-primary/10 text-primary'}`}>{t.status||'planned'}</span>
                </div>
                <button onClick={()=>deleteTrip(t.id)} className="p-1.5 text-on-surface-variant/40 hover:text-error transition-colors rounded-lg hover:bg-error/5">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
