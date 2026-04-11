// ============================================================
// VoltRoute — Billing & Energy Calculation Service
// ============================================================

export const STATE_RATES = {
  'Kerala': { homeRate: 6.5, publicRate: 12 }, 'Karnataka': { homeRate: 7.0, publicRate: 13 },
  'Tamil Nadu': { homeRate: 5.5, publicRate: 11 }, 'Maharashtra': { homeRate: 8.0, publicRate: 14 },
  'Delhi': { homeRate: 7.5, publicRate: 15 }, 'Telangana': { homeRate: 7.2, publicRate: 13 },
  'Andhra Pradesh': { homeRate: 6.8, publicRate: 12 }, 'Gujarat': { homeRate: 6.0, publicRate: 11 },
  'Rajasthan': { homeRate: 7.0, publicRate: 13 }, 'Uttar Pradesh': { homeRate: 6.5, publicRate: 12 },
  'West Bengal': { homeRate: 7.5, publicRate: 14 }, 'Punjab': { homeRate: 7.0, publicRate: 13 },
  'Haryana': { homeRate: 7.2, publicRate: 13.5 }, 'Madhya Pradesh': { homeRate: 6.8, publicRate: 12 },
  'Bihar': { homeRate: 6.0, publicRate: 11 }, 'Odisha': { homeRate: 5.5, publicRate: 10 },
  'Assam': { homeRate: 6.5, publicRate: 12 }, 'Jharkhand': { homeRate: 6.0, publicRate: 11 },
  'Goa': { homeRate: 5.0, publicRate: 10 }, 'Chhattisgarh': { homeRate: 5.5, publicRate: 10 },
  'Uttarakhand': { homeRate: 5.0, publicRate: 10 }
};

export const BillingService = {
  calculateEnergyNeeded: (distanceKm, efficiencyKmPerKwh) => parseFloat((distanceKm / efficiencyKmPerKwh).toFixed(2)),
  calculateRemainingRange: (chargePercent, fullRange) => (chargePercent / 100) * fullRange,
  checkReachability: (remainingRange, distanceKm) => remainingRange >= distanceKm,
  calculateBatteryEnd: (startPercent, energyNeeded, batteryCapacity) => Math.max(0, parseFloat((startPercent - (energyNeeded / batteryCapacity) * 100).toFixed(1))),
  calculateCO2Saved: (distanceKm) => parseFloat((distanceKm * 0.12).toFixed(2)),

  generateBill(energyKwh, ratePerKwh) {
    const chargingCost = parseFloat((energyKwh * ratePerKwh).toFixed(2));
    const serviceFee = 10;
    const gst = parseFloat((chargingCost * 0.18).toFixed(2));
    return {
      invoiceNumber: 'VR-' + Date.now().toString(36).toUpperCase(),
      chargingCost, serviceFee, gst,
      totalAmount: parseFloat((chargingCost + serviceFee + gst).toFixed(2)),
      ratePerKwh, energyKwh, generatedAt: new Date().toISOString()
    };
  },

  compareFuelCost(distanceKm, evCost) {
    const petrolCost = parseFloat(((distanceKm / 15) * 105).toFixed(2));
    const dieselCost = parseFloat(((distanceKm / 18) * 92).toFixed(2));
    const savingsVsPetrol = parseFloat((petrolCost - evCost).toFixed(2));
    return {
      petrolCost, dieselCost, evCost, savingsVsPetrol,
      savingsPercentVsPetrol: petrolCost > 0 ? parseFloat(((savingsVsPetrol / petrolCost) * 100).toFixed(0)) : 0
    };
  }
};

export const formatINR = (n) => '₹' + parseFloat(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
