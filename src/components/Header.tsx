import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-6 py-4 sm:py-6">
      {/* Logo - Responsive positioning */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-start sm:justify-center"
      >
        <img 
          src="/jennys-logo.png" 
          alt="Jenny's Spices Logo" 
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
        />
      </motion.div>
    </div>
  );
};

export default Header;
