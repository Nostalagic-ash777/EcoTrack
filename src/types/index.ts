export interface UserInput {
  id: string;
  name: string;
  email: string;
  location: string;
  totalPoints: number;
  currentStreak: number;
  badges: string[];
  monthlyGoal: number;
  currentEmissions: number;
  joinDate: string;
}

export interface Activity {
  id: string;
  category: 'transportation' | 'energy' | 'food' | 'waste' | 'digital';
  type: string;
  emissions: number;
  timestamp: string;
  details: {
    distance?: string;
    amount?: string;
    location?: string;
    from?: string;
    to?: string;
    description?: string;
  };
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  type: 'reduction' | 'increase';
  deadline: string;
  status: 'in-progress' | 'completed' | 'at-risk';
  progress: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  timeLeft: string;
  reward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'active' | 'upcoming' | 'completed';
  userParticipating: boolean;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  image: boolean;
  userLiked: boolean;
}