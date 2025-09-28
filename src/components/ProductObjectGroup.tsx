import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';

interface ProductObjectGroupProps {
  product: Product;
}

const ProductObjectGroup: React.FC<ProductObjectGroupProps> = ({ product }) => {
  
  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 sm:p-6 h-auto sm:h-96">
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between h-full w-full">
        {/* Product Image - Top on mobile, left on desktop */}
        <div className="flex-1 flex justify-center mb-6 lg:mb-0">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 200, y: -120, rotate: -45 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: 0,
              rotate: 0
            }}
            transition={{ 
              duration: 2.0,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for circular motion
              delay: 0.2
            }}
          >
            {/* Main Product Image - Responsive sizing */}
            <motion.img
              src={product.mainImage}
              alt={product.productName}
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
              animate={{
                y: [0, -15, 0], // Gentle floating animation
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5 // Start floating after slide-in completes
              }}
              key={product.id} // Key ensures smooth image transitions
            />
          </motion.div>
        </div>

        {/* Product Details - Bottom on mobile, right on desktop */}
        <motion.div 
          className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left lg:pr-8"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Business Name */}
          <motion.h2 
            className="text-xs sm:text-sm font-medium text-gray-600 tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {product.businessName}
          </motion.h2>

          {/* Product Name */}
          <div className="space-y-1 sm:space-y-2">
            {/* Split product name and make last part red */}
            {(() => {
              const words = product.productName.split(' ');
              const firstPart = words.slice(0, -2).join(' ');
              const lastPart = words.slice(-2).join(' ');
              
              return (
                <>
                  {/* First part - Most of the name */}
                  <motion.h1
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 uppercase"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 1,
                      ease: "easeOut"
                    }}
                    key={`${product.id}-first`}
                  >
                    {firstPart}
                  </motion.h1>
                  
                  {/* Second part - Last two words in red */}
                  <motion.h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 uppercase"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 1.2,
                      ease: "easeOut"
                    }}
                    key={`${product.id}-last`}
                  >
                    {lastPart}
                  </motion.h1>
                </>
              );
            })()}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 justify-center lg:justify-start">
            {product.tags.map((tag, index) => {
              // Color coding based on tag content
              const getTagColors = (tagText: string) => {
                const tag = tagText.toLowerCase();
                if (tag.includes('stew') || tag.includes('soup')) {
                  return 'bg-orange-200 text-orange-800 border-orange-300 hover:bg-orange-300 hover:text-orange-900 hover:border-orange-400';
                } else if (tag.includes('grill') || tag.includes('roast')) {
                  return 'bg-red-200 text-red-800 border-red-300 hover:bg-red-300 hover:text-red-900 hover:border-red-400';
                } else if (tag.includes('curry') || tag.includes('rice')) {
                  return 'bg-yellow-200 text-yellow-800 border-yellow-300 hover:bg-yellow-300 hover:text-yellow-900 hover:border-yellow-400';
                } else if (tag.includes('fry') || tag.includes('street')) {
                  return 'bg-green-200 text-green-800 border-green-300 hover:bg-green-300 hover:text-green-900 hover:border-green-400';
                } else {
                  return 'bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-300 hover:text-purple-900 hover:border-purple-400';
                }
              };

              return (
                <motion.button
                  key={index}
                  className={`px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide shadow-lg border-2 transition-all duration-300 cursor-pointer transform ${getTagColors(tag)}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.5 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -3,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-32 h-32 bg-pink-200 rounded-full opacity-10"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-yellow-200 rounded-full opacity-10 right-10 top-20"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default ProductObjectGroup;
