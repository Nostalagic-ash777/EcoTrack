import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { User, Activity, Goal } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ActivityLog from './components/ActivityLog';
import Goals from './components/Goals';
import Community from './components/Community';
import Reports from './components/Reports';
import Profile from './components/Profile';

export type TabType = 'dashboard' | 'log' | 'goals' | 'community' | 'reports' | 'profile';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  const [user, setUser] = useLocalStorage<User>('ecotrack-user', {
    id: '1',
    name: 'Alex Green',
    email: 'alex.green@email.com',
    location: 'San Francisco, CA',
    totalPoints: 2450,
    currentStreak: 12,
    badges: ['Early Adopter', 'Eco Warrior', 'Carbon Saver'],
    monthlyGoal: 500,
    currentEmissions: 320,
    joinDate: '2024-12-01'
  });

  const [activities, setActivities] = useLocalStorage<Activity[]>('ecotrack-activities', [
    {
      id: '1',
      category: 'transportation',
      type: 'Car (Petrol)',
      emissions: 5.2,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      details: {
        distance: '25',
        from: 'Home',
        to: 'Office'
      }
    },
    {
      id: '2',
      category: 'energy',
      type: 'Electricity',
      emissions: 3.8,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      details: {
        amount: '12',
        location: 'Home'
      }
    }
  ]);

  const [goals, setGoals] = useLocalStorage<Goal[]>('ecotrack-goals', [
    {
      id: '1',
      title: 'Monthly Carbon Budget',
      target: user.monthlyGoal,
      current: user.currentEmissions,
      unit: 'kg CO₂',
      type: 'reduction',
      deadline: '2025-01-31',
      status: 'in-progress',
      progress: (user.currentEmissions / user.monthlyGoal) * 100
    }
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} activities={activities} />;
      case 'log':
        return <ActivityLog activities={activities} setActivities={setActivities} user={user} setUser={setUser} />;
      case 'goals':
        return <Goals user={user} setUser={setUser} goals={goals} setGoals={setGoals} />;
      case 'community':
        return <Community user={user} />;
      case 'reports':
        return <Reports activities={activities} user={user} />;
      case 'profile':
        return <Profile user={user} setUser={setUser} />;
      default:
        return <Dashboard user={user} activities={activities} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;