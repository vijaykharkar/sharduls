import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="w-24 h-24 bg-navy-500/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-navy-500/30" />
          </div>
          <h2 className="text-2xl font-bold text-navy-500 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 text-sm">Add items to your cart to see them here</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy-500 to-navy-700 text-white rounded-xl font-semibold hover:from-navy-600 hover:to-navy-800 transition-all">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-navy-500 mb-6">Shopping Cart <span className="text-gray-400 text-base font-normal">({cartItems.length} items)</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-soft transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package size={28} className="text-gray-200" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy-500 text-sm truncate">{item.name}</h3>
                <p className="text-gold-400 text-xs font-medium mt-0.5">₹{item.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold text-navy-500 bg-gray-50 min-w-[40px] text-center">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-400 hover:text-red-600 cursor-pointer transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-navy-500">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-20 shadow-soft">
            <h2 className="text-lg font-bold text-navy-500 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-navy-500">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (18% GST)</span>
                <span className="font-semibold text-navy-500">₹{(total * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-navy-500">Total</span>
                  <span className="text-base font-bold text-gold-400">₹{(total * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-5 py-3 bg-gradient-to-r from-navy-500 to-navy-700 text-white rounded-xl font-semibold hover:from-navy-600 hover:to-navy-800 transition-all cursor-pointer flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <div className="flex items-center gap-2 justify-center mt-3 text-gray-400">
              <ShieldCheck size={14} />
              <span className="text-[10px]">Secure checkout powered by Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
