import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, cartMrpTotal, removeFromCart, updateQty, clearCart } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const fmt = (n) => n?.toLocaleString('en-IN');
  const discount = cartMrpTotal - cartTotal;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart size={40} className="text-[#d4a853]/50" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-gray-500 mb-6">Add items to your cart to continue shopping</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors">
          Shop Now <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Shopping Cart ({cartCount} item{cartCount !== 1 ? 's' : ''})</h1>
        <button onClick={clearCart} className="text-xs text-red-500 font-semibold hover:underline cursor-pointer">Clear Cart</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 space-y-3">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 flex gap-4">
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-[#d4a853] transition-colors">{item.name}</Link>
                  <p className="text-xs text-gray-400 mt-0.5">{item.brand}</p>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-base font-bold text-gray-900">₹{fmt(item.price)}</span>
                    {item.mrp > item.price && <span className="text-xs text-gray-400 line-through">₹{fmt(item.mrp)}</span>}
                    {item.discount > 0 && <span className="text-xs font-bold text-green-600">{item.discount}% off</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty <= 1}
                        className="px-2 py-1 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-30"><Minus size={13} /></button>
                      <span className="px-3 py-1 text-xs font-bold border-x border-gray-200 min-w-[28px] text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 hover:bg-gray-100 transition-colors cursor-pointer"><Plus size={13} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors cursor-pointer">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900 flex-shrink-0 hidden sm:block">₹{fmt(item.price * item.qty)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sticky top-20">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Price ({cartCount} item{cartCount !== 1 ? 's' : ''})</span>
                <span>₹{fmt(cartMrpTotal)}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>−₹{fmt(discount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">{cartTotal >= 499 ? 'FREE' : '₹49'}</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>₹{fmt(cartTotal + (cartTotal < 499 ? 49 : 0))}</span>
              </div>
            </div>
            {discount > 0 && (
              <p className="text-xs text-green-600 font-semibold mt-3 bg-green-50 rounded-lg px-3 py-2 text-center">
                You save ₹{fmt(discount)} on this order
              </p>
            )}
            {isAuthenticated ? (
              <Link to="/checkout"
                className="block w-full mt-4 py-3 bg-[#0a1929] text-white rounded-xl text-sm font-bold text-center hover:bg-[#102a43] transition-colors">
                Proceed to Checkout
              </Link>
            ) : (
              <button onClick={() => openAuthModal('login')}
                className="w-full mt-4 py-3 bg-[#0a1929] text-white rounded-xl text-sm font-bold hover:bg-[#102a43] transition-colors cursor-pointer">
                Login to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
