import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Package, ChevronLeft, ChevronRight, Heart, Star,
  Clock, Zap, Wrench, Stethoscope, Leaf, HardHat, Car, Box, Shield
} from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { icon: <Clock size={22} />, label: '24 hrs Delivery', color: 'text-red-500' },
    { icon: <Zap size={22} />, label: 'Electrical & Appliances', color: 'text-blue-600' },
    { icon: <Wrench size={22} />, label: 'Industrial Tools', color: 'text-gray-700' },
    { icon: <Package size={22} />, label: 'Office Supplies', color: 'text-green-600' },
    { icon: <Stethoscope size={22} />, label: 'Medical & Lab', color: 'text-purple-600' },
    { icon: <Leaf size={22} />, label: 'Agri & Gardening', color: 'text-green-500' },
    { icon: <HardHat size={22} />, label: 'Safety Supplies', color: 'text-orange-500' },
    { icon: <Shield size={22} />, label: 'Construction', color: 'text-amber-700' },
    { icon: <Car size={22} />, label: 'Automotive', color: 'text-navy-500' },
    { icon: <Box size={22} />, label: 'Packaging', color: 'text-gold-400' },
  ];

  const banners = [
    { title: 'Industrial Power Tools', subtitle: 'Premium quality. Built to last.', cta: 'SHOP NOW', gradient: 'from-navy-500 to-navy-700', discount: 'GET UP TO 50% OFF' },
    { title: 'Safety Equipment', subtitle: 'Protect your workforce with certified gear.', cta: 'EXPLORE NOW', gradient: 'from-navy-900 to-navy-500', discount: 'FLAT 30% OFF' },
    { title: 'Electrical Components', subtitle: 'Top brands. Best prices. Fast delivery.', cta: 'ORDER NOW', gradient: 'from-navy-700 to-navy-500', discount: 'BULK DISCOUNTS' },
  ];

  const topBrands = [
    { name: 'SCHNEIDER', tag: 'Best Prices' },
    { name: 'SWIFT', tag: 'Upto 50% OFF' },
    { name: 'SKF', tag: 'Upto 40% OFF' },
    { name: 'CYBERNAUTT', tag: 'Upto 70% OFF' },
    { name: 'SHARDUL-GE', tag: 'Upto 50% OFF', highlight: true },
  ];

  const dealProducts = [
    { name: 'Industrial Drill Set', brand: 'Bosch', price: '₹4,299', mrp: '₹6,499', discount: '34% OFF', rating: 4.5, reviews: 128 },
    { name: 'Safety Helmet Pack', brand: 'Karam', price: '₹1,199', mrp: '₹1,899', discount: '37% OFF', rating: 4.3, reviews: 256 },
    { name: 'Cable Management Kit', brand: 'Havells', price: '₹2,899', mrp: '₹4,500', discount: '36% OFF', rating: 4.7, reviews: 89 },
    { name: 'Precision Bearing Set', brand: 'SKF', price: '₹8,599', mrp: '₹12,000', discount: '28% OFF', rating: 4.8, reviews: 45 },
  ];

  const trendingProducts = [
    { name: 'LED Panel Light 40W', brand: 'Philips', price: '₹849', mrp: '₹1,299', discount: '35% OFF', rating: 4.6, reviews: 312 },
    { name: 'Submersible Pump 1HP', brand: 'Kirloskar', price: '₹5,499', mrp: '₹7,999', discount: '31% OFF', rating: 4.4, reviews: 167 },
    { name: 'Welding Machine ARC', brand: 'Esab', price: '₹12,999', mrp: '₹18,500', discount: '30% OFF', rating: 4.5, reviews: 78 },
    { name: 'Digital Multimeter', brand: 'Fluke', price: '₹3,299', mrp: '₹4,999', discount: '34% OFF', rating: 4.9, reviews: 234 },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Package size={48} className="text-gray-200" />
        <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">{product.discount}</span>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors cursor-pointer">
          <Heart size={16} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-[10px] text-gold-400 font-semibold uppercase tracking-wider mb-1">{product.brand}</p>
        <p className="text-sm font-semibold text-navy-500 mb-2 line-clamp-2 leading-tight">{product.name}</p>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            <Star size={10} fill="white" /> {product.rating}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-navy-500">{product.price}</span>
          <span className="text-xs text-gray-400 line-through">{product.mrp}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* ═══ Category Bar ═══ */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hidden">
            {categories.map((cat, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex-shrink-0 group"
              >
                <span className={`${cat.color} group-hover:scale-110 transition-transform`}>{cat.icon}</span>
                <span className="text-[10px] text-gray-600 font-medium whitespace-nowrap">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Hero Banner Carousel ═══ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="relative rounded-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${banners[currentSlide].gradient} p-8 sm:p-12 min-h-[280px] sm:min-h-[320px] flex items-center transition-all duration-700`}>
            <div className="max-w-lg relative z-10">
              <span className="inline-block bg-white/10 backdrop-blur text-gold-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                {banners[currentSlide].discount}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{banners[currentSlide].title}</h2>
              <p className="text-white/70 text-sm mb-6">{banners[currentSlide].subtitle}</p>
              <button className="bg-gold-400 hover:bg-gold-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center gap-2">
                {banners[currentSlide].cta} <ArrowRight size={16} />
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full" />
              <div className="absolute bottom-10 right-32 w-20 h-20 bg-gold-400/10 rounded-full" />
              <div className="absolute top-1/2 right-20 -translate-y-1/2">
                <Package size={120} className="text-white/10" />
              </div>
            </div>
          </div>

          <button onClick={() => setCurrentSlide((p) => (p - 1 + banners.length) % banners.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-navy-500 cursor-pointer transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setCurrentSlide((p) => (p + 1) % banners.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-navy-500 cursor-pointer transition-all">
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`rounded-full transition-all cursor-pointer ${i === currentSlide ? 'w-6 h-2 bg-gold-400' : 'w-2 h-2 bg-white/50'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Top Brands ═══ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {topBrands.map((brand, i) => (
            <div key={i} className={`rounded-xl border p-4 text-center cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-soft ${brand.highlight ? 'bg-gold-50 border-gold-200 hover:border-gold-400' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
              <p className={`font-bold text-sm ${brand.highlight ? 'text-gold-400' : 'text-navy-500'}`}>{brand.name}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{brand.tag}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Deal Products ═══ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-navy-500">Top Deals For You</h2>
            <p className="text-xs text-gray-400 mt-0.5">Best prices on industrial supplies</p>
          </div>
          <button className="text-sm font-semibold text-gold-400 hover:text-gold-500 cursor-pointer flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dealProducts.map((product, i) => <ProductCard key={i} product={product} />)}
        </div>
      </div>

      {/* ═══ CTA Banner ═══ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-navy-500 to-navy-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-1">Bulk Orders</p>
            <h3 className="text-2xl font-bold text-white mb-1">Get Special Prices for Bulk Orders</h3>
            <p className="text-white/60 text-sm">Contact us for custom quotes on large quantity orders</p>
          </div>
          <Link to="/bulk-enquiry" className="bg-gold-400 hover:bg-gold-500 text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex-shrink-0 flex items-center gap-2">
            Request Quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ═══ Trending Products ═══ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-navy-500">Trending Now</h2>
            <p className="text-xs text-gray-400 mt-0.5">Most popular products this week</p>
          </div>
          <button className="text-sm font-semibold text-gold-400 hover:text-gold-500 cursor-pointer flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingProducts.map((product, i) => <ProductCard key={i} product={product} />)}
        </div>
      </div>

      {/* ═══ Why Choose Us ═══ */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-bold text-navy-500 text-center mb-8">Why Choose SHARDUL-GE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Package size={28} />, title: 'Wide Product Range', desc: 'Access millions of products from verified suppliers across India', color: 'bg-navy-500/10 text-navy-500' },
              { icon: <Star size={28} />, title: 'Best Prices Guaranteed', desc: 'Get competitive wholesale prices and bulk discounts on every order', color: 'bg-gold-400/10 text-gold-400' },
              { icon: <Shield size={28} />, title: 'Verified Suppliers', desc: 'Trade with confidence with our verified and trusted suppliers', color: 'bg-green-500/10 text-green-600' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-soft transition-shadow">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}>{f.icon}</div>
                <div>
                  <h3 className="font-bold text-navy-500 mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
