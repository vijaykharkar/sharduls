import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Plus, Trash2, Edit3, Check, ShoppingCart, Loader2, CheckCircle,
  ChevronRight, Smartphone, CreditCard, Building2, Banknote, ArrowLeft, Shield,
  Package, Truck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCart from '../hooks/useCart';
import useAddress from '../hooks/useAddress';
import usePayment from '../hooks/usePayment';
import { useAuth } from '@shared/context/AuthContext';
import { useToast } from '@shared/context/ToastContext';
import AddressForm from '../components/address/AddressForm';

const PAYMENT_METHODS = [
  {
    id: 'upi',
    label: 'UPI',
    sub: 'Google Pay, PhonePe, Paytm, BHIM & more',
    icon: Smartphone,
    rzpMethod: 'upi',
    badge: 'Instant',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    sub: 'Visa, Mastercard, RuPay, Amex',
    icon: CreditCard,
    rzpMethod: 'card',
    badge: null,
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    sub: 'All major Indian banks supported',
    icon: Building2,
    rzpMethod: 'netbanking',
    badge: null,
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    sub: 'Pay when you receive your order',
    icon: Banknote,
    rzpMethod: null,
    badge: 'No extra charge',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
];

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartMrpTotal, cartCount, clearCart } = useCart();
  const { addresses, selectedAddressId, selectAddress, addAddress, updateAddress, removeAddress } = useAddress();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { initiateOnlinePayment, initiateCOD, loading: payLoading, error: payError } = usePayment();

  const [step, setStep]             = useState(1);
  const [showForm, setShowForm]     = useState(false);
  const [editAddr, setEditAddr]     = useState(null);
  const [selectedMethod, setMethod] = useState('upi');
  const [paidOrderData, setPaid]    = useState(null);
  const [upiId, setUpiId]           = useState('');
  const [selectedBank, setBank]     = useState(null);

  const fmt          = (n) => (n ?? 0).toLocaleString('en-IN');
  const discount     = cartMrpTotal - cartTotal;
  const deliveryFee  = cartTotal >= 499 ? 0 : 49;
  const orderTotal   = cartTotal + deliveryFee;

  const selectedAddr = addresses.find((a) => a.id === selectedAddressId);

  const buildShipping = (a) => ({
    label:         a.label         || 'Delivery',
    address_line1: a.address_line1,
    address_line2: a.address_line2 || '',
    city:          a.city,
    state:         a.state,
    pincode:       a.pincode,
    country:       a.country       || 'India',
    phone:         a.phone         || '',
  });

  const handleSave = async (form) => {
    try {
      if (editAddr) {
        await updateAddress({ ...form, id: editAddr.id });
      } else {
        const newAddr = await addAddress(form);
        if (newAddr?.id) selectAddress(newAddr.id);
      }
      setShowForm(false);
      setEditAddr(null);
    } catch { /* errors toasted inside useAddress */ }
  };

  const proceedToPayment = () => {
    if (!selectedAddressId) { addToast('Please select a delivery address', 'error'); return; }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePay = () => {
    if (!selectedAddr) { addToast('Address missing', 'error'); return; }
    const shipping = buildShipping(selectedAddr);
    const method   = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

    if (selectedMethod === 'cod') {
      initiateCOD({
        cartItems,
        shippingAddress: shipping,
        onSuccess: (data) => { clearCart(); setPaid(data); setStep(3); },
        onError: (msg) => addToast(msg || 'Order failed', 'error'),
      });
    } else {
      const prefillData = {};
      if (selectedMethod === 'upi' && upiId.trim()) prefillData.vpa = upiId.trim();
      if (selectedMethod === 'netbanking' && selectedBank && selectedBank !== 'OTHER') prefillData.bank = selectedBank;
      initiateOnlinePayment({
        cartItems,
        shippingAddress: shipping,
        user,
        rzpMethod: method?.rzpMethod,
        prefillData,
        onSuccess: (data) => { clearCart(); setPaid(data); setStep(3); },
        onError: (msg) => addToast(msg || 'Payment failed', 'error'),
      });
    }
  };

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={40} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Nothing to checkout</h2>
        <Link to="/buyer/products" className="text-sm text-[#d4a853] font-semibold hover:underline">Browse Products</Link>
      </div>
    );
  }

  /* ── Success Screen ──────────────────────────────────────────────────── */
  if (step === 3 && paidOrderData) {
    const isCOD = paidOrderData.payment_method === 'cod';
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto px-4 py-16 text-center"
      >
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isCOD ? 'bg-blue-50' : 'bg-green-50'}`}>
          {isCOD
            ? <Package size={44} className="text-blue-500" />
            : <CheckCircle size={44} className="text-green-500" />}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {isCOD ? 'Order Placed!' : 'Payment Successful!'}
        </h2>
        <p className="text-sm text-gray-500 mb-1">
          Order <span className="font-semibold text-gray-700">{paidOrderData.order_number}</span>
        </p>
        {isCOD
          ? <p className="text-sm text-blue-600 font-medium mb-1">Pay ₹{fmt(paidOrderData.amount / 100)} when your order arrives.</p>
          : <p className="text-sm text-green-600 font-medium mb-1">Payment of ₹{fmt((paidOrderData.amount ?? orderTotal * 100) / 100)} confirmed.</p>}
        <p className="text-xs text-gray-400 mb-8">A confirmation will be sent to {user?.email}.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/buyer/orders')}
            className="px-6 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors cursor-pointer"
          >
            View Orders
          </button>
          <Link to="/buyer/products" className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:border-gray-300 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    );
  }

  /* ── Step Breadcrumb ─────────────────────────────────────────────────── */
  const StepBar = () => (
    <div className="flex items-center gap-2 mb-6 text-xs">
      {['Delivery Address', 'Payment', 'Confirmation'].map((s, i) => {
        const n = i + 1;
        const active = step === n;
        const done   = step > n;
        return (
          <React.Fragment key={s}>
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px]
                ${done ? 'bg-green-500 text-white' : active ? 'bg-[#0a1929] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {done ? <Check size={12} /> : n}
              </div>
              <span className={`font-semibold ${active ? 'text-[#0a1929]' : done ? 'text-green-600' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < 2 && <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />}
          </React.Fragment>
        );
      })}
    </div>
  );

  /* ── Order Summary Panel (reused on both steps) ───────────────────────── */
  const OrderSummary = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Order Summary</h3>
      <div className="space-y-3 text-sm mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-[10px] text-gray-400">Qty: {item.qty}</p>
            </div>
            <p className="text-xs font-bold text-gray-900 flex-shrink-0">₹{fmt(item.price * item.qty)}</p>
          </div>
        ))}
      </div>
      <hr className="border-gray-100 mb-3" />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>MRP ({cartCount} items)</span><span>₹{fmt(cartMrpTotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span><span>−₹{fmt(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-500">
          <span>Delivery</span>
          <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </span>
        </div>
        <hr className="border-gray-100" />
        <div className="flex justify-between text-base font-bold text-gray-900">
          <span>Total</span><span>₹{fmt(orderTotal)}</span>
        </div>
      </div>
      {deliveryFee === 0 && (
        <div className="mt-3 bg-green-50 rounded-xl px-3 py-2 flex items-center gap-2">
          <Truck size={14} className="text-green-600" />
          <span className="text-[11px] text-green-700 font-medium">Free delivery on this order!</span>
        </div>
      )}
    </div>
  );

  /* ── Step 1: Address ──────────────────────────────────────────────────── */
  if (step === 1) return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <StepBar />
      {payError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{payError}</div>
      )}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <MapPin size={15} className="text-[#d4a853]" /> Select Delivery Address
            </h2>
            <button onClick={() => { setEditAddr(null); setShowForm(true); }}
              className="flex items-center gap-1 text-xs text-[#d4a853] font-semibold cursor-pointer hover:underline">
              <Plus size={13} /> Add New
            </button>
          </div>

          {showForm && (
            <AddressForm initial={editAddr} onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditAddr(null); }} />
          )}

          {addresses.length === 0 && !showForm && (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 p-8 text-center">
              <MapPin size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-medium text-gray-600 mb-1">No saved addresses</p>
              <p className="text-xs text-gray-400 mb-4">Add a delivery address to continue</p>
              <button onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-1.5 text-xs bg-[#0a1929] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-[#102a43] transition-colors">
                <Plus size={12} /> Add Address
              </button>
            </div>
          )}

          <div className="space-y-2">
            {addresses.map((addr) => (
              <motion.div key={addr.id} layout onClick={() => selectAddress(addr.id)}
                className={`relative bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all
                  ${selectedAddressId === addr.id ? 'border-[#d4a853] bg-amber-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                    ${selectedAddressId === addr.id ? 'border-[#d4a853] bg-[#d4a853]' : 'border-gray-300'}`}>
                    {selectedAddressId === addr.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-bold text-gray-800">{addr.label || 'Address'}</p>
                    </div>
                    <p className="text-xs text-gray-600">{addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ''}</p>
                    <p className="text-xs text-gray-500">{addr.city}, {addr.state} – {addr.pincode}</p>
                    {addr.phone && <p className="text-xs text-gray-400 mt-0.5">📞 {addr.phone}</p>}
                  </div>
                </div>
                <div className="flex gap-3 mt-2 pl-7">
                  <button onClick={(e) => { e.stopPropagation(); setEditAddr(addr); setShowForm(true); }}
                    className="text-[10px] text-[#d4a853] font-semibold flex items-center gap-0.5 cursor-pointer hover:underline">
                    <Edit3 size={10} /> Edit
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); removeAddress(addr.id); }}
                    className="text-[10px] text-red-500 font-semibold flex items-center gap-0.5 cursor-pointer hover:underline">
                    <Trash2 size={10} /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-2">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Package size={14} className="text-gray-400" /> Order Items ({cartCount})
            </h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3">
                  <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-900">₹{fmt(item.price * item.qty)}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={proceedToPayment}
            disabled={!selectedAddressId || addresses.length === 0}
            className="w-full mt-4 py-3.5 bg-[#f0c040] hover:bg-[#e6b830] text-[#0a1929] font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Payment <ChevronRight size={16} />
          </button>
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <OrderSummary />
        </div>
      </div>
    </div>
  );

  /* ── Step 2: Payment Method ───────────────────────────────────────────── */
  const BANKS = [
    { name: 'HDFC Bank',      code: 'HDFC',  bg: 'bg-red-50',    text: 'text-red-700' },
    { name: 'State Bank',     code: 'SBIN',  bg: 'bg-blue-50',   text: 'text-blue-700' },
    { name: 'ICICI Bank',     code: 'ICIC',  bg: 'bg-orange-50', text: 'text-orange-700' },
    { name: 'Axis Bank',      code: 'UTIB',  bg: 'bg-purple-50', text: 'text-purple-700' },
    { name: 'Kotak Bank',     code: 'KKBK',  bg: 'bg-red-50',    text: 'text-red-700' },
    { name: 'PNB',            code: 'PUNB',  bg: 'bg-indigo-50', text: 'text-indigo-700' },
    { name: 'Bank of Baroda', code: 'BARB',  bg: 'bg-amber-50',  text: 'text-amber-700' },
    { name: 'Yes Bank',       code: 'YESB',  bg: 'bg-sky-50',    text: 'text-sky-700' },
    { name: 'Other Banks',    code: 'OTHER', bg: 'bg-gray-50',   text: 'text-gray-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <StepBar />
      {payError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{payError}</div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {/* Delivery summary bar */}
          {selectedAddr && (
            <div className="flex items-start justify-between bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-5">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-blue-800 mb-0.5">Delivering to: {selectedAddr.label || 'Address'}</p>
                  <p className="text-xs text-blue-600">{selectedAddr.address_line1}, {selectedAddr.city}, {selectedAddr.state} – {selectedAddr.pincode}</p>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline ml-2 flex-shrink-0">Change</button>
            </div>
          )}

          {/* Two-column: method list + detail panel */}
          <div className="flex flex-col md:flex-row gap-4">

            {/* Left: method list */}
            <div className="md:w-52 flex-shrink-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Payment Options</p>
              <div className="space-y-1.5">
                {PAYMENT_METHODS.map((m) => {
                  const Icon = m.icon;
                  const sel  = selectedMethod === m.id;
                  return (
                    <button key={m.id} onClick={() => setMethod(m.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-left transition-all cursor-pointer
                        ${sel ? 'bg-[#0a1929] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                      <Icon size={14} className={sel ? 'text-[#d4a853]' : 'text-gray-400'} />
                      <span className="text-xs font-semibold flex-1">{m.label}</span>
                      {sel && <ChevronRight size={13} className="text-[#d4a853]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: detail panel */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">

                  {/* ── UPI ── */}
                  {selectedMethod === 'upi' && (
                    <motion.div key="upi" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} className="p-5">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                          <Smartphone size={18} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-800">Pay via UPI</h3>
                          <p className="text-[10px] text-gray-400">Instant · Zero extra charges</p>
                        </div>
                      </div>

                      <label className="text-xs font-semibold text-gray-600 block mb-1.5">Enter UPI ID</label>
                      <input
                        type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi  or  phone@okaxis"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/10 transition mb-1"
                      />
                      <p className="text-[10px] text-gray-400 mb-5">e.g., 9876543210@ybl · name@oksbi · name@okhdfcbank</p>

                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Supported Apps</p>
                      <div className="grid grid-cols-4 gap-2">
                        {[['🟢','Google Pay'],['💜','PhonePe'],['💙','Paytm'],['🟠','BHIM']].map(([e, n]) => (
                          <div key={n} className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center">
                            <p className="text-xl mb-0.5">{e}</p>
                            <p className="text-[9px] font-bold text-gray-600 truncate">{n}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Card ── */}
                  {selectedMethod === 'card' && (
                    <motion.div key="card" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} className="p-5">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                          <CreditCard size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-800">Credit / Debit Card</h3>
                          <p className="text-[10px] text-gray-400">Secure · All major cards accepted</p>
                        </div>
                      </div>

                      {/* Card visual */}
                      <div className="bg-gradient-to-br from-[#0a1929] via-[#163354] to-[#0c2340] rounded-2xl p-5 mb-5 shadow-lg select-none">
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-9 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md shadow-sm" />
                          <div className="flex">
                            <div className="w-7 h-7 bg-red-500 rounded-full opacity-90" />
                            <div className="w-7 h-7 bg-yellow-400 rounded-full opacity-90 -ml-3" />
                          </div>
                        </div>
                        <p className="text-base tracking-[0.3em] font-mono text-white/70 mb-5">•••• •••• •••• ••••</p>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[8px] text-white/40 uppercase mb-0.5">Card Holder</p>
                            <p className="text-xs font-bold text-white">Your Name</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-white/40 uppercase mb-0.5">Expires</p>
                            <p className="text-xs font-bold text-white">MM / YY</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-start gap-2 mb-4">
                        <Shield size={13} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-green-700">Card details are entered securely via Razorpay's PCI-DSS compliant checkout. We never store your card information.</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="text-[10px] text-gray-400">Accepted:</p>
                        {['VISA','Mastercard','RuPay','AMEX'].map((c) => (
                          <span key={c} className="text-[9px] font-bold border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">{c}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Net Banking ── */}
                  {selectedMethod === 'netbanking' && (
                    <motion.div key="nb" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} className="p-5">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                          <Building2 size={18} className="text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-800">Net Banking</h3>
                          <p className="text-[10px] text-gray-400">Select your bank to continue</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {BANKS.map((bank) => (
                          <button key={bank.code} onClick={() => setBank(bank.code)}
                            className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all
                              ${selectedBank === bank.code
                                ? 'border-[#d4a853] bg-amber-50'
                                : `border-gray-200 ${bank.bg} hover:border-gray-300`}`}>
                            <p className={`text-[10px] font-bold leading-tight ${selectedBank === bank.code ? 'text-amber-700' : bank.text}`}>
                              {bank.name}
                            </p>
                          </button>
                        ))}
                      </div>

                      {!selectedBank && (
                        <p className="text-[11px] text-orange-500 mt-3 font-medium">⚠ Select your bank to continue</p>
                      )}
                      {selectedBank && (
                        <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 text-xs text-indigo-700 font-medium">
                          ✓ {BANKS.find((b) => b.code === selectedBank)?.name} selected — you'll be redirected to your bank's secure portal.
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* ── COD ── */}
                  {selectedMethod === 'cod' && (
                    <motion.div key="cod" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} className="p-5">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                          <Banknote size={18} className="text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-800">Cash on Delivery</h3>
                          <p className="text-[10px] text-gray-400">Pay when your order arrives</p>
                        </div>
                      </div>

                      {selectedAddr && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Delivery Address</p>
                          <p className="text-xs font-semibold text-gray-800">{selectedAddr.label || 'Address'}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{selectedAddr.address_line1}{selectedAddr.address_line2 ? `, ${selectedAddr.address_line2}` : ''}</p>
                          <p className="text-xs text-gray-500">{selectedAddr.city}, {selectedAddr.state} – {selectedAddr.pincode}</p>
                          {selectedAddr.phone && <p className="text-xs text-gray-400 mt-1">📞 {selectedAddr.phone}</p>}
                        </div>
                      )}

                      <div className="bg-[#0a1929] rounded-xl px-5 py-4 mb-5 flex items-center justify-between">
                        <p className="text-xs text-white/60">Amount to pay on delivery</p>
                        <p className="text-xl font-bold text-[#d4a853]">₹{fmt(orderTotal)}</p>
                      </div>

                      <div className="space-y-2.5">
                        {['✅ No extra COD charges','✅ Pay only when order arrives','✅ Keep exact change ready','✅ Easy returns if not satisfied'].map((t) => (
                          <p key={t} className="text-xs text-gray-600">{t}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Sticky action row inside panel */}
              <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold cursor-pointer hover:border-gray-400 transition-colors">
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button
                    onClick={handlePay}
                    disabled={payLoading || (selectedMethod === 'netbanking' && !selectedBank)}
                    className="flex-1 py-2.5 bg-[#0a1929] hover:bg-[#102a43] text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {payLoading
                      ? <><Loader2 size={15} className="animate-spin" /> Processing…</>
                      : selectedMethod === 'cod'
                        ? <><Package size={15} /> Confirm Order (COD)</>
                        : <><Shield size={15} /> Pay ₹{fmt(orderTotal)} Securely</>}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <Shield size={11} className="text-green-500" />
                  <p className="text-[10px] text-gray-400">100% secure · SSL encrypted · Powered by Razorpay</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
