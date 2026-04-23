import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';
import ProductCard from '../components/product/ProductCard';

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart size={40} className="text-red-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h2>
        <p className="text-sm text-gray-500 mb-6">Save items you love for later</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors">
          Explore Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">My Wishlist ({wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''})</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
