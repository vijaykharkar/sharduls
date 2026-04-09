import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Search, ShoppingCart, User, Menu, X, MapPin, Truck, ChevronDown,
  LogOut, Package, Heart
} from 'lucide-react';
import LoginModal from '../auth/LoginModal';
import { logoutUser } from '../../store/slices/authSlice';

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = async () => {
    setProfileOpen(false);
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <>
      {/* ═══ Main Header ═══ */}
      <header className="bg-gradient-to-r from-navy-500 to-navy-700 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center gap-4">
            {/* Mobile menu */}
            <button onClick={() => setMobileMenu(true)} className="lg:hidden p-2 text-white/80 hover:text-white cursor-pointer">
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm leading-tight">SHARDUL-GE</p>
                <p className="text-gold-400 text-[8px] tracking-widest">MARKETPLACE</p>
              </div>
            </Link>

            {/* Location */}
            <button className="hidden md:flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors flex-shrink-0">
              <MapPin size={14} className="text-gold-400" />
              <div className="text-left">
                <p className="text-[9px] text-white/50">Delivery to</p>
                <p className="font-semibold">Select Location</p>
              </div>
            </button>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center bg-white rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search Product, Category, Brand..."
                  className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-700 placeholder-gray-400 min-w-0"
                />
                <button className="bg-gold-400 hover:bg-gold-500 px-5 py-2.5 transition-colors cursor-pointer flex-shrink-0">
                  <Search size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* User / Login */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors"
                  >
                    <User size={18} />
                    <span className="hidden lg:block font-medium">{user?.full_name?.split(' ')[0] || 'Account'}</span>
                    <ChevronDown size={12} className="hidden lg:block" />
                  </button>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-strong border border-gray-100 py-1 z-50 animate-slideDown">
                        <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <User size={16} /> My Account
                        </Link>
                        <Link to="/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <Package size={16} /> My Orders
                        </Link>
                        <Link to="/wishlist" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <Heart size={16} /> Wishlist
                        </Link>
                        <div className="h-px bg-gray-100 my-1" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors"
                >
                  <User size={18} />
                  <span className="hidden lg:block font-medium">Login Now</span>
                </button>
              )}

              <div className="hidden sm:block h-6 w-px bg-white/20" />

              <Link to="/track-order" className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors">
                <Truck size={18} />
                <span className="hidden lg:block font-medium">Track Order</span>
              </Link>

              <div className="hidden sm:block h-6 w-px bg-white/20" />

              <Link to="/cart" className="relative flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors">
                <ShoppingCart size={18} />
                <span className="hidden lg:block font-medium">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 lg:-top-1.5 lg:left-3 w-4 h-4 bg-gold-400 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ Mobile Menu Overlay ═══ */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenu(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col animate-slideRight shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-navy-500 to-navy-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-white text-sm">
                  {isAuthenticated ? `Hi ${user?.full_name?.split(' ')[0]}` : 'SHARDUL-GE'}
                </span>
              </div>
              <button onClick={() => setMobileMenu(false)} className="text-white/60 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              <Link to="/" onClick={() => setMobileMenu(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl font-medium">Home</Link>
              <Link to="/bulk-enquiry" onClick={() => setMobileMenu(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl font-medium">Bulk Enquiry</Link>
              <Link to="/become-supplier" onClick={() => setMobileMenu(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl font-medium">Become a Supplier</Link>
              <Link to="/cart" onClick={() => setMobileMenu(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl font-medium">Cart</Link>
              {!isAuthenticated && (
                <button
                  onClick={() => { setMobileMenu(false); setIsLoginModalOpen(true); }}
                  className="w-full mt-2 py-3 bg-gold-400 hover:bg-gold-500 text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                >
                  Login / Register
                </button>
              )}
            </nav>
            {isAuthenticated && (
              <div className="p-4 border-t border-gray-100">
                <button onClick={() => { setMobileMenu(false); handleLogout(); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default Header;
