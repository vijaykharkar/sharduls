import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, LogOut, ChevronDown, Menu, X, Package } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import logo from '../../assets/logo.jpeg';

export default function Navbar() {
  const { isAuthenticated, user, logout, openAuthModal } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [profileDrop, setProfileDrop] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMobileMenu(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a1929] shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Shardul-GE" className="h-8 sm:h-9 w-auto object-contain" />
          </Link>

          {/* Search — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#d4a853]/30 focus:border-[#d4a853]/50 placeholder-gray-400 text-white transition-all" />
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 ml-auto">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 text-white/80 hover:text-[#d4a853] transition-colors">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] px-1 h-[18px] bg-[#d4a853] text-[#0a1929] text-[9px] font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-white/80 hover:text-[#d4a853] transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] px-1 h-[18px] bg-[#d4a853] text-[#0a1929] text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </Link>

            {/* Auth / Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setProfileDrop(!profileDrop)}
                  className="flex items-center gap-1.5 px-1.5 sm:px-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-[#d4a853]/20 flex items-center justify-center text-[#d4a853] font-bold text-xs">
                    {(user?.full_name || user?.name)?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-white/90 max-w-[80px] truncate">
                    {(user?.full_name || user?.name)?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown size={14} className="text-white/50 hidden sm:block" />
                </button>
                {profileDrop && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileDrop(false)} />
                    <div className="absolute right-0 top-11 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 animate-slideDown">
                      <Link to="/profile" onClick={() => setProfileDrop(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fdf8ed] transition-colors">
                        <User size={16} /> My Profile
                      </Link>
                      <Link to="/orders" onClick={() => setProfileDrop(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fdf8ed] transition-colors">
                        <Package size={16} /> My Orders
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button onClick={() => { setProfileDrop(false); logout(); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={() => openAuthModal('login')}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#d4a853] text-[#0a1929] rounded-xl text-xs font-bold hover:bg-[#e0c07a] transition-colors cursor-pointer">
                Login
              </button>
            )}

            {/* Mobile menu */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 text-white/80 md:hidden cursor-pointer">
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search + menu */}
        {mobileMenu && (
          <div className="md:hidden pb-4 space-y-3 border-t border-white/10 pt-3 animate-slideDown">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#d4a853]/30 text-white placeholder-gray-400" />
              </div>
            </form>
            <div className="flex flex-col gap-2">
              <Link to="/wishlist" onClick={() => setMobileMenu(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-[#d4a853]">
                <Heart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link to="/orders" onClick={() => setMobileMenu(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-[#d4a853]">
                <Package size={16} /> My Orders
              </Link>
            </div>
            {!isAuthenticated && (
              <button onClick={() => { openAuthModal('login'); setMobileMenu(false); }}
                className="w-full py-2.5 bg-[#d4a853] text-[#0a1929] rounded-xl text-sm font-bold cursor-pointer">Login</button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
