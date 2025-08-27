import React from 'react';
import { 
  Leaf, 
  BarChart3, 
  Plus, 
  Target, 
  Users, 
  FileText, 
  User,
  Award
} from 'lucide-react';
import { TabType } from '../App';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  user: {
    name: string;
    totalPoints: number;
    currentStreak: number;
  };
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, user }) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: BarChart3 },
    { id: 'log' as TabType, label: 'Log Activity', icon: Plus },
    { id: 'goals' as TabType, label: 'Goals', icon: Target },
    { id: 'community' as TabType, label: 'Community', icon: Users },
    { id: 'reports' as TabType, label: 'Reports', icon: FileText },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                EcoTrack
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Carbon Footprint Tracker</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-amber-600">
                <Award className="w-4 h-4" />
                <span className="font-semibold">{user.totalPoints}</span>
              </div>
              <div className="text-green-600">
                <span className="font-semibold">{user.currentStreak}</span> day streak
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-green-100">
          <div className="flex items-center justify-around py-2">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'text-green-600'
                      : 'text-gray-400 hover:text-green-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;