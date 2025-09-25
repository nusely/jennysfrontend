import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between">
        {/* Left Arrow */}
        <button
          onClick={onPrevious}
          className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors duration-200 shadow-sm ml-4"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700 text-lg" />
        </button>

        {/* Products Container */}
        <div 
          className="flex-1 flex justify-center items-center space-x-4 sm:space-x-8 mx-4 sm:mx-8 overflow-x-auto scrollbar-hide py-2"
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
              {/* Product Image Container */}
              <div className="relative mb-3 p-4">
                {/* Product Image with enhanced selection styling */}
                <motion.div
                  className={`w-20 h-20 rounded-full overflow-visible shadow-sm ${
                    selectedIndex === index 
                      ? 'ring-4 ring-pink-300 ring-offset-2 ring-offset-white scale-110' 
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

              {/* Product Name */}
              <motion.span
                className={`text-xs text-center font-medium max-w-24 leading-tight ${
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

        {/* Right Arrow */}
        <button
          onClick={onNext}
          className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors duration-200 shadow-sm mr-4"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-gray-700 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ProductCarouselGroup;
