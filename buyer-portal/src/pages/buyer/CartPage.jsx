import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react';
import useCart from '../../hooks/useCart';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';

const CartPage = () => {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center animate-fadeIn">
        <div className="text-center">
          <div className="w-24 h-24 bg-charcoal/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-charcoal/20" />
          </div>
          <h2 className="text-xl font-bold text-charcoal mb-2">Votre panier est vide</h2>
          <p className="text-charcoal-lighter text-sm mb-6">Ajoutez des articles pour les voir ici</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-white rounded-xl font-semibold hover:shadow-gold transition-shadow">
            Découvrir la boutique <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-charcoal">
          Panier <span className="text-charcoal-lighter text-base font-normal">({items.length} article{items.length > 1 ? 's' : ''})</span>
        </h1>
        <Link to="/shop" className="flex items-center gap-1.5 text-xs text-gold font-semibold hover:text-gold-dark transition-colors">
          <ArrowLeft size={14} /> Continuer mes achats
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
