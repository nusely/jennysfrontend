import React from 'react';
import ProductObjectGroup from './components/ProductObjectGroup';
import { products } from './data/products';

const TestProductObjectGroup: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <ProductObjectGroup product={products[0]} />
    </div>
  );
};

export default TestProductObjectGroup;
