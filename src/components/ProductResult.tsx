import React from 'react';
import { Leaf, Award, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProductResultProps {
  product: {
    name: string;
    brand: string;
    carbonFootprint: number;
    category: string;
    sustainabilityScore: number;
    certifications: string[];
  };
  onAddToLog: () => void;
}

const ProductResult: React.FC<ProductResultProps> = ({ product, onAddToLog }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return Leaf;
    return AlertTriangle;
  };

  const ScoreIcon = getScoreIcon(product.sustainabilityScore);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600">{product.brand}</p>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getScoreColor(product.sustainabilityScore)}`}>
          <ScoreIcon className="w-4 h-4" />
          <span className="font-semibold">{product.sustainabilityScore}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Carbon Footprint</h4>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{product.carbonFootprint}</span>
              <span className="text-gray-600">kg CO₂</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Category</h4>
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
              {product.category}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-2">Certifications</h4>
          {product.certifications.length > 0 ? (
            <div className="space-y-2">
              {product.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No certifications available</p>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <button
          onClick={onAddToLog}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
        >
          Add to Activity Log
        </button>
      </div>
    </div>
  );
};

export default ProductResult;