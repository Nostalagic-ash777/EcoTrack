import React from 'react';

const EmissionChart: React.FC = () => {
  const data = [
    { month: 'Jan', emissions: 420 },
    { month: 'Feb', emissions: 380 },
    { month: 'Mar', emissions: 350 },
    { month: 'Apr', emissions: 340 },
    { month: 'May', emissions: 330 },
    { month: 'Jun', emissions: 320 }
  ];

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