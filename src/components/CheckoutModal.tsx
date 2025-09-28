import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faCheck, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Product } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: {[key: string]: number};
  products: Product[];
  onUpdateCart: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  onUpdateCart,
  onRemoveFromCart,
  onClearCart
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryNote: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  // Calculate totals
  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    return product ? { ...product, quantity } : null;
  }).filter(Boolean) as (Product & { quantity: number })[];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 100 ? 0 : 15; // Free delivery over GHS 100
  const total = subtotal + deliveryFee;

  const formatPrice = (price: number) => {
    return `GHS ${price.toFixed(2)}`;
  };

  const generateWhatsAppMessage = () => {
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Accra',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let message = `🛒 *NEW ORDER - Jenny's Organic Spices* 🛒\n\n`;
    message += `📋 *Order Number:* ${orderNumber}\n`;
    message += `📅 *Date & Time:* ${timestamp}\n\n`;
    
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Address: ${customerInfo.address}\n`;
    if (customerInfo.deliveryNote) {
      message += `Delivery Note: ${customerInfo.deliveryNote}\n`;
    }
    message += `\n🛍️ *Order Items:*\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.productName}*\n`;
      message += `   Quantity: ${item.quantity}x (${item.weight})\n`;
      message += `   Price: ${formatPrice(item.price)} each\n`;
      message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    message += `💰 *Order Summary:*\n`;
    message += `Subtotal: ${formatPrice(subtotal)}\n`;
    message += `Delivery Fee: ${deliveryFee > 0 ? formatPrice(deliveryFee) : 'FREE'}\n`;
    message += `*TOTAL: ${formatPrice(total)}*\n\n`;
    message += `📱 *Order placed via Jenny's Spices Website*\n`;
    message += `Thank you for choosing Jenny's Organic Spices! 🌶️✨`;

    return message;
  };

  const handleSubmitOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const message = generateWhatsAppMessage();
      const whatsappNumber = '233553018172';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success state
      setOrderSent(true);
      
      // Clear cart and reset form after 3 seconds
      setTimeout(() => {
        setOrderSent(false);
        setCustomerInfo({ name: '', phone: '', address: '', deliveryNote: '' });
        onClearCart(); // Clear the cart
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error sending order:', error);
      alert('Error sending order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
                <div>
                  <h2 className="text-2xl font-bold">Checkout</h2>
                  <p className="text-red-100">Complete your order</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Order Items */}
            <div className="lg:w-1/2 p-4 lg:p-6 overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4"
                  >
                    <img
                      src={item.mainImage}
                      alt={item.productName}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.productName}</h4>
                      <p className="text-sm text-gray-600">{item.weight}</p>
                      <p className="text-lg font-bold text-red-600">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateCart(item.id, item.quantity - 1)}
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faMinus} className="text-sm" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateCart(item.id, item.quantity + 1)}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Customer Info & Summary */}
            <div className="lg:w-1/2 p-4 lg:p-6 border-l border-gray-200 overflow-y-auto flex flex-col">
              {!orderSent ? (
                <>
                  {/* Customer Information */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Address *
                      </label>
                      <textarea
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        rows={3}
                        placeholder="Enter your delivery address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Note (Optional)
                      </label>
                      <textarea
                        value={customerInfo.deliveryNote}
                        onChange={(e) => setCustomerInfo({...customerInfo, deliveryNote: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        rows={2}
                        placeholder="Any special delivery instructions?"
                      />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'FREE'}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-red-600">{formatPrice(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || cartItems.length === 0}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-bold text-base hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-3 mt-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                        <span>Send Order via WhatsApp</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <FontAwesomeIcon icon={faCheck} className="text-3xl text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Sent Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Your order has been sent to WhatsApp. We'll contact you shortly to confirm your order.
                  </p>
                  <div className="bg-green-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-green-800">
                      📱 Check your WhatsApp for order confirmation
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      🛒 Your cart has been cleared and is ready for your next order
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
