import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone, 
  Award,
  Target,
  TrendingUp,
  Edit3
} from 'lucide-react';

interface ProfileProps {
  user: {
    name: string;
    totalPoints: number;
    currentStreak: number;
    badges: string[];
    monthlyGoal: number;
    currentEmissions: number;
  };
  setUser: (user: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: 'alex.green@email.com',
    location: 'San Francisco, CA',
    monthlyGoal: user.monthlyGoal
  });

  const achievements = [
    { name: 'Early Adopter', date: '2024-12-01', icon: '🌟' },
    { name: 'Eco Warrior', date: '2024-12-15', icon: '⚔️' },
    { name: 'Carbon Saver', date: '2025-01-05', icon: '💚' },
    { name: 'Green Streak', date: '2025-01-10', icon: '🔥' },
    { name: 'Community Helper', date: '2025-01-15', icon: '🤝' }
  ];

  const stats = [
    { label: 'Total CO₂ Saved', value: '2.4 tons', icon: TrendingUp },
    { label: 'Days Active', value: '45 days', icon: Target },
    { label: 'Community Rank', value: '#5', icon: Award }
  ];

  const handleSave = () => {
    setUser({
      ...user,
      name: formData.name,
      monthlyGoal: formData.monthlyGoal
    });
    setEditMode(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <div className="flex items-center space-x-6 text-green-100">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>{user.totalPoints} points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>{user.currentStreak} day streak</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>{editMode ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                  activeSection === tab.id
                    ? 'bg-green-50 text-green-700 border-b-2 border-green-500'
                    : 'text-gray-500 hover:text-green-600 hover:bg-green-25'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Profile Content */}
        {activeSection === 'profile' && (
          <div className="p-6 space-y-8">
            {editMode ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Carbon Goal (kg CO₂)</label>
                    <input
                      type="number"
                      value={formData.monthlyGoal}
                      onChange={(e) => setFormData({ ...formData, monthlyGoal: parseInt(e.target.value) })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Personal Stats */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="bg-gray-50 p-6 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Icon className="w-5 h-5 text-green-600" />
                            </div>
                            <h4 className="font-medium text-gray-700">{stat.label}</h4>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Account Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Full Name</p>
                        <p className="text-gray-600">{formData.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <p className="text-gray-600">{formData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Location</p>
                        <p className="text-gray-600">{formData.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Monthly Carbon Goal</p>
                        <p className="text-gray-600">{formData.monthlyGoal} kg CO₂</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Achievements Content */}
        {activeSection === 'achievements' && (
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Badges</h3>
                <p className="text-gray-600">You've earned {achievements.length} badges on your sustainability journey</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-100">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Content */}
        {activeSection === 'settings' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">App Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Push Notifications</p>
                      <p className="text-sm text-gray-600">Get notified about your goals and achievements</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Privacy Mode</p>
                      <p className="text-sm text-gray-600">Hide your profile from community features</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Data Sharing</p>
                      <p className="text-sm text-gray-600">Share anonymous data for climate research</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;