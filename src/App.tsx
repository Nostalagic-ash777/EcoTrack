import React, { useState } from 'react';
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
  const [user, setUser] = useState({
    name: 'Alex Green',
    totalPoints: 2450,
    currentStreak: 12,
    badges: ['Early Adopter', 'Eco Warrior', 'Carbon Saver'],
    monthlyGoal: 500,
    currentEmissions: 320
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'log':
        return <ActivityLog />;
      case 'goals':
        return <Goals user={user} setUser={setUser} />;
      case 'community':
        return <Community user={user} />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile user={user} setUser={setUser} />;
      default:
        return <Dashboard user={user} />;
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