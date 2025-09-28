import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import NavigationMenu from './NavigationMenu';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 pb-20 sm:pb-0 overflow-x-hidden">
      {/* Header */}
      <Header />
      
      {/* Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <NavigationMenu />
      </motion.div>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-lg text-gray-600 mb-8">
              Get in touch with us for orders, questions, or feedback!
            </p>
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl">📱</span>
                <span className="text-lg text-gray-700">WhatsApp: +1234567890</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl">📧</span>
                <span className="text-lg text-gray-700">Email: info@jennysspices.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ContactPage;
