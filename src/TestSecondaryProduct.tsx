import React from 'react';
import SecondaryProductGroup from './components/SecondaryProductGroup';
import { products } from './data/products';

const TestSecondaryProduct: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <SecondaryProductGroup product={products[0]} />
    </div>
  );
};

export default TestSecondaryProduct;