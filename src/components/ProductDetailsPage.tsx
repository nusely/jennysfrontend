import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart, faHeart, faPlus, faMinus, faShare, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import Header from './Header';
import NavigationMenu from './NavigationMenu';

const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<'main' | 'secondary'>('secondary');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Find the product by ID
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 pb-20 sm:pb-0 overflow-x-hidden">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <button
              onClick={() => navigate('/shop')}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors duration-200"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-2xl ${
            i <= rating ? 'text-yellow-500 drop-shadow-sm' : 'text-gray-300'
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

  const addToCart = () => {
    // This would integrate with your cart system
    console.log(`Added ${quantity} of ${product.productName} to cart`);
    // You can add cart integration here
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.productName,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
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

      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/shop')}
        className="fixed top-20 left-4 sm:left-6 z-40 bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
      </motion.button>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              <motion.img
                src={selectedImage === 'main' ? product.mainImage : product.secondaryImage}
                alt={product.productName}
                className="w-full h-96 sm:h-[500px] object-contain cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowImageModal(true)}
                transition={{ duration: 0.3 }}
              />
              
              {/* Image Zoom Button */}
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faEye} className="text-gray-600" />
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedImage('main')}
                className={`flex-1 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === 'main' 
                    ? 'border-red-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={product.mainImage}
                  alt="Main view"
                  className="w-full h-full object-contain"
                />
              </button>
              <button
                onClick={() => setSelectedImage('secondary')}
                className={`flex-1 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === 'secondary' 
                    ? 'border-red-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={product.secondaryImage}
                  alt="Secondary view"
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Business Name */}
            <p className="text-sm font-medium text-gray-600 tracking-wider uppercase">
              {product.businessName}
            </p>

            {/* Product Name */}
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 uppercase">
              {product.productName}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm sm:text-lg font-semibold text-gray-700">({product.rating})</span>
            </div>

            {/* Price */}
            <div className="text-xl sm:text-3xl font-bold text-red-600">
              GHS {product.price.toFixed(2)}
              <span className="text-xs sm:text-sm text-gray-500 ml-2">({product.weight})</span>
            </div>

            {/* Description */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Description</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Perfect For</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${getTagColors(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Quantity</h3>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 sm:p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faMinus} className="text-sm sm:text-base" />
                </button>
                <span className="text-lg sm:text-2xl font-bold w-8 sm:w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-sm sm:text-base" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-red-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center space-x-2 sm:space-x-3"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="text-sm sm:text-base" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                    isFavorite 
                      ? 'bg-red-50 border-red-500 text-red-500' 
                      : 'bg-white border-gray-300 text-gray-600 hover:border-red-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-lg sm:text-xl" />
                </button>
                
                <button
                  onClick={shareProduct}
                  className="p-3 sm:p-4 bg-white border-2 border-gray-300 rounded-xl text-gray-600 hover:border-red-300 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faShare} className="text-lg sm:text-xl" />
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Product Features</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>100% Organic Ingredients</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Traditional Recipe</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Premium Quality</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Authentic Flavor</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage === 'main' ? product.mainImage : product.secondaryImage}
                alt={product.productName}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailsPage;
