import React, { useState } from 'react';
import { Target, TrendingDown, Award, CheckCircle, AlertCircle, Plus } from 'lucide-react';

interface GoalsProps {
  user: {
    monthlyGoal: number;
    currentEmissions: number;
  };
  setUser: (user: any) => void;
}

const Goals: React.FC<GoalsProps> = ({ user, setUser }) => {
  const [newGoal, setNewGoal] = useState('');
  const [goalType, setGoalType] = useState('monthly');

  const goals = [
    {
      id: 1,
      title: 'Monthly Carbon Budget',
      target: user.monthlyGoal,
      current: user.currentEmissions,
      unit: 'kg CO₂',
      type: 'reduction',
      deadline: '2025-01-31',
      status: 'in-progress',
      progress: (user.currentEmissions / user.monthlyGoal) * 100
    },
    {
      id: 2,
      title: 'Public Transport Usage',
      target: 20,
      current: 14,
      unit: 'trips',
      type: 'increase',
      deadline: '2025-01-31',
      status: 'in-progress',
      progress: (14 / 20) * 100
    },
    {
      id: 3,
      title: 'Renewable Energy',
      target: 80,
      current: 65,
      unit: '% of total',
      type: 'increase',
      deadline: '2025-03-31',
      status: 'in-progress',
      progress: (65 / 80) * 100
    },
    {
      id: 4,
      title: 'Waste Reduction',
      target: 10,
      current: 8,
      unit: 'kg/month',
      type: 'reduction',
      deadline: '2025-02-28',
      status: 'completed',
      progress: 100
    }
  ];

  const achievements = [
    {
      title: 'Early Bird',
      description: 'Completed your first month of tracking',
      date: '2024-12-15',
      icon: '🌅'
    },
    {
      title: 'Green Commuter',
      description: 'Used public transport 15 days in a month',
      date: '2024-12-20',
      icon: '🚌'
    },
    {
      title: 'Carbon Saver',
      description: 'Reduced emissions by 20% vs previous month',
      date: '2025-01-05',
      icon: '💚'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'at-risk': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'at-risk': return AlertCircle;
      default: return Target;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Eco Goals 🎯</h2>
            <p className="text-blue-100 text-lg">
              Track your progress towards a more sustainable lifestyle
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-center">
              <div className="text-4xl font-bold">{goals.filter(g => g.status === 'completed').length}</div>
              <div className="text-sm text-blue-100">Goals Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Goal */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Plus className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Set New Goal</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Type</label>
            <select 
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="monthly">Monthly Carbon Budget</option>
              <option value="transport">Transportation Goal</option>
              <option value="energy">Energy Efficiency</option>
              <option value="waste">Waste Reduction</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
            <input 
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter target"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg">
              Create Goal
            </button>
          </div>
        </div>
      </div>

      {/* Active Goals */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Active Goals</h3>
          <p className="text-gray-600 mt-1">Your current sustainability targets and progress</p>
        </div>
        <div className="divide-y divide-gray-100">
          {goals.map((goal) => {
            const StatusIcon = getStatusIcon(goal.status);
            const progressColor = goal.progress > 100 ? 'bg-red-500' : 'bg-green-500';
            
            return (
              <div key={goal.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${getStatusColor(goal.status)}`}>
                      <StatusIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{goal.title}</h4>
                      <p className="text-sm text-gray-600">
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {goal.current} / {goal.target}
                    </div>
                    <div className="text-sm text-gray-500">{goal.unit}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{Math.round(goal.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
                      style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    ></div>
                  </div>
                  {goal.progress > 100 && (
                    <p className="text-sm text-red-600 font-medium">
                      ⚠️ Over target by {Math.round(goal.progress - 100)}%
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-semibold text-gray-800">Recent Achievements</h3>
          </div>
          <p className="text-gray-600 mt-1">Celebrate your sustainability milestones</p>
        </div>
        <div className="divide-y divide-gray-100">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{achievement.title}</h4>
                  <p className="text-gray-600">{achievement.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;