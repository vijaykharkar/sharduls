import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Plus, Trash2, Edit3, Check, ShoppingCart, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useCart from '../hooks/useCart';
import useAddress from '../hooks/useAddress';
import usePayment from '../hooks/usePayment';
import { useAuth } from '@shared/context/AuthContext';
import { useToast } from '@shared/context/ToastContext';
import AddressForm from '../components/address/AddressForm';
import RazorpayButton from '../components/payment/RazorpayButton';

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartMrpTotal, cartCount, clearCart } = useCart();
  const { addresses, selectedAddressId, selectAddress, addAddress, updateAddress, removeAddress } = useAddress();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { initiateCheckout, loading: payLoading, orderData, success, error: payError, reset } = usePayment();

  const [showForm, setShowForm] = useState(false);
  const [editAddr, setEditAddr] = useState(null);
  const [paidOrderData, setPaidOrderData] = useState(null);

  const fmt = (n) => n?.toLocaleString('en-IN');
  const discount = cartMrpTotal - cartTotal;
  const deliveryCharge = cartTotal >= 499 ? 0 : 49;
  const orderTotal = cartTotal + deliveryCharge;

  if (cartItems.length === 0 && !success && !paidOrderData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={40} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Nothing to checkout</h2>
        <Link to="/buyer/products" className="text-sm text-[#d4a853] font-semibold hover:underline">Browse Products</Link>
      </div>
    );
  }

  if (success && paidOrderData) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-sm text-gray-500 mb-1">
          Order <span className="font-semibold text-gray-700">{paidOrderData.order_number}</span> has been placed.
        </p>
        <p className="text-xs text-gray-400 mb-6">You will receive a confirmation shortly.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/buyer/orders')}
            className="px-6 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors cursor-pointer"
          >
            View Orders
          </button>
          <Link
            to="/buyer/products"
            className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:border-gray-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = (form) => {
    if (editAddr) {
      updateAddress({ ...form, id: editAddr.id });
    } else {
      const newAddr = addAddress(form);
      selectAddress(newAddr.id);
    }
    setShowForm(false);
    setEditAddr(null);
  };

  const handlePayNow = () => {
    if (!selectedAddressId) {
      addToast('Please select a delivery address', 'error');
      return;
    }
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!selectedAddress) {
      addToast('Selected address not found', 'error');
      return;
    }

    initiateCheckout({
      cartItems,
      shippingAddress: {
        label:         selectedAddress.label       || 'Delivery',
        address_line1: selectedAddress.address_line1,
        address_line2: selectedAddress.address_line2 || '',
        city:          selectedAddress.city,
        state:         selectedAddress.state,
        pincode:       selectedAddress.pincode,
        country:       selectedAddress.country      || 'India',
        phone:         selectedAddress.phone        || '',
      },
      user,
      onSuccess: (verifiedData) => {
        clearCart();
        setPaidOrderData(verifiedData);
      },
      onError: (msg) => {
        addToast(msg || 'Payment failed. Please try again.', 'error');
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Checkout</h1>

      {payError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
          {payError}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <MapPin size={15} className="text-[#d4a853]" /> Delivery Address
            </h2>
            <button
              onClick={() => { setEditAddr(null); setShowForm(true); }}
              className="flex items-center gap-1 text-xs text-[#d4a853] font-semibold cursor-pointer hover:underline"
            >
              <Plus size={13} /> Add New
            </button>
          </div>

          {showForm && (
            <AddressForm
              initial={editAddr}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditAddr(null); }}
            />
          )}

          {addresses.length === 0 && !showForm && (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center">
              <MapPin size={28} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No saved addresses</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-3 text-xs text-[#d4a853] font-semibold cursor-pointer hover:underline"
              >
                Add Address
              </button>
            </div>
          )}

          <div className="space-y-2">
            {addresses.map((addr) => (
              <motion.div
                key={addr.id}
                layout
                onClick={() => selectAddress(addr.id)}
                className={`relative bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all
                  ${selectedAddressId === addr.id ? 'border-[#d4a853] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
              >
                {selectedAddressId === addr.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-[#d4a853] rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <p className="text-xs font-bold text-gray-800 mb-0.5">{addr.label || 'Address'}</p>
                <p className="text-xs text-gray-600">
                  {addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ''}
                </p>
                <p className="text-xs text-gray-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                {addr.phone && <p className="text-xs text-gray-400 mt-1">Phone: {addr.phone}</p>}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditAddr(addr); setShowForm(true); }}
                    className="text-[10px] text-[#d4a853] font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
                  >
                    <Edit3 size={10} /> Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeAddress(addr.id); }}
                    className="text-[10px] text-red-500 font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
                  >
                    <Trash2 size={10} /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Order Items ({cartCount})</h2>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3">
                  <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-900">₹{fmt(item.price * item.qty)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sticky top-20">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cartCount})</span><span>₹{fmt(cartMrpTotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span><span>−₹{fmt(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span><span>₹{fmt(orderTotal)}</span>
              </div>
            </div>

            <div className="mt-4">
              <RazorpayButton
                onClick={handlePayNow}
                loading={payLoading}
                disabled={payLoading || addresses.length === 0}
                totalAmount={orderTotal * 100}
              />
            </div>

            {orderData && (
              <div className="mt-3 bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Order Number</p>
                <p className="text-sm font-bold text-gray-800">{orderData.order_number}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
