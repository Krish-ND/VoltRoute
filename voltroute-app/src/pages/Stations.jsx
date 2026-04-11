import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { StationService, CHARGING_STATIONS } from '../services/stations';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

export default function Stations() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = CHARGING_STATIONS.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()) || s.state.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || s.stationType === typeFilter;
    return matchSearch && matchType;
  });

  const icon = (s) => L.divIcon({
    className:'', iconSize:[28,28], iconAnchor:[14,14],
    html:`<div style="background:${s.stationType==='Fast Charger'?'#004ac6':s.stationType==='Battery Swap'?'#006c49':'#4d556b'};width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.2);border:2px solid white"><span style="color:white;font-size:14px" class="material-symbols-outlined">ev_station</span></div>`
  });

  return (
    <div className="pt-14 h-screen flex">
      {/* Sidebar */}
      <div className="w-96 bg-surface-container-low overflow-y-auto hide-scrollbar p-5 flex-shrink-0 border-r border-outline-variant/30 flex flex-col gap-4">
        <h1 className="text-xl font-extrabold font-headline tracking-tight">Charging Stations</h1>

        <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-outline-variant/50">
          <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-on-surface-variant/40" placeholder="Search stations..." />
        </div>

        <div className="flex gap-2">
          {['All','Fast Charger','Standard','Battery Swap'].map(t=>(
            <button key={t} onClick={()=>setTypeFilter(t)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${typeFilter===t?'bg-primary/10 text-primary border border-primary/30':'bg-white text-on-surface-variant border border-outline-variant/30'}`}>{t}</button>
          ))}
        </div>

        <p className="text-[10px] font-bold text-on-surface-variant uppercase">{filtered.length} Stations found</p>

        <div className="space-y-2 flex-1">
          {filtered.map(s=>(
            <div key={s.id} className="bg-surface-container-lowest p-3 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.stationType==='Fast Charger'?'bg-primary/10':'bg-secondary/10'}`}>
                  <span className={`material-symbols-outlined ${s.stationType==='Fast Charger'?'text-primary':'text-secondary'}`} style={{fontSize:18}}>ev_station</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold truncate">{s.name}</p>
                  <p className="text-[11px] text-on-surface-variant">{s.city}, {s.state}</p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[9px] font-bold bg-primary-fixed text-primary px-2 py-0.5 rounded-full">{s.stationType}</span>
                    {s.isBatterySwapAvailable && <span className="text-[9px] font-bold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">Swap</span>}
                    <span className="text-[9px] font-bold text-on-surface-variant">{s.pricePerUnit>0?`₹${s.pricePerUnit}/kWh`:'Free'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer center={[20.5,78.9]} zoom={5} className="absolute inset-0">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution="&copy; CARTO" maxZoom={19} subdomains="abcd" />
          {filtered.map(s=>(
            <Marker key={s.id} position={[s.lat,s.lng]} icon={icon(s)}>
              <Popup><div style={{fontFamily:'Inter',minWidth:180}}><h4 style={{fontWeight:800,fontSize:13}}>{s.name}</h4><p style={{fontSize:11,color:'#4d556b'}}>{s.city}, {s.state}</p><p style={{fontSize:11}}>{s.pricePerUnit>0?`₹${s.pricePerUnit}/kWh`:'Free charging'}</p></div></Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
