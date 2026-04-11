import { useEffect } from 'react';
import { useTrips } from '../hooks/useTrips';
import { formatINR } from '../services/billing';

export default function Analytics() {
  const { trips, loadTrips } = useTrips();
  useEffect(() => { loadTrips(); }, [loadTrips]);

  const total = trips.reduce((s,t) => ({ cost:s.cost+(t.estimatedCost||0), km:s.km+(t.distanceKm||0), energy:s.energy+(t.energyNeededKwh||0), co2:s.co2+(t.distanceKm||0)*0.12 }), { cost:0, km:0, energy:0, co2:0 });
  const avgCostPerKm = total.km > 0 ? (total.cost / total.km) : 0;
  const petrolEquiv = (total.km / 15) * 105;
  const totalSaved = petrolEquiv - total.cost;

  const topRoutes = Object.entries(trips.reduce((acc,t) => { const k=`${t.source}→${t.destination}`; acc[k]=(acc[k]||0)+1; return acc; }, {}))
    .sort((a,b)=>b[1]-a[1]).slice(0,5);

  return (
    <div className="pt-14 min-h-screen bg-surface-container-low">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold font-headline tracking-tight mb-1">Analytics</h1>
        <p className="text-sm text-on-surface-variant mb-6">Your EV driving efficiency insights.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm"><span className="text-[10px] font-bold text-on-surface-variant uppercase">Total Trips</span><p className="text-3xl font-extrabold font-headline mt-2">{trips.length}</p></div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm"><span className="text-[10px] font-bold text-primary uppercase">Total Spent</span><p className="text-3xl font-extrabold font-headline text-primary mt-2">{formatINR(total.cost)}</p></div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm"><span className="text-[10px] font-bold text-secondary uppercase">Total Saved</span><p className="text-3xl font-extrabold font-headline text-secondary mt-2">{formatINR(totalSaved)}</p></div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm"><span className="text-[10px] font-bold text-on-surface-variant uppercase">CO₂ Saved</span><p className="text-3xl font-extrabold font-headline mt-2">{total.co2.toFixed(1)} <span className="text-sm font-normal">kg</span></p></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Efficiency card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Efficiency Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><span className="text-sm">Avg cost per km</span><span className="text-sm font-bold text-primary">{formatINR(avgCostPerKm)}/km</span></div>
              <div className="flex justify-between items-center"><span className="text-sm">Total distance</span><span className="text-sm font-bold">{total.km.toFixed(0)} km</span></div>
              <div className="flex justify-between items-center"><span className="text-sm">Total energy used</span><span className="text-sm font-bold text-secondary">{total.energy.toFixed(1)} kWh</span></div>
              <div className="flex justify-between items-center"><span className="text-sm">EV cost vs Petrol</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-secondary">{formatINR(total.cost)}</span>
                  <span className="text-xs text-on-surface-variant">vs</span>
                  <span className="text-sm font-bold text-orange-500 line-through">{formatINR(petrolEquiv)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Routes */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Top Routes</h3>
            {topRoutes.length === 0 ? (
              <p className="text-sm text-on-surface-variant/60">No trips recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {topRoutes.map(([route, count], i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{i+1}</span>
                      <span className="text-sm font-medium">{route}</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{count}x</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
