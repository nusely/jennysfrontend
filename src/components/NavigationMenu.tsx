import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

interface NavigationMenuProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  activeTab = 'home', 
  onTabChange 
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: faHome },
    { id: 'about', label: 'About', icon: faUsers },
    { id: 'contact', label: 'Contact', icon: faWhatsapp },
    { id: 'shop', label: 'Shop', icon: faShoppingCart }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center space-x-6 sm:space-x-12 py-4 sm:py-6 overflow-x-auto scrollbar-hide">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-pink-100 shadow-md'
                : 'hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                scale: activeTab === item.id ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon icon={item.icon} className="text-2xl" />
            </motion.div>
            <motion.span
              className={`text-xs font-medium transition-colors duration-200 ${
                activeTab === item.id
                  ? 'text-gray-800 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;
