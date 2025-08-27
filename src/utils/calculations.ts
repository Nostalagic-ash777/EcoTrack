export const emissionFactors = {
  transportation: {
    'Car (Petrol)': 0.21, // kg CO2 per km
    'Car (Diesel)': 0.17,
    'Car (Electric)': 0.05,
    'Public Transport': 0.05,
    'Cycling': 0,
    'Walking': 0,
    'Flight (Domestic)': 0.25,
    'Flight (International)': 0.30,
    'Motorcycle': 0.15,
    'Taxi/Uber': 0.19
  },
  energy: {
    'Electricity': 0.32, // kg CO2 per kWh
    'Natural Gas': 0.18, // kg CO2 per kWh
    'Heating Oil': 0.27,
    'Solar': 0.02,
    'Wind': 0.01
  },
  food: {
    'Beef': 27.0, // kg CO2 per kg
    'Lamb': 24.5,
    'Pork': 7.6,
    'Chicken': 5.7,
    'Fish': 5.1,
    'Dairy': 3.2,
    'Vegetables': 0.4,
    'Fruits': 0.7,
    'Grains': 1.1,
    'Plant-based meal': 1.5,
    'Restaurant meal': 4.0
  },
  waste: {
    'General Waste': 0.5, // kg CO2 per kg
    'Recycling': 0.1,
    'Compost': 0.05,
    'Electronic Waste': 2.0
  },
  digital: {
    'Streaming (1 hour)': 0.036, // kg CO2
    'Video Call (1 hour)': 0.15,
    'Email': 0.004,
    'Social Media (1 hour)': 0.08,
    'Online Shopping': 0.5
  }
};

export function calculateEmissions(
  category: keyof typeof emissionFactors,
  type: string,
  amount: number
): number {
  const factor = emissionFactors[category][type as keyof typeof emissionFactors[typeof category]];
  return factor ? factor * amount : 0;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  }
}