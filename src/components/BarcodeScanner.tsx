import React, { useState } from 'react';
import { Scan, Package, Leaf, AlertTriangle } from 'lucide-react';

interface BarcodeScannerProps {
  onScanResult: (product: any) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanResult }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');

  // Mock product database
  const productDatabase = {
    '1234567890123': {
      name: 'Organic Bananas',
      brand: 'Fresh Farm',
      carbonFootprint: 0.7,
      category: 'food',
      sustainabilityScore: 85,
      certifications: ['Organic', 'Fair Trade']
    },
    '9876543210987': {
      name: 'Beef Burger',
      brand: 'Quick Eats',
      carbonFootprint: 15.2,
      category: 'food',
      sustainabilityScore: 25,
      certifications: []
    },
    '5555666677778': {
      name: 'LED Light Bulb',
      brand: 'EcoLight',
      carbonFootprint: 2.1,
      category: 'electronics',
      sustainabilityScore: 92,
      certifications: ['Energy Star']
    }
  };

  const handleManualScan = () => {
    const product = productDatabase[manualBarcode as keyof typeof productDatabase];
    if (product) {
      onScanResult(product);
      setManualBarcode('');
    } else {
      // Mock unknown product
      onScanResult({
        name: 'Unknown Product',
        brand: 'Unknown Brand',
        carbonFootprint: 5.0,
        category: 'unknown',
        sustainabilityScore: 50,
        certifications: []
      });
      setManualBarcode('');
    }
  };

  const startCamera = () => {
    setIsScanning(true);
    // Simulate camera scanning
    setTimeout(() => {
      setIsScanning(false);
      // Simulate successful scan
      const randomProduct = Object.values(productDatabase)[Math.floor(Math.random() * Object.values(productDatabase).length)];
      onScanResult(randomProduct);
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Scan className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Product Scanner</h3>
      </div>

      <div className="space-y-6">
        {/* Camera Scanner */}
        <div className="text-center">
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
            {isScanning ? (
              <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                <div className="animate-pulse">
                  <Scan className="w-16 h-16 text-blue-600" />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Camera view</p>
              </div>
            )}
          </div>
          <button
            onClick={startCamera}
            disabled={isScanning}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isScanning ? 'Scanning...' : 'Start Camera Scan'}
          </button>
        </div>

        {/* Manual Entry */}
        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-800 mb-4">Manual Barcode Entry</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              placeholder="Enter barcode number"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleManualScan}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Scan
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Try: 1234567890123 (Bananas), 9876543210987 (Burger), 5555666677778 (LED Bulb)
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;</parameter>