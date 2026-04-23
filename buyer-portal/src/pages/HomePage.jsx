import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Headphones, Zap, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';
import { ProductGridSkeleton } from '../components/ui/Skeleton';
import { CATEGORIES } from '../data/mockProducts';

const features = [
  { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹499' },
  { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'We\'re here to help' },
];

const catIcons = { Mobiles: '📱', Laptops: '💻', Electronics: '🎧', Fashion: '👕', Home: '🏠' };

export default function HomePage() {
  const { products, loading } = useProducts();

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#102a43] to-[#d4a853] rounded-none sm:rounded-2xl overflow-hidden sm:mx-4 sm:mt-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative px-5 sm:px-10 py-10 sm:py-16 text-white max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur mb-4">
              <Zap size={12} /> Big Sale Live
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Shop the Best<br />Deals Today
            </h1>
            <p className="text-white/70 mt-3 text-sm sm:text-base max-w-md">Discover amazing products at unbeatable prices. From electronics to fashion — everything you need in one place.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-[#d4a853] text-[#0a1929] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#e0c07a] transition-colors">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/products?category=Electronics" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white border border-white/20 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors">
                <Tag size={14} /> Top Deals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-2 sm:gap-3 bg-white rounded-xl border border-gray-100 p-2.5 sm:p-3.5 shadow-card">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#d4a853]/10 flex items-center justify-center flex-shrink-0">
                <f.icon size={16} className="text-[#d4a853] sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-bold text-gray-800 truncate">{f.title}</p>
                <p className="text-[9px] sm:text-[10px] text-gray-400 truncate">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-800">Shop by Category</h2>
          <Link to="/products" className="text-xs text-[#d4a853] font-semibold hover:underline flex items-center gap-1">View All <ArrowRight size={12} /></Link>
        </div>
        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hidden pb-2">
          {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`}
              className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[70px] sm:min-w-[80px] py-2.5 sm:py-3 px-3 sm:px-4 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all hover:border-[#d4a853]/30">
              <span className="text-xl sm:text-2xl">{catIcons[cat] || '📦'}</span>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-700">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-800">Trending Products</h2>
          <Link to="/products" className="text-xs text-[#d4a853] font-semibold hover:underline flex items-center gap-1">See All <ArrowRight size={12} /></Link>
        </div>
        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Deal Banner */}
      <section className="px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#0a1929] to-[#102a43] rounded-2xl p-5 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold">Deal of the Day</h3>
            <p className="text-white/60 text-sm mt-1">Up to 60% off on top electronics</p>
          </div>
          <Link to="/products?category=Electronics" className="inline-flex items-center gap-2 bg-[#d4a853] text-[#0a1929] px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#e0c07a] transition-colors flex-shrink-0">
            Shop Electronics <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
