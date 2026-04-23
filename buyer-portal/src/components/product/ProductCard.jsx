import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const fmt = (n) => n?.toLocaleString('en-IN');

  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card group transition-shadow hover:shadow-soft">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </Link>
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">{product.discount}% OFF</span>
        )}
        <button onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform">
          <Heart size={15} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <Link to={`/product/${product.id}`} className="block">
          <p className="text-xs text-gray-400 font-medium">{product.brand}</p>
          <h3 className="text-sm font-semibold text-gray-800 mt-0.5 line-clamp-2 leading-tight">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <span className="flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {product.rating} <Star size={9} className="fill-white" />
          </span>
          <span className="text-[10px] text-gray-400">({fmt(product.reviews)})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-bold text-gray-900">₹{fmt(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-gray-400 line-through">₹{fmt(product.mrp)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button onClick={() => addToCart(product)}
          className="w-full mt-3 py-2 bg-[#0a1929] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#102a43] transition-colors cursor-pointer">
          <ShoppingCart size={13} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
