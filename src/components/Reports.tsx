import React, { useState } from 'react';
import { Activity, User } from '../types';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingDown, 
  BarChart3, 
  PieChart,
  Filter,
  Share
} from 'lucide-react';

interface ReportsProps {
  activities: Activity[];
  user: User;
}

const Reports: React.FC<ReportsProps> = ({ activities, user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Calculate real data from activities
  const calculateCategoryData = () => {
    const categoryTotals = {
      transportation: 0,
      energy: 0,
      food: 0,
      waste: 0,
      digital: 0
    };
    
    activities.forEach(activity => {
      categoryTotals[activity.category] += activity.emissions;
    });
    
    const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
    
    return Object.entries(categoryTotals).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round(value * 10) / 10,
      percentage: total > 0 ? Math.round((value / total) * 100) : 0
    }));
  };

  const categoryData = calculateCategoryData();
  const totalEmissions = categoryData.reduce((sum, cat) => sum + cat.value, 0);

  const insights = [
    `You've logged ${activities.length} activities this month`,
    `Your largest emission source is ${categoryData.sort((a, b) => b.value - a.value)[0]?.name || 'Transportation'}`,
    `Total emissions: ${Math.round(totalEmissions * 10) / 10} kg CO₂`,
    activities.length > 0 ? `Most recent activity: ${activities[0]?.type}` : 'No activities logged yet'
  ];

  const yearlyStats = {
    totalEmissions: Math.round(totalEmissions * 12),
    averageMonthly: Math.round(totalEmissions * 10) / 10,
    bestMonth: { month: 'September', emissions: 280 },
    worstMonth: { month: 'December', emissions: 410 },
    yearlyReduction: 18
  };

  const comparisons = [
    { label: 'vs National Average', value: '-32%', color: 'text-green-600' },
    { label: 'vs Global Average', value: '-28%', color: 'text-green-600' },
    { label: 'vs Your Goal', value: '+15%', color: 'text-red-600' }
  ];

  const exportReport = () => {
    const reportData = {
      user: user.name,
      period: 'January 2025',
      totalEmissions: Math.round(totalEmissions * 10) / 10,
      categories: categoryData,
      activities: activities.length,
      insights
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ecotrack-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Reports & Analytics 📊</h2>
            <p className="text-blue-100 text-lg">
              Comprehensive insights into your carbon footprint patterns
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-center">
              <div className="text-4xl font-bold">{yearlyStats.yearlyReduction}%</div>
              <div className="text-sm text-blue-100">Yearly Reduction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="transportation">Transportation</option>
                <option value="energy">Energy</option>
                <option value="food">Food</option>
                <option value="waste">Waste</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={exportReport}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">-12%</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Total Emissions</h3>
            <p className="text-2xl font-bold text-gray-900">{yearlyStats.totalEmissions} kg</p>
            <p className="text-sm text-gray-600">This year</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Improving</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Average</h3>
            <p className="text-2xl font-bold text-gray-900">{yearlyStats.averageMonthly} kg</p>
            <p className="text-sm text-gray-600">Per month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600">Best month</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Lowest Emissions</h3>
            <p className="text-2xl font-bold text-gray-900">{yearlyStats.bestMonth.emissions} kg</p>
            <p className="text-sm text-gray-600">{yearlyStats.bestMonth.month}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <PieChart className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-amber-600">Target</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Yearly Reduction</h3>
            <p className="text-2xl font-bold text-gray-900">{yearlyStats.yearlyReduction}%</p>
            <p className="text-sm text-gray-600">vs last year</p>
          </div>
        </div>
      </div>

      {/* Detailed Report */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Detailed Carbon Footprint Analysis</h3>
              <p className="text-gray-600 mt-1">January 2025 Report</p>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Full Report</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Category Breakdown */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Emissions by Category</h4>
            <div className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.value} kg CO₂ ({category.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h4>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparisons */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">How You Compare</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisons.map((comparison, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${comparison.color}`}>
                      {comparison.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{comparison.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;