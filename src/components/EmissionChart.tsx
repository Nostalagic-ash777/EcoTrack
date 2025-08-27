import React from 'react';
import { Activity } from '../types';

interface EmissionChartProps {
  activities: Activity[];
}

const EmissionChart: React.FC<EmissionChartProps> = ({ activities }) => {
  // Generate last 6 months of data
  const generateMonthlyData = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      // Calculate emissions for this month from activities
      const monthEmissions = activities
        .filter(activity => {
          const activityDate = new Date(activity.timestamp);
          return activityDate.getMonth() === date.getMonth() && 
                 activityDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, activity) => sum + activity.emissions, 0);
      
      // Add some baseline emissions for demo purposes
      const baselineEmissions = 300 + Math.random() * 100;
      
      months.push({
        month: monthName,
        emissions: Math.round((monthEmissions + baselineEmissions) * 10) / 10
      });
    }
    
    return months;
  };

  const data = generateMonthlyData();

  const maxEmissions = Math.max(...data.map(d => d.emissions));
  const chartHeight = 200;

  return (
    <div className="w-full">
      <div className="flex items-end justify-between space-x-2 h-48 mb-4">
        {data.map((item, index) => (
          <div key={item.month} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-600 hover:to-green-500"
              style={{ 
                height: `${(item.emissions / maxEmissions) * chartHeight}px`,
                animationDelay: `${index * 100}ms`
              }}
            ></div>
            <div className="mt-2 text-sm font-medium text-gray-700">{item.month}</div>
            <div className="text-xs text-gray-500">{item.emissions} kg</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Monthly Carbon Emissions (kg CO₂)</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Emissions</span>
        </div>
      </div>
    </div>
  );
};

export default EmissionChart;