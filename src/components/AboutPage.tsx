import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import NavigationMenu from './NavigationMenu';

const AboutPage: React.FC = () => {
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              About Jenny's Spices
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the story behind our premium organic spice blends, crafted with love and tradition.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Jenny's Spices began as a family tradition passed down through generations. 
              Our founder, Jenny, started blending spices in her kitchen over 20 years ago, 
              combining traditional African recipes with modern culinary techniques.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              What started as a passion for creating the perfect spice blend has grown into 
              a trusted brand that brings authentic flavors to kitchens around the world.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we continue to source the finest organic ingredients and craft each 
              blend with the same care and attention to detail that Jenny brought to her 
              original recipes.
            </p>
          </div>
          <div className="relative">
            <img 
              src="/images/image/IMG_20250925_094303_251.jpg" 
              alt="Jenny's kitchen and spice preparation"
              className="w-full h-80 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To bring authentic, organic spice blends to every kitchen, preserving traditional 
              flavors while promoting healthy, natural cooking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Organic</h3>
              <p className="text-gray-600">
                We source only the finest organic ingredients, ensuring purity and quality in every blend.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Traditional Recipes</h3>
              <p className="text-gray-600">
                Our blends are based on time-tested family recipes passed down through generations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Made with Love</h3>
              <p className="text-gray-600">
                Each blend is crafted with care and attention to detail, ensuring the perfect flavor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Behind the Scenes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="/images/image/1000267660-600x600.png" 
                alt="Spice preparation process"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="/images/image/IMG-20241121-WA0019.jpg" 
                alt="Organic spice ingredients"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl shadow-lg md:col-span-2 lg:col-span-1">
              <img 
                src="/images/image/IMG_20250925_094303_251.jpg" 
                alt="Jenny's spice workshop"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality First</h3>
                  <p className="text-gray-600">
                    We never compromise on quality. Every ingredient is carefully selected and tested for purity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Sustainability</h3>
                  <p className="text-gray-600">
                    We work with sustainable farming practices and eco-friendly packaging.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Community</h3>
                  <p className="text-gray-600">
                    We support local farmers and communities where our ingredients are sourced.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    We continuously improve our blends while respecting traditional methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Experience Our Spices?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the authentic flavors that have made Jenny's Spices a household name. 
            Order today and taste the difference quality makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors duration-200 shadow-lg">
              Shop Now
            </button>
            <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-lg">
              Contact Us
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutPage;
