import { useState, useCallback } from 'react';
import { db, IS_DEMO_MODE } from '../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const DEMO_TRIPS = [
  { id:'demo_1', source:'Kochi', destination:'Trivandrum', distanceKm:210, durationMin:255, batteryStartPercent:68, batteryEndPercent:14, energyNeededKwh:6.56, estimatedCost:79, routeType:'ev_friendly', status:'completed', vehicleName:'Ather 450X', createdAt:'2026-04-06T08:30:00Z' },
  { id:'demo_2', source:'Bengaluru', destination:'Mysuru', distanceKm:150, durationMin:180, batteryStartPercent:90, batteryEndPercent:35, energyNeededKwh:18.75, estimatedCost:244, routeType:'fastest', status:'completed', vehicleName:'Tata Nexon EV Max', createdAt:'2026-04-05T14:15:00Z' },
  { id:'demo_3', source:'Delhi', destination:'Agra', distanceKm:230, durationMin:240, batteryStartPercent:100, batteryEndPercent:22, energyNeededKwh:28.75, estimatedCost:403, routeType:'fastest', status:'completed', vehicleName:'MG ZS EV', createdAt:'2026-04-04T06:00:00Z' },
  { id:'demo_4', source:'Mumbai', destination:'Pune', distanceKm:149, durationMin:165, batteryStartPercent:85, batteryEndPercent:40, energyNeededKwh:19.87, estimatedCost:278, routeType:'eco_friendly', status:'completed', vehicleName:'Hyundai Kona Electric', createdAt:'2026-04-03T10:00:00Z' },
  { id:'demo_5', source:'Chennai', destination:'Pondicherry', distanceKm:155, durationMin:180, batteryStartPercent:95, batteryEndPercent:45, energyNeededKwh:19.38, estimatedCost:232, routeType:'fastest', status:'planned', vehicleName:'Tata Nexon EV', createdAt:'2026-04-08T09:00:00Z' },
];

const STORAGE_KEY = 'vr_saved_trips';

export function useTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTrips = useCallback(async () => {
    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (stored.length > 0) { setTrips(stored); setLoading(false); return stored; }

      if (!IS_DEMO_MODE && db && user) {
        const q = query(collection(db, 'users', user.uid, 'trips'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const fbTrips = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (fbTrips.length > 0) { setTrips(fbTrips); setLoading(false); return fbTrips; }
      }

      setTrips(DEMO_TRIPS);
      setLoading(false);
      return DEMO_TRIPS;
    } catch (e) {
      console.warn('Load trips fallback:', e);
      setTrips(DEMO_TRIPS);
      setLoading(false);
      return DEMO_TRIPS;
    }
  }, [user]);

  const saveTrip = useCallback(async (tripData) => {
    const data = { ...tripData, createdAt: new Date().toISOString(), status: tripData.status || 'planned' };

    if (!IS_DEMO_MODE && db && user) {
      try {
        const ref = await addDoc(collection(db, 'users', user.uid, 'trips'), data);
        data.id = ref.id;
      } catch (e) { data.id = 'local_' + Date.now(); }
    } else {
      data.id = 'local_' + Date.now();
    }

    const updated = [data, ...trips];
    setTrips(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return data;
  }, [trips, user]);

  const deleteTrip = useCallback(async (tripId) => {
    if (!IS_DEMO_MODE && db && user) {
      try { await deleteDoc(doc(db, 'users', user.uid, 'trips', tripId)); } catch (e) {}
    }
    const updated = trips.filter(t => t.id !== tripId);
    setTrips(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [trips, user]);

  return { trips, loading, loadTrips, saveTrip, deleteTrip };
}
