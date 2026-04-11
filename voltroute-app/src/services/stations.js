export const CHARGING_STATIONS = [
  { id:1, name:'KSEB Charging Hub', city:'Kochi', state:'Kerala', lat:9.9312, lng:76.2673, stationType:'Fast Charger', connectorTypes:['CCS2','CHAdeMO'], pricePerUnit:12, isBatterySwapAvailable:false },
  { id:2, name:'Tata Power EZ Charge', city:'Kochi', state:'Kerala', lat:10.0159, lng:76.3419, stationType:'Fast Charger', connectorTypes:['CCS2','Type2'], pricePerUnit:15, isBatterySwapAvailable:false },
  { id:3, name:'ChargeZone Station', city:'Kozhikode', state:'Kerala', lat:11.2588, lng:75.7804, stationType:'Standard', connectorTypes:['Type2','CCS2'], pricePerUnit:10, isBatterySwapAvailable:false },
  { id:4, name:'BESCOM EV Station', city:'Bengaluru', state:'Karnataka', lat:12.9716, lng:77.5946, stationType:'Fast Charger', connectorTypes:['CCS2','CHAdeMO','Type2'], pricePerUnit:13, isBatterySwapAvailable:true },
  { id:5, name:'Ather Grid Point', city:'Bengaluru', state:'Karnataka', lat:12.9352, lng:77.6245, stationType:'Fast Charger', connectorTypes:['Ather','Type2'], pricePerUnit:0, isBatterySwapAvailable:false },
  { id:6, name:'KPCL Charging Point', city:'Mysuru', state:'Karnataka', lat:12.2958, lng:76.6394, stationType:'Standard', connectorTypes:['Type2','CCS2'], pricePerUnit:11, isBatterySwapAvailable:false },
  { id:7, name:'EESL Charging Station', city:'Delhi', state:'Delhi', lat:28.6139, lng:77.209, stationType:'Fast Charger', connectorTypes:['CCS2','CHAdeMO','Type2'], pricePerUnit:15, isBatterySwapAvailable:true },
  { id:8, name:'Fortum Charge Station', city:'Delhi', state:'Delhi', lat:28.5355, lng:77.391, stationType:'Fast Charger', connectorTypes:['CCS2','Type2'], pricePerUnit:16, isBatterySwapAvailable:false },
  { id:9, name:'Tata Power Station', city:'Mumbai', state:'Maharashtra', lat:19.076, lng:72.8777, stationType:'Fast Charger', connectorTypes:['CCS2','Type2'], pricePerUnit:14, isBatterySwapAvailable:false },
  { id:10, name:'Adani Charge Hub', city:'Mumbai', state:'Maharashtra', lat:19.0596, lng:72.8295, stationType:'Fast Charger', connectorTypes:['CCS2','CHAdeMO'], pricePerUnit:14, isBatterySwapAvailable:true },
  { id:11, name:'TANGEDCO EV Hub', city:'Chennai', state:'Tamil Nadu', lat:13.0827, lng:80.2707, stationType:'Fast Charger', connectorTypes:['CCS2','Type2'], pricePerUnit:11, isBatterySwapAvailable:false },
  { id:12, name:'Ather Grid Chennai', city:'Chennai', state:'Tamil Nadu', lat:13.0604, lng:80.2496, stationType:'Standard', connectorTypes:['Ather','Type2'], pricePerUnit:0, isBatterySwapAvailable:false },
  { id:13, name:'TSREDCO Station', city:'Hyderabad', state:'Telangana', lat:17.385, lng:78.4867, stationType:'Fast Charger', connectorTypes:['CCS2','Type2'], pricePerUnit:13, isBatterySwapAvailable:false },
  { id:14, name:'CESC Charging Point', city:'Kolkata', state:'West Bengal', lat:22.5726, lng:88.3639, stationType:'Standard', connectorTypes:['Type2','CCS2'], pricePerUnit:14, isBatterySwapAvailable:false },
  { id:15, name:'MSEDCL EV Station', city:'Pune', state:'Maharashtra', lat:18.5204, lng:73.8567, stationType:'Fast Charger', connectorTypes:['CCS2','Type2'], pricePerUnit:13, isBatterySwapAvailable:false },
  { id:16, name:'JVVNL EV Hub', city:'Jaipur', state:'Rajasthan', lat:26.9124, lng:75.7873, stationType:'Standard', connectorTypes:['Type2','CCS2'], pricePerUnit:13, isBatterySwapAvailable:false },
  { id:17, name:'Torrent Power Station', city:'Ahmedabad', state:'Gujarat', lat:23.0225, lng:72.5714, stationType:'Fast Charger', connectorTypes:['CCS2','CHAdeMO'], pricePerUnit:11, isBatterySwapAvailable:false },
  { id:18, name:'UPPCL Station', city:'Lucknow', state:'Uttar Pradesh', lat:26.8467, lng:80.9462, stationType:'Standard', connectorTypes:['Type2','CCS2'], pricePerUnit:12, isBatterySwapAvailable:false },
  { id:19, name:'SunMobility Swap', city:'Bengaluru', state:'Karnataka', lat:12.9783, lng:77.6408, stationType:'Battery Swap', connectorTypes:['Swap'], pricePerUnit:8, isBatterySwapAvailable:true },
  { id:20, name:'KSEB Thiruvananthapuram', city:'Thiruvananthapuram', state:'Kerala', lat:8.5241, lng:76.9366, stationType:'Fast Charger', connectorTypes:['CCS2','Type2'], pricePerUnit:12, isBatterySwapAvailable:false },
];

export const StationService = {
  getAllStations: () => CHARGING_STATIONS,
  getByCity: (city) => CHARGING_STATIONS.filter(s => s.city.toLowerCase().includes(city.toLowerCase())),
  getByState: (state) => CHARGING_STATIONS.filter(s => s.state.toLowerCase() === state.toLowerCase()),
  getByType: (type) => CHARGING_STATIONS.filter(s => s.stationType === type),
  getNearestStations(lat, lng, count = 5) {
    const dist = (s) => Math.sqrt((s.lat - lat) ** 2 + (s.lng - lng) ** 2);
    return [...CHARGING_STATIONS].sort((a, b) => dist(a) - dist(b)).slice(0, count);
  }
};
