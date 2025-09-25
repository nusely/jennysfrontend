import React, { useState } from 'react';
import ProductObjectGroup from './components/ProductObjectGroup';
import ProductCarouselGroup from './components/ProductCarouselGroup';
import { products } from './data/products';

const TestProductCarousel: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleProductSelect = (index: number) => {
    setSelectedIndex(index);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 space-y-8">
      {/* Product Object Group */}
      <ProductObjectGroup product={products[selectedIndex]} />
      
      {/* Product Carousel Group */}
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

export default TestProductCarousel;
