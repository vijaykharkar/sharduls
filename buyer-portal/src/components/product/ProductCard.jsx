import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import { formatPrice } from '../../utils/helpers';
import Badge from '../ui/Badge';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-gold transition-shadow duration-300"
    >
      <Link to={`/shop/${product.id}`} className="block relative">
        <div className="relative h-52 bg-cream overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.isNew && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold">Nouveau</Badge>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-lg">Rupture de stock</span>
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full shadow flex items-center justify-center cursor-pointer transition-all z-10"
      >
        <Heart
          size={16}
          className={wishlisted ? 'text-red-500 fill-red-500 animate-bounce1' : 'text-gray-400'}
        />
      </button>

      <div className="p-4">
        <p className="text-[10px] text-gold font-semibold uppercase tracking-wider mb-1">{product.category}</p>
        <Link to={`/shop/${product.id}`}>
          <h3 className="text-sm font-semibold text-charcoal mb-1 line-clamp-2 leading-tight hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] text-charcoal-lighter mb-2">par {product.artisan}</p>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            <Star size={10} fill="white" /> {product.rating}
          </div>
          <span className="text-[10px] text-charcoal-lighter">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-charcoal">{formatPrice(product.price)}</span>
          {product.inStock && (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-charcoal hover:bg-charcoal-light text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              <ShoppingCart size={14} /> Ajouter
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
