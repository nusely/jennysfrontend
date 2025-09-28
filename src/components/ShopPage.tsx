import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faFilter, faEye, faHeart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import NavigationMenu from './NavigationMenu';
import CheckoutModal from './CheckoutModal';
import { products } from '../data/products';

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showCheckout, setShowCheckout] = useState(false);

  // Get all unique categories from products
  const categories = ['all', ...Array.from(new Set(products.flatMap(p => p.tags)))];
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.productName.localeCompare(b.productName);
        case 'rating': return b.rating - a.rating;
        case 'price': return 0; // Add price when available
        default: return 0;
      }
    });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const updateCart = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const clearCart = () => {
    setCart({});
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${
            i <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const getTagColors = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('stew') || tagLower.includes('soup')) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    } else if (tagLower.includes('grill') || tagLower.includes('roast')) {
      return 'bg-red-100 text-red-800 border-red-200';
    } else if (tagLower.includes('curry') || tagLower.includes('rice')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else if (tagLower.includes('fry') || tagLower.includes('street')) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

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

      {/* Floating Cart Button */}
      <motion.button
        onClick={() => setShowCheckout(true)}
        className="fixed top-16 sm:top-20 right-4 sm:right-6 z-50 bg-red-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-red-600 transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
        {getTotalCartItems() > 0 && (
          <motion.span
            className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {getTotalCartItems()}
          </motion.span>
        )}
      </motion.button>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Spice Shop
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of organic spices, carefully crafted for the perfect flavor experience.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search spices, flavors, or cooking methods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedCategory === category
                              ? 'bg-red-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {category === 'all' ? 'All Products' : category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="name">Name</option>
                      <option value="rating">Rating</option>
                      <option value="price">Price</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products Grid - Two Column Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Product Image */}
                <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <motion.img
                    src={product.secondaryImage}
                    alt={product.productName}
                    className="w-full h-full object-contain p-3 sm:p-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`text-sm sm:text-lg transition-colors duration-200 ${
                        favorites.has(product.id) ? 'text-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {/* Quick View Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 p-1.5 sm:p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faEye} className="text-gray-600 text-sm sm:text-base" />
                  </motion.button>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <div className="flex space-x-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">({product.rating})</span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 text-center mb-2 sm:mb-3 line-clamp-2">
                    {product.productName}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 justify-center">
                    {product.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getTagColors(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="text-center mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl font-bold text-red-600">GHS {product.price.toFixed(2)}</span>
                    <p className="text-xs sm:text-sm text-gray-500">{product.weight}</p>
                  </div>

                  {/* Add to Cart Section */}
                  <div className="space-y-2 sm:space-y-3">
                    {cart[product.id] ? (
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(product.id);
                          }}
                          className="p-1.5 sm:p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faMinus} className="text-xs sm:text-sm" />
                        </button>
                        <span className="text-sm sm:text-lg font-semibold">{cart[product.id]}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                          className="p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-xs sm:text-sm" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                        className="w-full bg-red-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-medium hover:bg-red-600 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="text-sm sm:text-base" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        products={products}
        onUpdateCart={updateCart}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
      />

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

export default ShopPage;
