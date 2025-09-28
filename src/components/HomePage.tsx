import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import ProductObjectGroup from './ProductObjectGroup';
import ProductCarouselGroup from './ProductCarouselGroup';
import SecondaryProductGroup from './SecondaryProductGroup';
import NavigationMenu from './NavigationMenu';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const currentProduct = products[selectedIndex];

  return (
    <div className="min-h-screen bg-gray-100 pb-20 sm:pb-0 overflow-x-hidden">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-start justify-between px-4 sm:px-6 py-2 max-w-7xl mx-auto min-h-screen">
        {/* Left Column */}
        <div className="flex-1 lg:pr-8 space-y-4 lg:space-y-6 w-full">
          {/* Product Object Group */}
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductObjectGroup product={currentProduct} />
          </motion.div>

              {/* Product Carousel Group */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
              <ProductCarouselGroup
                products={products}
                selectedIndex={selectedIndex}
                onProductSelect={handleProductSelect}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </motion.div>

            {/* Navigation Menu - Back at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="-mt-6"
            >
              <NavigationMenu 
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </motion.div>

        </div>

            {/* Right Column - Secondary Product Group - Responsive */}
            <motion.div
              className="lg:w-80 w-full mt-8 lg:mt-0 lg:sticky lg:top-8 h-full flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex-1 flex flex-col">
                <SecondaryProductGroup product={currentProduct} />
                {/* Spacer to push content to fill height */}
                <div className="flex-1"></div>
              </div>
            </motion.div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-pink-100 rounded-full opacity-10"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-yellow-100 rounded-full opacity-10 right-20 top-40"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-purple-100 rounded-full opacity-10 bottom-20 left-1/4"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;