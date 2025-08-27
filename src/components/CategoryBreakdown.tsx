import React from 'react';

interface CategoryBreakdownProps {
  categories: Array<{
    name: string;
    value: number;
    color: string;
    icon: React.ComponentType<any>;
  }>;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ categories }) => {
  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const percentage = (category.value / total) * 100;
        const Icon = category.icon;
        
        return (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 ${category.color} rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-700">{category.name}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-900">{category.value} kg</span>
                <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${category.color}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBreakdown;