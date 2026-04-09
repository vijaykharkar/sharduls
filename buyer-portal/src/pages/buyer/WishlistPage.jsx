import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import useWishlist from '../../hooks/useWishlist';
import useCart from '../../hooks/useCart';
import products from '../../data/products';
import { useToast } from '../../components/common/Toast';
import { formatPrice } from '../../utils/helpers';
import Button from '../../components/ui/Button';

const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const moveToCart = (item) => {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      addToCart(product);
      removeFromWishlist(item.id);
      addToast(`${item.name} déplacé au panier`, 'success');
    }
  };

  const moveAllToCart = () => {
    items.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) addToCart(product);
    });
    clearWishlist();
    addToast('Tous les articles ajoutés au panier!', 'success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center animate-fadeIn">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-red-200" />
          </div>
          <h2 className="text-xl font-bold text-charcoal mb-2">Votre liste est vide</h2>
          <p className="text-charcoal-lighter text-sm mb-6">Sauvegardez vos articles préférés ici</p>
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
          Wishlist <span className="text-charcoal-lighter text-base font-normal">({items.length})</span>
        </h1>
        <div className="flex gap-2">
          <Button size="sm" onClick={moveAllToCart}>
            <ShoppingCart size={14} /> Tout ajouter au panier
          </Button>
          <button
            onClick={() => { clearWishlist(); addToast('Wishlist vidée', 'info'); }}
            className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl cursor-pointer transition-colors"
          >
            Vider
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-gold transition-shadow"
            >
              <Link to={`/shop/${item.id}`} className="block">
                <div className="h-44 bg-cream overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
              <div className="p-4">
                <p className="text-[10px] text-gold font-semibold uppercase tracking-wider mb-1">{item.category}</p>
                <Link to={`/shop/${item.id}`}>
                  <h3 className="text-sm font-semibold text-charcoal mb-0.5 hover:text-gold transition-colors truncate">{item.name}</h3>
                </Link>
                <p className="text-[10px] text-charcoal-lighter mb-2">par {item.artisan}</p>
                <p className="text-lg font-bold text-charcoal mb-3">{formatPrice(item.price)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveToCart(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-charcoal hover:bg-charcoal-light text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    <ShoppingCart size={14} /> Au panier
                  </button>
                  <button
                    onClick={() => { removeFromWishlist(item.id); addToast('Retiré de la wishlist', 'info'); }}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;
