import React, { useState } from 'react';
import { Activity, User } from '../types';
import { calculateEmissions, generateId, getTimeAgo } from '../utils/calculations';
import BarcodeScanner from './BarcodeScanner';
import ProductResult from './ProductResult';
import { 
  Plus, 
  Car, 
  Zap, 
  UtensilsCrossed, 
  Trash2, 
  Smartphone, 
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Scan
} from 'lucide-react';

interface ActivityLogProps {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  user: User;
  setUser: (user: User) => void;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities, setActivities, user, setUser }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('transportation');
  const [formData, setFormData] = useState({
    type: '',
    distance: '',
    amount: '',
    from: '',
    to: '',
    location: '',
    description: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any>(null);

  const categories = [
    { id: 'transportation', name: 'Transportation', icon: Car, color: 'bg-blue-500' },
    { id: 'energy', name: 'Energy', icon: Zap, color: 'bg-yellow-500' },
    { id: 'food', name: 'Food', icon: UtensilsCrossed, color: 'bg-green-500' },
    { id: 'waste', name: 'Waste', icon: Trash2, color: 'bg-red-500' },
    { id: 'digital', name: 'Digital', icon: Smartphone, color: 'bg-purple-500' }
  ];

  const transportOptions = [
    'Car (Petrol)',
    'Car (Diesel)', 
    'Car (Electric)',
    'Public Transport',
    'Cycling',
    'Walking',
    'Flight (Domestic)',
    'Flight (International)',
    'Motorcycle',
    'Taxi/Uber'
  ];

  const energyOptions = [
    'Electricity',
    'Natural Gas',
    'Heating Oil',
    'Solar',
    'Wind'
  ];

  const foodOptions = [
    'Beef',
    'Lamb',
    'Pork',
    'Chicken',
    'Fish',
    'Dairy',
    'Vegetables',
    'Fruits',
    'Grains',
    'Plant-based meal',
    'Restaurant meal'
  ];

  const wasteOptions = [
    'General Waste',
    'Recycling',
    'Compost',
    'Electronic Waste'
  ];

  const digitalOptions = [
    'Streaming (1 hour)',
    'Video Call (1 hour)',
    'Email',
    'Social Media (1 hour)',
    'Online Shopping'
  ];

  const getOptionsForCategory = () => {
    switch (selectedCategory) {
      case 'transportation': return transportOptions;
      case 'energy': return energyOptions;
      case 'food': return foodOptions;
      case 'waste': return wasteOptions;
      case 'digital': return digitalOptions;
      default: return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type) return;
    
    let emissions = 0;
    let amount = 0;
    
    if (selectedCategory === 'transportation' && formData.distance) {
      amount = parseFloat(formData.distance);
      emissions = calculateEmissions('transportation', formData.type, amount);
    } else if (selectedCategory === 'energy' && formData.amount) {
      amount = parseFloat(formData.amount);
      emissions = calculateEmissions('energy', formData.type, amount);
    } else if (selectedCategory === 'food' && formData.amount) {
      amount = parseFloat(formData.amount);
      emissions = calculateEmissions('food', formData.type, amount);
    } else if (selectedCategory === 'waste' && formData.amount) {
      amount = parseFloat(formData.amount);
      emissions = calculateEmissions('waste', formData.type, amount);
    } else if (selectedCategory === 'digital') {
      amount = 1; // Default to 1 unit for digital activities
      emissions = calculateEmissions('digital', formData.type, amount);
    }
    
    const newActivity: Activity = {
      id: generateId(),
      category: selectedCategory as Activity['category'],
      type: formData.type,
      emissions: Math.round(emissions * 100) / 100,
      timestamp: new Date().toISOString(),
      details: {
        distance: formData.distance || undefined,
        amount: formData.amount || undefined,
        from: formData.from || undefined,
        to: formData.to || undefined,
        location: formData.location || undefined,
        description: formData.description || undefined
      }
    };
    
    setActivities([newActivity, ...activities]);
    setUser({
      ...user,
      currentEmissions: user.currentEmissions + emissions,
      totalPoints: user.totalPoints + Math.floor(emissions * 10) // Award points based on tracking
    });
    
    // Reset form
    setFormData({
      type: '',
      distance: '',
      amount: '',
      from: '',
      to: '',
      location: '',
      description: ''
    });
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleScanResult = (product: any) => {
    setScannedProduct(product);
    setShowScanner(false);
  };

  const addProductToLog = () => {
    if (!scannedProduct) return;
    
    const newActivity: Activity = {
      id: generateId(),
      category: 'food',
      type: scannedProduct.name,
      emissions: scannedProduct.carbonFootprint,
      timestamp: new Date().toISOString(),
      details: {
        description: `${scannedProduct.brand} - Scanned product`
      }
    };
    
    setActivities([newActivity, ...activities]);
    setUser({
      ...user,
      currentEmissions: user.currentEmissions + scannedProduct.carbonFootprint,
      totalPoints: user.totalPoints + 50 // Bonus points for scanning
    });
    
    setScannedProduct(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getCurrentCategory = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  const renderCategoryForm = () => {
    const options = getOptionsForCategory();
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedCategory === 'transportation' ? 'Transportation Type' : 
               selectedCategory === 'energy' ? 'Energy Source' :
               selectedCategory === 'food' ? 'Food Type' :
               selectedCategory === 'waste' ? 'Waste Type' : 'Digital Activity'}
            </label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select an option</option>
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          {selectedCategory === 'transportation' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (km)
              </label>
              <input 
                type="number" 
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                placeholder="Enter distance"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          )}
          
          {(selectedCategory === 'energy' || selectedCategory === 'food' || selectedCategory === 'waste') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedCategory === 'energy' ? 'Amount (kWh)' :
                 selectedCategory === 'food' ? 'Amount (kg)' : 'Amount (kg)'}
              </label>
              <input 
                type="number" 
                step="0.1"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Enter amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          )}
          
          {selectedCategory === 'transportation' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input 
                  type="text" 
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  placeholder="Starting location"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input 
                  type="text" 
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  placeholder="Destination"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </>
          )}
          
          {selectedCategory !== 'transportation' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Where did this occur?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Any additional details..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
        >
          Log {getCurrentCategory()?.name} Activity
        </button>
      </form>
    );
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Activity logged successfully! Points added to your account.</span>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Log New Activity</h2>
            <p className="text-gray-600">Track your daily activities to monitor your carbon footprint</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowScanner(!showScanner)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline">Scan Product</span>
            </button>
            <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <Plus className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Barcode Scanner */}
      {showScanner && (
        <BarcodeScanner onScanResult={handleScanResult} />
      )}

      {/* Scanned Product Result */}
      {scannedProduct && (
        <ProductResult product={scannedProduct} onAddToLog={addProductToLog} />
      )}

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
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {getCurrentCategory()?.name} Details
        </h3>
        {renderCategoryForm()}
      </div>

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
                          <span>{getTimeAgo(activity.timestamp)}</span>
                        </div>
                        {(activity.details.location || activity.details.from) && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {activity.details.from && activity.details.to 
                                ? `${activity.details.from} → ${activity.details.to}`
                                : activity.details.location}
                            </span>
                          </div>
                        )}
                      </div>
                      {activity.details.distance && (
                        <p className="text-sm text-gray-600 mt-1">Distance: {activity.details.distance} km</p>
                      )}
                      {activity.details.amount && (
                        <p className="text-sm text-gray-600 mt-1">
                          Amount: {activity.details.amount} {
                            activity.category === 'energy' ? 'kWh' :
                            activity.category === 'food' || activity.category === 'waste' ? 'kg' : 'units'
                          }
                        </p>
                      )}
                      {activity.details.description && (
                        <p className="text-sm text-gray-600 mt-1">{activity.details.description}</p>
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
// When a new activity is logged:
function onNewActivity(loggedEmissionAmount: number) {
  setGoals((prevGoals) =>
    prevGoals.map(goal => {
      if (goal.type === 'reduction') {
        const newCurrent = goal.current + loggedEmissionAmount;
        return {
          ...goal,
          current: newCurrent,
          progress: newCurrent / goal.target,
          status: newCurrent >= goal.target ? 'completed' : 'in-progress'
        };
      }
      return goal;
    })
  );
}
