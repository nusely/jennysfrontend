import React, { useState } from 'react';
import ProductCarouselGroup from './components/ProductCarouselGroup';
import { products } from './data/products';

const TestCarousel: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleProductSelect = (index: number) => {
    setSelectedIndex(index);
    console.log('Selected product:', products[index].productName);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => 
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) => 
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Selected: {products[selectedIndex].productName}
      </h1>
      <ProductCarouselGroup
        products={products}
        selectedIndex={selectedIndex}
        onProductSelect={handleProductSelect}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default TestCarousel;
