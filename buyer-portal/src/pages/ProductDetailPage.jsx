import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';
import ProductCard from '../components/product/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { getById, allProducts, loading } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const product = useMemo(() => getById(id), [id, getById]);
  const wishlisted = product ? isInWishlist(product.id) : false;
  const related = useMemo(() => product ? allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : [], [product, allProducts]);
  const fmt = (n) => n?.toLocaleString('en-IN');

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return (
    <div className="text-center py-20 max-w-7xl mx-auto px-4">
      <p className="text-4xl mb-3">😕</p>
      <p className="text-lg font-bold text-gray-800">Product not found</p>
      <Link to="/products" className="mt-4 inline-block px-5 py-2 bg-[#0a1929] text-white rounded-xl text-sm font-semibold">Browse Products</Link>
    </div>
  );

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link to="/" className="hover:text-[#d4a853]">Home</Link>
        <ChevronRight size={12} />
        <Link to="/products" className="hover:text-[#d4a853]">Products</Link>
        <ChevronRight size={12} />
        <Link to={`/products?category=${product.category}`} className="hover:text-[#d4a853]">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-gray-800 font-medium truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-3">
          <motion.div key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card">
            <img src={images[activeImg]} alt={product.name} className="w-full h-80 sm:h-96 object-contain p-4" />
          </motion.div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${i === activeImg ? 'border-[#d4a853]' : 'border-gray-200 opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <p className="text-xs text-[#d4a853] font-semibold uppercase tracking-wider">{product.brand}</p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                {product.rating} <Star size={11} className="fill-white" />
              </span>
              <span className="text-xs text-gray-500">{fmt(product.reviews)} ratings</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">₹{fmt(product.price)}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">₹{fmt(product.mrp)}</span>
                  <span className="text-sm font-bold text-green-600">{product.discount}% off</span>
                </>
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Inclusive of all taxes</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">Qty:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"><Minus size={14} /></button>
              <span className="px-4 py-2 text-sm font-bold border-x border-gray-200 min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"><Plus size={14} /></button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }}
              className="flex-1 py-3 bg-[#0a1929] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#102a43] transition-colors cursor-pointer">
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product)}
              className={`px-4 py-3 rounded-xl border-2 transition-colors cursor-pointer ${wishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400'}`}>
              <Heart size={18} className={wishlisted ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Delivery */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'Orders above ₹499' },
              { icon: RotateCcw, title: '7-Day Return', desc: 'Easy returns' },
              { icon: Shield, title: 'Warranty', desc: 'Genuine product' },
            ].map((f) => (
              <div key={f.title} className="text-center p-3 bg-white rounded-xl border border-gray-100">
                <f.icon size={18} className="mx-auto text-[#d4a853] mb-1" />
                <p className="text-[10px] font-bold text-gray-700">{f.title}</p>
                <p className="text-[9px] text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Specs */}
          {product.specs && (
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">Specifications</h3>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                {Object.entries(product.specs).map(([k, v], i) => (
                  <div key={k} className={`flex text-xs ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <span className="w-1/3 px-4 py-2.5 text-gray-500 font-medium">{k}</span>
                    <span className="flex-1 px-4 py-2.5 text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
