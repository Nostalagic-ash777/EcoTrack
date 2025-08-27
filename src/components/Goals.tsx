import React from 'react';
import { Goal } from '../types';

interface GoalsProps {
  goals: Goal[];
}

const Goals: React.FC<GoalsProps> = ({ goals }) => {
  if (goals.length === 0) {
    return (
      <div>
        <h2>Goals</h2>
        <p>No goals defined currently.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Goals</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {goals.map((goal) => (
          <li
            key={goal.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px',
            }}
          >
            <h3>{goal.title}</h3>
            <p>
              Progress: {goal.current} / {goal.target} {goal.unit} (
              {Math.round(goal.progress * 100)}%)
            </p>
            <p>Status: {goal.status}</p>
            <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;
