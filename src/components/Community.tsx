import React, { useState } from 'react';
import { User, Challenge, Post } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Award, 
  MessageCircle, 
  Heart,
  Share2,
  Calendar,
  Target,
  Leaf
} from 'lucide-react';

interface CommunityProps {
  user: User;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>('ecotrack-challenges', [
    {
      id: '1',
      title: 'Car-Free Week Challenge',
      description: 'Use only public transport, cycling, or walking for 7 days',
      participants: 234,
      timeLeft: '5 days left',
      reward: 500,
      difficulty: 'Medium',
      status: 'active',
      userParticipating: false
    },
    {
      id: '2',
      title: 'Zero Waste Weekend',
      description: 'Generate zero waste during the weekend',
      participants: 156,
      timeLeft: '2 days left',
      reward: 300,
      difficulty: 'Hard',
      status: 'active',
      userParticipating: true
    },
    {
      id: '3',
      title: 'Plant-Based Month',
      description: 'Eat only plant-based meals for 30 days',
      participants: 89,
      timeLeft: 'Starting soon',
      reward: 800,
      difficulty: 'Hard',
      status: 'upcoming',
      userParticipating: false
    }
  ]);
  
  const [posts, setPosts] = useLocalStorage<Post[]>('ecotrack-posts', [
    {
      id: '1',
      author: 'Emma Watson',
      avatar: 'EW',
      time: '2 hours ago',
      content: 'Just completed my first week of cycling to work! Saved 15kg CO₂ and feeling great! 🚴‍♀️💚',
      likes: 24,
      comments: 8,
      image: true,
      userLiked: false
    },
    {
      id: '2',
      author: 'Green Living Tips',
      avatar: 'GL',
      time: '4 hours ago',
      content: 'Did you know? Switching to LED bulbs can reduce your home energy consumption by up to 75%! 💡 What energy-saving tips do you have?',
      likes: 42,
      comments: 15,
      image: false,
      userLiked: true
    },
    {
      id: '3',
      author: 'Mike Johnson',
      avatar: 'MJ',
      time: '6 hours ago',
      content: 'Meal prep Sunday with locally sourced vegetables! 🥬🥕 Reducing food miles while eating healthy. Anyone else doing local food challenges?',
      likes: 18,
      comments: 6,
      image: true,
      userLiked: false
    }
  ]);

  const leaderboard = [
    { rank: 1, name: 'Emma Watson', points: 4850, reduction: 28, avatar: 'EW' },
    { rank: 2, name: 'John Doe', points: 4200, reduction: 25, avatar: 'JD' },
    { rank: 3, name: 'Sarah Green', points: 3800, reduction: 22, avatar: 'SG' },
    { rank: 4, name: 'Mike Johnson', points: 3200, reduction: 19, avatar: 'MJ' },
    { rank: 5, name: user.name, points: user.totalPoints, reduction: 15, avatar: 'AG' },
    { rank: 6, name: 'Lisa Chen', points: 2100, reduction: 12, avatar: 'LC' },
    { rank: 7, name: 'Tom Wilson', points: 1900, reduction: 10, avatar: 'TW' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === challengeId 
        ? { 
            ...challenge, 
            userParticipating: !challenge.userParticipating,
            participants: challenge.userParticipating 
              ? challenge.participants - 1 
              : challenge.participants + 1
          }
        : challenge
    ));
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            userLiked: !post.userLiked,
            likes: post.userLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Community Hub 🌍</h2>
            <p className="text-purple-100 text-lg">
              Connect with eco-warriors and participate in sustainability challenges
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold">#5</div>
              <div className="text-sm text-purple-100">Your Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">234</div>
              <div className="text-sm text-purple-100">Community Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'feed', label: 'Community Feed', icon: MessageCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
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

        {/* Leaderboard Content */}
        {activeTab === 'leaderboard' && (
          <div className="p-6">
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div 
                  key={entry.rank} 
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    entry.name === user.name 
                      ? 'bg-green-50 border-2 border-green-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      entry.rank === 1 ? 'bg-yellow-500' :
                      entry.rank === 2 ? 'bg-gray-400' :
                      entry.rank === 3 ? 'bg-amber-600' : 'bg-blue-500'
                    }`}>
                      {entry.rank <= 3 ? (
                        <Trophy className="w-5 h-5" />
                      ) : (
                        entry.rank
                      )}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{entry.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{entry.name}</h4>
                      <p className="text-sm text-gray-600">{entry.reduction}% emission reduction</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{entry.points}</div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges Content */}
        {activeTab === 'challenges' && (
          <div className="p-6">
            <div className="space-y-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        {challenge.status === 'active' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{challenge.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{challenge.timeLeft}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{challenge.reward} points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => joinChallenge(challenge.id)}
                    className={`w-full sm:w-auto py-2 px-6 rounded-lg font-medium transition-all duration-200 shadow-lg ${
                      challenge.userParticipating
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                    }`}
                  >
                    {challenge.userParticipating ? 'Leave Challenge' : 
                     challenge.status === 'active' ? 'Join Challenge' : 'Register Interest'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Feed Content */}
        {activeTab === 'feed' && (
          <div className="p-6">
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{post.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{post.author}</h4>
                        <span className="text-sm text-gray-500">{post.time}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      {post.image && (
                        <div className="w-full h-48 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                          <Leaf className="w-16 h-16 text-green-600 opacity-50" />
                        </div>
                      )}
                      <div className="flex items-center space-x-6">
                        <button 
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            post.userLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;