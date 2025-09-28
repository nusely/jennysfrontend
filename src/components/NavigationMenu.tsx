import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'home', label: 'Home', icon: faHome, path: '/' },
    { id: 'about', label: 'About', icon: faUsers, path: '/about' },
    { id: 'contact', label: 'Contact', icon: faWhatsapp, path: '/contact' },
    { id: 'shop', label: 'Shop', icon: faShoppingCart, path: '/shop' }
  ];

  const handleNavigation = (path: string, id: string) => {
    navigate(path);
    onTabChange?.(id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex justify-center space-x-6 lg:space-x-12 py-4 lg:py-6 overflow-x-auto scrollbar-hide">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleNavigation(item.path, item.id)}
            className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all duration-200 ${
              location.pathname === item.path
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
                scale: location.pathname === item.path ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon icon={item.icon} className="text-2xl" />
            </motion.div>
            <motion.span
              className={`text-xs font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-gray-800 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.path, item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-pink-100'
                  : 'hover:bg-gray-50'
              }`}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  scale: location.pathname === item.path ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className={`text-lg ${
                    location.pathname === item.path ? 'text-pink-600' : 'text-gray-600'
                  }`} 
                />
              </motion.div>
              <span
                className={`text-xs font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-pink-600 font-semibold'
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
