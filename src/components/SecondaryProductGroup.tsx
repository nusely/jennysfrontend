import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEye } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../data/products';

interface SecondaryProductGroupProps {
  product: Product;
}

const SecondaryProductGroup: React.FC<SecondaryProductGroupProps> = ({ product }) => {
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

  const getRatingCardColor = (arcColor: string) => {
    switch (arcColor) {
      case 'spice-pink':
        return 'bg-pink-300';
      case 'spice-red':
        return 'bg-red-300';
      case 'spice-yellow':
        return 'bg-yellow-300';
      case 'spice-purple':
        return 'bg-purple-300';
      case 'spice-green':
        return 'bg-green-300';
      case 'spice-orange':
        return 'bg-orange-300';
      default:
        return 'bg-pink-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-300 w-full max-w-sm h-[600px] flex flex-col ring-1 ring-gray-100">
      {/* Secondary Product Image - Takes up 50% of card */}
      <div className="relative h-80 bg-gray-50 rounded-t-2xl flex items-center justify-center overflow-hidden">
        {/* Secondary Product Image - Much larger without container */}
        <img 
          src={product.secondaryImage}
          alt={product.productName}
          className="w-72 h-72 object-contain"
        />
      </div>

      {/* Content Section - Stretched to fill remaining space */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Star Rating */}
        <div className="flex justify-center mb-4 space-x-1">
          {renderStars(product.rating)}
        </div>

        {/* Product Name */}
        <h4 className="text-lg font-bold text-gray-800 text-center mb-3 uppercase tracking-wide">
          {product.productName}
        </h4>

            {/* Product Description */}
            <p className="text-gray-800 text-sm text-left mb-6 leading-relaxed">
              {product.description}
            </p>

        {/* Action Buttons - Pushed to bottom */}
        <div className="mt-auto">
          <div className="flex space-x-3">
            {/* Order Now Button */}
            <button className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors duration-200 shadow-sm">
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
              <span>Order Now</span>
            </button>
            
            {/* View Button */}
            <button className="bg-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors duration-200 shadow-sm">
              <FontAwesomeIcon icon={faEye} className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryProductGroup;
