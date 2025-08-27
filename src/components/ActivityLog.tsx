import React, { useState } from 'react';
import { 
  Plus, 
  Car, 
  Zap, 
  UtensilsCrossed, 
  Trash2, 
  Smartphone, 
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';

const ActivityLog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('transportation');
  const [activities, setActivities] = useState([
    {
      id: 1,
      category: 'transportation',
      type: 'Car Drive',
      distance: '25 km',
      emissions: 5.2,
      timestamp: '2 hours ago',
      location: 'Home to Office'
    },
    {
      id: 2,
      category: 'energy',
      type: 'Electricity Usage',
      amount: '12 kWh',
      emissions: 3.8,
      timestamp: '4 hours ago',
      location: 'Home'
    },
    {
      id: 3,
      category: 'food',
      type: 'Restaurant Meal',
      details: 'Beef burger with fries',
      emissions: 2.1,
      timestamp: '6 hours ago',
      location: 'Downtown Restaurant'
    }
  ]);

  const categories = [
    { id: 'transportation', name: 'Transportation', icon: Car, color: 'bg-blue-500' },
    { id: 'energy', name: 'Energy', icon: Zap, color: 'bg-yellow-500' },
    { id: 'food', name: 'Food', icon: UtensilsCrossed, color: 'bg-green-500' },
    { id: 'waste', name: 'Waste', icon: Trash2, color: 'bg-red-500' },
    { id: 'digital', name: 'Digital', icon: Smartphone, color: 'bg-purple-500' }
  ];

  const transportOptions = [
    { name: 'Car (Petrol)', factor: 0.21 },
    { name: 'Car (Diesel)', factor: 0.17 },
    { name: 'Public Transport', factor: 0.05 },
    { name: 'Cycling', factor: 0 },
    { name: 'Walking', factor: 0 },
    { name: 'Flight (Domestic)', factor: 0.25 },
    { name: 'Flight (International)', factor: 0.30 }
  ];

  const getCurrentCategory = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Log New Activity</h2>
            <p className="text-gray-600">Track your daily activities to monitor your carbon footprint</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
            <Plus className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                }`}
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium text-gray-700">{category.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Form */}
      {selectedCategory === 'transportation' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Transportation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transportation Type
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                {transportOptions.map(option => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (km)
              </label>
              <input 
                type="number" 
                placeholder="Enter distance"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <input 
                type="text" 
                placeholder="Starting location"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input 
                type="text" 
                placeholder="Destination"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <button className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg">
            Log Transportation Activity
          </button>
        </div>
      )}

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Recent Activities</h3>
          <p className="text-gray-600 mt-1">Your logged activities from the past 24 hours</p>
        </div>
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => {
            const category = categories.find(cat => cat.id === activity.category);
            if (!category) return null;
            
            const Icon = category.icon;
            return (
              <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 ${category.color} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{activity.type}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{activity.timestamp}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      {activity.distance && (
                        <p className="text-sm text-gray-600 mt-1">Distance: {activity.distance}</p>
                      )}
                      {activity.amount && (
                        <p className="text-sm text-gray-600 mt-1">Usage: {activity.amount}</p>
                      )}
                      {activity.details && (
                        <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{activity.emissions}</div>
                    <div className="text-sm text-gray-500">kg CO₂</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;