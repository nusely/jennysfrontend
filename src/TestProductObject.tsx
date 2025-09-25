import React, { useState, useEffect } from 'react';
import ProductObjectGroup from './components/ProductObjectGroup';
import { products } from './data/products';

const TestProductObject: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-cycle through products every 5 seconds to test animations
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Current Product: {products[selectedIndex].productName}
      </h1>
      <ProductObjectGroup product={products[selectedIndex]} />
    </div>
  );
};

export default TestProductObject;
