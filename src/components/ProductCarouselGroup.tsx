import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';

interface ProductCarouselGroupProps {
  products: Product[];
  selectedIndex: number;
  onProductSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ProductCarouselGroup: React.FC<ProductCarouselGroupProps> = ({
  products,
  selectedIndex,
  onProductSelect,
  onPrevious,
  onNext
}) => {
  // Auto-loop through products every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % products.length;
      onProductSelect(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedIndex, products.length, onProductSelect]);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 lg:p-6">
      <div className="flex items-center justify-center w-full">
        {/* Products Container - Mobile optimized and centered */}
        <div 
          className="flex justify-center items-center space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide py-2 w-full"
          onTouchStart={(e) => {
            const touchStart = e.touches[0].clientX;
            e.currentTarget.addEventListener('touchend', (endEvent) => {
              const touchEnd = (endEvent as TouchEvent).changedTouches[0].clientX;
              const diff = touchStart - touchEnd;
              if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                  onNext();
                } else {
                  onPrevious();
                }
              }
            }, { once: true });
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-col items-center cursor-pointer relative"
              onClick={() => onProductSelect(index)}
            >
              {/* Product Image Container - Smaller on mobile */}
              <div className="relative mb-2 sm:mb-3 p-2 sm:p-4">
                {/* Product Image with enhanced selection styling */}
                <motion.div
                  className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-visible shadow-sm ${
                    selectedIndex === index 
                      ? 'ring-2 sm:ring-4 ring-pink-300 ring-offset-1 sm:ring-offset-2 ring-offset-white scale-110' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  whileHover={{ scale: selectedIndex === index ? 1.15 : 1.05 }}
                  whileTap={{ scale: selectedIndex === index ? 1.05 : 0.95 }}
                  transition={{ duration: 0.2 }}
                  animate={{
                    scale: selectedIndex === index ? 1.1 : 1,
                    opacity: selectedIndex === index ? 1 : 0.7
                  }}
                  style={{ aspectRatio: '1/1' }}
                >
                  <img
                    src={product.mainImage}
                    alt={product.productName}
                    className="w-full h-full object-contain rounded-full"
                  />
                </motion.div>
              </div>

              {/* Product Name - Hidden on mobile, shown on larger screens */}
              <motion.span
                className={`hidden sm:block text-xs text-center font-medium max-w-24 leading-tight ${
                  selectedIndex === index ? 'text-gray-800 font-semibold' : 'text-gray-600'
                }`}
                animate={{
                  color: selectedIndex === index ? '#1f2937' : '#6b7280'
                }}
                transition={{ duration: 0.2 }}
              >
                {product.productName}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarouselGroup;
