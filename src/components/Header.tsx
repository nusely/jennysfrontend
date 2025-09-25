import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <div className="w-full px-6 py-6">
      {/* Logo - Bigger and positioned closer to content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <img 
          src="/jennys-logo.png" 
          alt="Jenny's Spices Logo" 
          className="w-24 h-24 object-contain"
        />
      </motion.div>
    </div>
  );
};

export default Header;
