import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../hooks/useTrips';
import { VEHICLE_PRESETS } from '../services/vehicles';
import { STATE_RATES, BillingService, formatINR } from '../services/billing';
import { StationService } from '../services/stations';

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

function MapController({ center, bounds }) {
  const map = useMap();
  useEffect(() => { if (bounds) map.fitBounds(bounds, { padding: [50, 50] }); else if (center) map.setView(center, 7); }, [center, bounds, map]);
  return null;
}

async function geocode(place) {
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place+', India')}&format=json&limit=1`);
    const d = await r.json();
    if (d.length) return { lat: +d[0].lat, lng: +d[0].lon, name: d[0].display_name };
  } catch (e) { console.warn('Geocode:', e); }
  return null;
}

async function getRoute(src, dst) {
  try {
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${src.lng},${src.lat};${dst.lng},${dst.lat}?overview=full&geometries=geojson`);
    const d = await r.json();
    if (d.routes?.length) return { distanceKm: +(d.routes[0].distance/1000).toFixed(1), durationMin: Math.round(d.routes[0].duration/60), geometry: d.routes[0].geometry };
  } catch (e) { console.warn('Route:', e); }
  return null;
}

function Toast({ msg, type }) {
  if (!msg) return null;
  const bg = type === 'error' ? 'bg-error' : type === 'success' ? 'bg-secondary' : 'bg-primary';
  return <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] ${bg} text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg fade-in-up`}>{msg}</div>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { saveTrip } = useTrips();
  const [vehicle, setVehicle] = useState(VEHICLE_PRESETS[0]);
  const [state, setState] = useState('Kerala');
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [battery, setBattery] = useState(40);
  const [charge, setCharge] = useState(85);
  const [efficiency, setEfficiency] = useState(8);
  const [routePref, setRoutePref] = useState('fastest');
  const [planning, setPlanning] = useState(false);
  const [results, setResults] = useState(null);
  const [routeGeo, setRouteGeo] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [toast, setToast] = useState(null);
  const [showEV, setShowEV] = useState(true);

  const stations = StationService.getAllStations();

  const showToast = (msg, type='info') => { setToast({msg,type}); setTimeout(()=>setToast(null), 3000); };

  const stationIcon = (s) => L.divIcon({
    className:'', iconSize:[26,26], iconAnchor:[13,13],
    html:`<div style="background:${s.stationType==='Fast Charger'?'#004ac6':s.stationType==='Battery Swap'?'#006c49':'#4d556b'};width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.2);border:2px solid white"><span style="color:white;font-size:13px" class="material-symbols-outlined">ev_station</span></div>`
  });

  const planTrip = async () => {
    if (!source||!dest) { showToast('Enter both source and destination','error'); return; }
    setPlanning(true); setResults(null); setRouteGeo(null); setMarkers([]);
    try {
      const [sg, dg] = await Promise.all([geocode(source), geocode(dest)]);
      if (!sg||!dg) { showToast('Could not find locations','error'); setPlanning(false); return; }
      const route = await getRoute(sg, dg);
      if (!route) { showToast('Could not calculate route','error'); setPlanning(false); return; }

      const fullRange = efficiency * battery;
      const stateRate = STATE_RATES[state] || STATE_RATES['Kerala'];
      const energyNeeded = BillingService.calculateEnergyNeeded(route.distanceKm, efficiency);
      const remainingRange = BillingService.calculateRemainingRange(charge, fullRange);
      const isReachable = BillingService.checkReachability(remainingRange, route.distanceKm);
      const bill = BillingService.generateBill(energyNeeded, stateRate.publicRate);
      const co2Saved = BillingService.calculateCO2Saved(route.distanceKm);
      const batteryEnd = BillingService.calculateBatteryEnd(charge, energyNeeded, battery);
      const fuelComp = BillingService.compareFuelCost(route.distanceKm, bill.totalAmount);

      setRouteGeo(route.geometry);
      setMarkers([
        { pos:[sg.lat,sg.lng], label:`Start: ${source}`, type:'src' },
        { pos:[dg.lat,dg.lng], label:`End: ${dest}`, type:'dst' },
      ]);
      const b = L.latLngBounds([sg.lat,sg.lng],[dg.lat,dg.lng]);
      setBounds(b);
      setResults({ ...route, energyNeeded, isReachable, bill, co2Saved, batteryEnd, remainingRange, fuelComp });
      showToast('Trip planned!','success');
    } catch(e) { showToast('Planning failed','error'); }
    setPlanning(false);
  };

  const onSaveTrip = async () => {
    if (!results) return;
    await saveTrip({ source, destination:dest, distanceKm:results.distanceKm, durationMin:results.durationMin, batteryStartPercent:charge, batteryEndPercent:results.batteryEnd, energyNeededKwh:results.energyNeeded, estimatedCost:results.bill.totalAmount, routeType:routePref, vehicleName:vehicle.name, state, co2Saved:results.co2Saved });
    showToast(`Saved! Invoice: ${results.bill.invoiceNumber}`,'success');
  };

  return (
    <div className="pt-14 h-screen flex">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Left Panel */}
      <section className="w-full sm:w-[400px] h-full bg-surface-container-low overflow-y-auto hide-scrollbar p-5 flex flex-col gap-4 z-10 shadow-xl shadow-on-surface/5 flex-shrink-0">
        <div>
          <h1 className="text-xl font-extrabold font-headline tracking-tight">
            {user?.displayName ? `Welcome, ${user.displayName.split(' ')[0]}` : 'Plan Your Trip'}
          </h1>
          <p className="text-xs text-on-surface-variant">Define your journey and energy parameters.</p>
        </div>

        {/* Source / Dest */}
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 ml-1">Source</label>
            <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-outline-variant/50">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              <input value={source} onChange={e=>setSource(e.target.value)} className="flex-1 bg-white border-0 outline-none focus:ring-0 focus:outline-none p-0 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/40 caret-primary" placeholder="Enter starting point" style={{ boxShadow: 'none', background: 'transparent' }} />
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={()=>{const t=source;setSource(dest);setDest(t)}} className="p-1 rounded-full bg-surface-container hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined text-sm">swap_vert</span>
            </button>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 ml-1">Destination</label>
            <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-outline-variant/50">
              <span className="material-symbols-outlined text-secondary text-lg">flag</span>
              <input value={dest} onChange={e=>setDest(e.target.value)} className="flex-1 bg-white border-0 outline-none focus:ring-0 focus:outline-none p-0 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/40 caret-primary" placeholder="Where to?" style={{ boxShadow: 'none', background: 'transparent' }} />
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Vehicle</label>
          <select value={VEHICLE_PRESETS.indexOf(vehicle)} onChange={e=>{const v=VEHICLE_PRESETS[e.target.value];setVehicle(v);setBattery(v.batteryCapacity);setEfficiency(v.efficiencyKmPerKwh)}}
            className="w-full bg-white rounded-xl px-3 py-2.5 text-sm font-medium border border-outline-variant/50 cursor-pointer">
            {VEHICLE_PRESETS.map((v,i)=><option key={i} value={i}>{v.name} ({v.batteryCapacity} kWh)</option>)}
          </select>
        </div>

        {/* Battery / Charge / Efficiency */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-3 rounded-xl border border-outline-variant/30">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Battery</label>
            <div className="flex items-baseline gap-1">
              <input value={battery} onChange={e=>setBattery(+e.target.value)} className="w-full bg-transparent border-none p-0 text-lg font-bold font-headline text-primary focus:ring-0" type="number" min="1" max="200" />
              <span className="text-[10px] font-bold text-on-surface-variant">kWh</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-outline-variant/30">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Charge</label>
            <div className="flex items-baseline gap-1">
              <input value={charge} onChange={e=>setCharge(+e.target.value)} className="w-full bg-transparent border-none p-0 text-lg font-bold font-headline text-secondary focus:ring-0" type="number" min="0" max="100" />
              <span className="text-[10px] font-bold text-on-surface-variant">%</span>
            </div>
          </div>
          <div className="col-span-2 bg-white p-3 rounded-xl border border-outline-variant/30">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Efficiency</label>
            <div className="flex items-center gap-3">
              <input value={efficiency} onChange={e=>setEfficiency(+e.target.value)} className="flex-1 accent-primary h-1 bg-outline-variant rounded-full appearance-none cursor-pointer" type="range" min="2" max="45" step="0.5" />
              <span className="text-xs font-bold text-primary whitespace-nowrap">{efficiency} km/kWh</span>
            </div>
          </div>
        </div>

        {/* State */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Charging State</label>
          <select value={state} onChange={e=>setState(e.target.value)} className="w-full bg-white rounded-xl px-3 py-2.5 text-sm font-medium border border-outline-variant/50 cursor-pointer">
            {Object.keys(STATE_RATES).map(s=><option key={s} value={s}>{s} (₹{STATE_RATES[s].publicRate}/kWh)</option>)}
          </select>
        </div>

        {/* Route prefs */}
        <div className="flex gap-2">
          {['fastest','ev_friendly','cheapest'].map(p=>(
            <button key={p} onClick={()=>setRoutePref(p)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${routePref===p?'bg-primary/10 text-primary border border-primary/30':'bg-white text-on-surface-variant border border-outline-variant/30 hover:border-primary/30'}`}>
              {p.replace('_',' ').replace(/\b\w/g,c=>c.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Plan Trip */}
        <button onClick={planTrip} disabled={planning} className="w-full py-3.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-[0.97] transition-transform disabled:opacity-50 flex items-center justify-center gap-2">
          {planning ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>bolt</span>}
          {planning ? 'Planning...' : 'Plan Trip'}
        </button>

        {/* Results */}
        {results && (
          <div className="space-y-3 pt-3 border-t border-outline-variant/30 fade-in-up">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-3 rounded-xl"><span className="text-[9px] font-bold text-on-surface-variant uppercase">Distance</span><p className="text-lg font-extrabold font-headline">{results.distanceKm} <span className="text-[10px] font-normal">km</span></p></div>
              <div className="bg-white p-3 rounded-xl"><span className="text-[9px] font-bold text-on-surface-variant uppercase">Time</span><p className="text-lg font-extrabold font-headline">{Math.floor(results.durationMin/60)}h {results.durationMin%60}m</p></div>
              <div className="bg-secondary/5 p-3 rounded-xl"><span className="text-[9px] font-bold text-secondary uppercase">Energy</span><p className="text-lg font-extrabold font-headline text-secondary">{results.energyNeeded} <span className="text-[10px] font-normal">kWh</span></p></div>
              <div className="bg-primary/5 p-3 rounded-xl"><span className="text-[9px] font-bold text-primary uppercase">CO₂ Saved</span><p className="text-lg font-extrabold font-headline text-primary">{results.co2Saved} <span className="text-[10px] font-normal">kg</span></p></div>
            </div>

            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-bold ${results.isReachable ? 'bg-gradient-to-r from-secondary to-secondary-container' : 'bg-gradient-to-r from-error to-red-400'}`}>
              <span className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>{results.isReachable?'check_circle':'warning'}</span>
              {results.isReachable ? `Reachable! Battery at ${results.batteryEnd}%` : `Charging needed! Range: ${results.remainingRange.toFixed(0)}km`}
            </div>

            <div className="bg-white p-3 rounded-xl space-y-2">
              <div className="flex justify-between"><span className="text-[10px] font-bold text-on-surface-variant uppercase">Charging Cost</span><span className="text-sm font-bold">{formatINR(results.bill.chargingCost)}</span></div>
              <div className="flex justify-between"><span className="text-[10px] font-bold text-on-surface-variant uppercase">GST + Service</span><span className="text-sm font-bold">{formatINR(results.bill.gst + results.bill.serviceFee)}</span></div>
              <div className="flex justify-between pt-2 border-t border-outline-variant/30"><span className="text-[10px] font-bold text-on-surface-variant uppercase">Total</span><span className="text-xl font-black font-headline text-primary">{formatINR(results.bill.totalAmount)}</span></div>
            </div>

            <div className="bg-white p-3 rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">EV vs Fuel</span>
              <div className="flex justify-between"><span className="text-xs">EV</span><span className="text-sm font-bold text-secondary">{formatINR(results.bill.totalAmount)}</span></div>
              <div className="flex justify-between"><span className="text-xs">Petrol</span><span className="text-sm font-bold text-orange-500">{formatINR(results.fuelComp.petrolCost)}</span></div>
              <div className="flex justify-between pt-1.5 border-t border-outline-variant/20"><span className="text-xs font-bold text-secondary">You save</span><span className="text-sm font-extrabold text-secondary">{formatINR(results.fuelComp.savingsVsPetrol)} ({results.fuelComp.savingsPercentVsPetrol}%)</span></div>
            </div>

            <button onClick={onSaveTrip} className="w-full py-3 bg-secondary text-white rounded-xl font-bold shadow-lg shadow-secondary/20 active:scale-[0.97] transition-transform flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">save</span> Save Trip & Generate Bill
            </button>
          </div>
        )}
      </section>

      {/* Map */}
      <section className="flex-1 relative hidden sm:block">
        <MapContainer center={[10, 76.3]} zoom={7} className="absolute inset-0 z-0" zoomControl={true}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution="&copy; CARTO &copy; OSM" maxZoom={19} subdomains="abcd" />
          <MapController center={[10, 76.3]} bounds={bounds} />
          {routeGeo && <GeoJSON key={JSON.stringify(routeGeo)} data={routeGeo} style={{color:'#004ac6',weight:4,opacity:0.8}} />}
          {markers.map((m,i)=><Marker key={i} position={m.pos}><Popup>{m.label}</Popup></Marker>)}
          {showEV && stations.map(s=>(
            <Marker key={s.id} position={[s.lat,s.lng]} icon={stationIcon(s)}>
              <Popup><div style={{fontFamily:'Inter,sans-serif',minWidth:180}}><h4 style={{fontWeight:800,fontSize:13,margin:'0 0 2px'}}>{s.name}</h4><p style={{fontSize:11,color:'#4d556b',margin:'0 0 4px'}}>{s.city}, {s.state}</p><span style={{background:'#dbe1ff',color:'#004ac6',padding:'1px 6px',borderRadius:6,fontSize:10,fontWeight:700}}>{s.stationType}</span>{s.pricePerUnit>0?<p style={{fontSize:11,margin:'4px 0 0'}}>₹{s.pricePerUnit}/kWh</p>:<p style={{fontSize:11,margin:'4px 0 0',color:'#006c49'}}><b>Free</b></p>}</div></Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Layer toggles */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <button onClick={()=>setShowEV(v=>!v)} className={`glass-strong w-9 h-9 rounded-lg flex items-center justify-center shadow-md border border-outline-variant/50 transition-all ${showEV?'opacity-100 border-primary':'opacity-45'}`} title="EV Stations">
            <span className="material-symbols-outlined text-primary" style={{fontSize:18,fontVariationSettings:"'FILL' 1"}}>ev_station</span>
          </button>
          <button className="glass-strong w-9 h-9 rounded-lg flex items-center justify-center shadow-md border border-outline-variant/50" title="Fuel Stations">
            <span className="material-symbols-outlined text-orange-500" style={{fontSize:18}}>local_gas_station</span>
          </button>
          <button className="glass-strong w-9 h-9 rounded-lg flex items-center justify-center shadow-md border border-outline-variant/50" title="Parking">
            <span className="material-symbols-outlined text-on-surface-variant" style={{fontSize:18}}>local_parking</span>
          </button>
        </div>
      </section>
    </div>
  );
}
