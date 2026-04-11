// FlashVolt NLP Engine
const KB = {
  features: [
    { name:'Route Planning', desc:'Enter source & destination for optimized routes with distance, ETA, and energy calculations.', kw:['route','plan','trip','navigate','direction'] },
    { name:'Battery Prediction', desc:'Know if you can reach your destination. Get reachability checks and charging stop recommendations.', kw:['battery','charge','range','reach','soc'] },
    { name:'Station Discovery', desc:'Find 20+ charging stations across India with fast charger, standard, and battery swap filters.', kw:['station','charger','charging','where','find','nearby'] },
    { name:'Bill Generation', desc:'Get accurate trip bills with state-wise rates, energy breakdown, and unique invoice numbers.', kw:['bill','invoice','cost','price','rate','expense'] },
    { name:'EV vs Fuel Comparison', desc:'Compare EV costs against petrol and diesel. See exactly how much you save per trip.', kw:['compare','petrol','diesel','fuel','saving','versus'] },
    { name:'FlashVolt AI', desc:'Voice + text AI assistant for trip planning, station search, and app navigation.', kw:['flashvolt','assistant','ai','voice','help'] },
    { name:'Trip History', desc:'Track all journeys, review costs, measure CO₂ savings, and export to CSV.', kw:['history','past','previous','track','log'] },
    { name:'Vehicle Management', desc:'Manage EVs from 10+ Indian presets. Set battery capacity, efficiency, and connector details.', kw:['vehicle','car','ev','manage','add'] },
  ],
  pages: { dashboard:'/dashboard', analytics:'/analytics', history:'/history', stations:'/stations', settings:'/settings', home:'/' }
};

export function processQuery(input) {
  const q = input.toLowerCase().trim();

  // Greeting
  if (/^(hi|hello|hey|namaste|good\s*(morning|afternoon|evening))/.test(q))
    return { text: "Hello! I'm **FlashVolt** ⚡ — your smart EV companion. How can I help?", action: null };

  // Identity
  if (/who are you|what are you|your name|flashvolt/.test(q))
    return { text: "I'm **FlashVolt**, the AI assistant built into VoltRoute. I can plan trips, find stations, calculate costs, and navigate the app!", action: null };

  // What is VoltRoute
  if (/what is voltroute|about voltroute|tell me about/.test(q))
    return { text: "**VoltRoute** is a smart EV mobility platform for Indian EV owners.\n\nKey features:\n• 🗺️ Smart route planning\n• 🔋 Battery prediction\n• ⚡ Charging station discovery\n• 💰 Trip bill generation\n• 🎤 Voice commands\n• 📊 Trip history & analytics", action: null };

  // Navigation
  for (const [key, path] of Object.entries(KB.pages)) {
    if (q.includes(key) && (q.includes('go to') || q.includes('open') || q.includes('show') || q.includes('navigate')))
      return { text: `Taking you to **${key.charAt(0).toUpperCase() + key.slice(1)}**...`, action: { type: 'navigate', path } };
  }

  // Feature search
  for (const f of KB.features) {
    if (f.kw.some(k => q.includes(k)))
      return { text: `**${f.name}**: ${f.desc}`, action: null };
  }

  // Trip planning
  const tripMatch = q.match(/(?:plan|trip|route).*?(?:from|)\s+(\w[\w\s]*?)\s+(?:to)\s+(\w[\w\s]*)/i);
  if (tripMatch)
    return { text: `🗺️ Planning trip from **${tripMatch[1].trim()}** to **${tripMatch[2].trim()}**!\n\nGo to the Dashboard to see the route on the map.`, action: { type: 'navigate', path: '/dashboard' } };

  // Cost calculation
  const costMatch = q.match(/(?:how much|cost|price).*?(\d+)\s*km/i);
  if (costMatch) {
    const km = parseInt(costMatch[1]);
    const energy = (km / 10).toFixed(1);
    const cost = (energy * 12).toFixed(0);
    const petrol = ((km / 15) * 105).toFixed(0);
    return { text: `For **${km} km**:\n• ⚡ Energy: ~${energy} kWh\n• 💰 EV cost: ~₹${cost}\n• ⛽ Petrol would cost: ~₹${petrol}\n• 🎉 You save: ~₹${petrol - cost}!`, action: null };
  }

  // What can you do
  if (/what can you do|help|capabilities|features/.test(q))
    return { text: "Here's what I can do:\n\n1. **Plan a Trip** — Go to Dashboard\n2. **Find Stations** — Explore Stations page\n3. **Generate Bills** — Auto-calculated costs\n4. **Manage Vehicles** — Add EVs in Settings\n5. **View History** — Track past trips\n\n💡 Try: \"Plan trip from Mumbai to Pune\" or \"How much for 200 km?\"", action: null };

  // Fallback
  return { text: `I'm not sure about that. Try asking me:\n• "Plan trip from Kochi to Trivandrum"\n• "Find stations near Bengaluru"\n• "How much for 200 km?"\n• "Go to dashboard"`, action: null };
}
