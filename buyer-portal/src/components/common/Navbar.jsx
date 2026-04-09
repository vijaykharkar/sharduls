import React from 'react';
import { Search, Bell, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

const Navbar = () => {
  const { user } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="h-16 bg-white border-b border-border flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit, artisan…"
            className="w-full pl-10 pr-4 py-2 bg-cream rounded-xl text-sm border border-border focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-charcoal-lighter hover:text-charcoal cursor-pointer transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta rounded-full" />
        </button>

        <Link to="/cart" className="relative p-2 text-charcoal-lighter hover:text-charcoal transition-colors">
          <ShoppingCart size={20} />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

        <div className="hidden sm:block text-right">
          <p className="text-xs text-charcoal-lighter">Bonjour,</p>
          <p className="text-sm font-semibold text-charcoal">{user?.name?.split(' ')[0] || 'Guest'}</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
