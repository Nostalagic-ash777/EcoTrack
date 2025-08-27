import React from 'react';
import { User, Activity } from '../types';
import { 
  TrendingDown, 
  TrendingUp, 
  Zap, 
  Car, 
  UtensilsCrossed, 
  Trash2, 
  Smartphone,
  Target,
  Award,
  Users
} from 'lucide-react';
import EmissionChart from './EmissionChart';
import CategoryBreakdown from './CategoryBreakdown';

interface DashboardProps {
  user: User;
  activities: Activity[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, activities }) => {
  // Calculate real emissions from activities
  const calculateCategoryEmissions = (category: string) => {
    return activities
      .filter(activity => activity.category === category)
      .reduce((sum, activity) => sum + activity.emissions, 0);
  };

  const categories = [
    { 
      name: 'Transportation', 
      value: Math.round(calculateCategoryEmissions('transportation') * 10) / 10, 
      icon: Car, 
      color: 'bg-blue-500', 
      change: -8 
    },
    { 
      name: 'Energy', 
      value: Math.round(calculateCategoryEmissions('energy') * 10) / 10, 
      icon: Zap, 
      color: 'bg-yellow-500', 
      change: -12 
    },
    { 
      name: 'Food', 
      value: Math.round(calculateCategoryEmissions('food') * 10) / 10, 
      icon: UtensilsCrossed, 
      color: 'bg-green-500', 
      change: +5 
    },
    { 
      name: 'Waste', 
      value: Math.round(calculateCategoryEmissions('waste') * 10) / 10, 
      icon: Trash2, 
      color: 'bg-red-500', 
      change: -15 
    },
    { 
      name: 'Digital', 
      value: Math.round(calculateCategoryEmissions('digital') * 10) / 10, 
      icon: Smartphone, 
      color: 'bg-purple-500', 
      change: +2 
    }
  ];

  const totalEmissions = categories.reduce((sum, cat) => sum + cat.value, 0);
  const monthlyProgress = (user.currentEmissions / user.monthlyGoal) * 100;
  const remainingBudget = user.monthlyGoal - user.currentEmissions;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}! 🌱</h2>
            <p className="text-green-100 text-lg">
              You're doing great! Your carbon footprint is {12}% lower than last month.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{user.currentStreak}</div>
              <div className="text-sm text-green-100">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{user.totalPoints}</div>
              <div className="text-sm text-green-100">Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              -12% vs last month
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Total Emissions</h3>
            <p className="text-3xl font-bold text-gray-900">{totalEmissions} <span className="text-lg text-gray-500">kg CO₂</span></p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">
              {remainingBudget > 0 ? `${remainingBudget} kg left` : 'Over budget'}
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Goal</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">{Math.round(monthlyProgress)}%</span>
              <span className="text-sm text-gray-500">of {user.monthlyGoal} kg CO₂</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${monthlyProgress > 100 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-amber-600">
              +{250} this week
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Eco Points</h3>
            <p className="text-3xl font-bold text-gray-900">{user.totalPoints}</p>
            <p className="text-sm text-gray-600">{user.badges.length} badges earned</p>
          </div>
        </div>
      </div>

      {/* Charts and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Emission Trends</h3>
          <EmissionChart activities={activities} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Category Breakdown</h3>
          <CategoryBreakdown categories={categories} />
        </div>
      </div>

      {/* Category Details */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Category Details</h3>
          <p className="text-gray-600 mt-1">Your carbon footprint breakdown by activity type</p>
        </div>
        <div className="divide-y divide-gray-100">
          {categories.map((category) => {
            const Icon = category.icon;
            const isReduction = category.change < 0;
            return (
              <div key={category.name} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 ${category.color} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{category.name}</h4>
                      <p className="text-sm text-gray-600">
                        {category.value} kg CO₂ this month
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 ${
                      isReduction ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isReduction ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4" />
                      )}
                      <span className="font-semibold">
                        {Math.abs(category.change)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">vs last month</p>
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

export default Dashboard;