import React, { useState } from 'react';
import { Goal, User } from '../types';
import { generateId } from '../utils/calculations';
import { Target, TrendingDown, Award, CheckCircle, AlertCircle, Plus } from 'lucide-react';

interface GoalsProps {
  user: User;
  setUser: (user: User) => void;
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
}

const Goals: React.FC<GoalsProps> = ({ user, setUser, goals, setGoals }) => {
  const [newGoalForm, setNewGoalForm] = useState({
    title: '',
    target: '',
    unit: 'kg CO₂',
    type: 'reduction' as 'reduction' | 'increase',
    deadline: ''
  });
  const [showForm, setShowForm] = useState(false);

  const goalTemplates = [
    { title: 'Monthly Carbon Budget', unit: 'kg CO₂', type: 'reduction' as const },
    { title: 'Public Transport Usage', unit: 'trips', type: 'increase' as const },
    { title: 'Renewable Energy Usage', unit: '% of total', type: 'increase' as const },
    { title: 'Waste Reduction', unit: 'kg/month', type: 'reduction' as const },
    { title: 'Plant-based Meals', unit: 'meals/week', type: 'increase' as const }
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

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoalForm.title || !newGoalForm.target || !newGoalForm.deadline) return;
    
    const newGoal: Goal = {
      id: generateId(),
      title: newGoalForm.title,
      target: parseFloat(newGoalForm.target),
      current: 0,
      unit: newGoalForm.unit,
      type: newGoalForm.type,
      deadline: newGoalForm.deadline,
      status: 'in-progress',
      progress: 0
    };
    
    setGoals([...goals, newGoal]);
    setNewGoalForm({
      title: '',
      target: '',
      unit: 'kg CO₂',
      type: 'reduction',
      deadline: ''
    });
    setShowForm(false);
  };

  const updateGoalProgress = (goalId: string, newCurrent: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const progress = (newCurrent / goal.target) * 100;
        const status = progress >= 100 ? 'completed' : 
                      progress > 80 ? 'at-risk' : 'in-progress';
        return { ...goal, current: newCurrent, progress, status };
      }
      return goal;
    }));
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
          <div className="flex items-center space-x-3">
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
                    <div className="mt-2">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Update progress"
                        className="w-24 p-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const value = parseFloat((e.target as HTMLInputElement).value);
                            if (!isNaN(value)) {
                              updateGoalProgress(goal.id, value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                    </div>
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
        {showForm && (
          <form onSubmit={handleCreateGoal} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoalForm.title}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, title: e.target.value })}
                  placeholder="Enter goal title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                <input 
                  type="number"
                  value={newGoalForm.target}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, target: e.target.value })}
                  placeholder="Enter target"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={newGoalForm.unit}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, unit: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="kg CO₂">kg CO₂</option>
                  <option value="trips">trips</option>
                  <option value="% of total">% of total</option>
                  <option value="kg/month">kg/month</option>
                  <option value="meals/week">meals/week</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Type</label>
                <select
                  value={newGoalForm.type}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, type: e.target.value as 'reduction' | 'increase' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="reduction">Reduce</option>
                  <option value="increase">Increase</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoalForm.deadline}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, deadline: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
              >
                Create Goal
              </button>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Quick templates:</p>
                <div className="flex flex-wrap gap-2">
                  {goalTemplates.map((template) => (
                    <button
                      key={template.title}
                      type="button"
                      onClick={() => setNewGoalForm({
                        ...newGoalForm,
                        title: template.title,
                        unit: template.unit,
                        type: template.type
                      })}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                    >
                      {template.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Goals;