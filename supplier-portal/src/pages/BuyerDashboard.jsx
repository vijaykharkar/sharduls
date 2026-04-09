import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ShoppingCart, MapPin, ChevronDown, ChevronLeft, ChevronRight,
  User, LogOut, Heart, Package, Truck, Clock, Zap, Wrench, Stethoscope,
  Leaf, HardHat, Car, Box, Menu, X, Bell, Star, ArrowRight, Shield
} from 'lucide-react';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUser = localStorage.getItem('supplier_user');
    if (!storedUser) { navigate('/login'); return; }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('supplier_user');
    localStorage.removeItem('supplier_access_token');
    localStorage.removeItem('supplier_refresh_token');
    localStorage.removeItem('supplier_role');
    navigate('/login');
  };

  // ─── Auto-rotate banner ───
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { icon: <Clock size={22} />, label: '24 hrs Delivery', color: 'text-red-500' },
    { icon: <Zap size={22} />, label: 'Electrical & Appliances', color: 'text-blue-600' },
    { icon: <Wrench size={22} />, label: 'Industrial Tools', color: 'text-gray-700' },
    { icon: <Package size={22} />, label: 'Office Supplies', color: 'text-green-600' },
    { icon: <Stethoscope size={22} />, label: 'Medical & Lab', color: 'text-purple-600' },
    { icon: <Leaf size={22} />, label: 'Agri & Gardening', color: 'text-green-500' },
    { icon: <HardHat size={22} />, label: 'Safety Supplies', color: 'text-orange-500' },
    { icon: <Shield size={22} />, label: 'Construction', color: 'text-amber-700' },
    { icon: <Car size={22} />, label: 'Automotive', color: 'text-[#1a3a5c]' },
    { icon: <Box size={22} />, label: 'Packaging', color: 'text-[#d4a853]' },
  ];

  const banners = [
    {
      title: 'Industrial Power Tools',
      subtitle: 'Premium quality. Built to last.',
      cta: 'SHOP NOW',
      gradient: 'from-[#1a3a5c] to-[#102a43]',
      accent: '#d4a853',
      discount: 'GET UP TO 50% OFF',
    },
    {
      title: 'Safety Equipment',
      subtitle: 'Protect your workforce with certified gear.',
      cta: 'EXPLORE NOW',
      gradient: 'from-[#0a1929] to-[#1a3a5c]',
      accent: '#d4a853',
      discount: 'FLAT 30% OFF',
    },
    {
      title: 'Electrical Components',
      subtitle: 'Top brands. Best prices. Fast delivery.',
      cta: 'ORDER NOW',
      gradient: 'from-[#102a43] to-[#1a3a5c]',
      accent: '#d4a853',
      discount: 'BULK DISCOUNTS',
    },
  ];

  const topBrands = [
    { name: 'SCHNEIDER', tag: 'Best Prices', highlight: false },
    { name: 'SWIFT', tag: 'Upto 50% OFF', highlight: false },
    { name: 'SKF', tag: 'Upto 40% OFF', highlight: false },
    { name: 'CYBERNAUTT', tag: 'Upto 70% OFF', highlight: false },
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

  if (!user) return null;

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Image placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Package size={48} className="text-gray-200" />
        <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">{product.discount}</span>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors cursor-pointer">
          <Heart size={16} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-[10px] text-[#d4a853] font-semibold uppercase tracking-wider mb-1">{product.brand}</p>
        <p className="text-sm font-semibold text-[#1a3a5c] mb-2 line-clamp-2 leading-tight">{product.name}</p>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            <Star size={10} fill="white" /> {product.rating}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#1a3a5c]">{product.price}</span>
          <span className="text-xs text-gray-400 line-through">{product.mrp}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">
      {/* ═══ Top Bar ═══ */}
      <header className="bg-gradient-to-r from-[#1a3a5c] to-[#102a43] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center gap-4">
            {/* Mobile menu */}
            <button onClick={() => setMobileMenu(true)} className="lg:hidden p-2 text-white/80 hover:text-white cursor-pointer">
              <Menu size={22} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm leading-tight">SHARDUL-GE</p>
                <p className="text-[#d4a853] text-[8px] tracking-widest">MARKETPLACE</p>
              </div>
            </div>

            {/* Location */}
            <button className="hidden md:flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors flex-shrink-0">
              <MapPin size={14} className="text-[#d4a853]" />
              <div className="text-left">
                <p className="text-[9px] text-white/50">Delivery to</p>
                <p className="font-semibold">Select Location</p>
              </div>
            </button>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center bg-white rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Product, Category, Brand..."
                  className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-700 placeholder-gray-400"
                />
                <button className="bg-[#d4a853] hover:bg-[#c49843] px-5 py-2.5 transition-colors cursor-pointer flex-shrink-0">
                  <Search size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Profile */}
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors">
                  <User size={18} />
                  <span className="hidden lg:block font-medium">{user.full_name?.split(' ')[0]}</span>
                  <ChevronDown size={12} className="hidden lg:block" />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-slideDown">
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><User size={16} /> My Account</button>
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><Package size={16} /> My Orders</button>
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><Heart size={16} /> Wishlist</button>
                      <div className="h-px bg-gray-100 my-1" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer"><LogOut size={16} /> Logout</button>
                    </div>
                  </>
                )}
              </div>

              <div className="hidden sm:block h-6 w-px bg-white/20" />

              <button className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors">
                <Truck size={18} />
                <span className="hidden lg:block font-medium">Track Order</span>
              </button>

              <div className="hidden sm:block h-6 w-px bg-white/20" />

              <button className="relative flex items-center gap-1.5 text-white/80 hover:text-white text-xs cursor-pointer transition-colors">
                <ShoppingCart size={18} />
                <span className="hidden lg:block font-medium">Cart</span>
                <span className="absolute -top-1.5 -right-1.5 lg:-top-1.5 lg:left-3 w-4 h-4 bg-[#d4a853] rounded-full text-[9px] text-white flex items-center justify-center font-bold">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

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

      {/* ═══ Mobile Menu Overlay ═══ */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenu(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col animate-slideRight shadow-2xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1a3a5c] to-[#102a43] rounded-lg flex items-center justify-center">
                  <span className="text-[#d4a853] font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-[#1a3a5c] text-sm">Hi {user.full_name?.split(' ')[0]}</span>
              </div>
              <button onClick={() => setMobileMenu(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={20} /></button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {categories.map((cat, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className={cat.color}>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ═══ Main Content ═══ */}
      <main className="flex-1">
        {/* Hero Banner Carousel */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="relative rounded-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${banners[currentSlide].gradient} p-8 sm:p-12 min-h-[280px] sm:min-h-[320px] flex items-center transition-all duration-700`}>
              <div className="max-w-lg relative z-10">
                <span className="inline-block bg-white/10 backdrop-blur text-[#d4a853] text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {banners[currentSlide].discount}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{banners[currentSlide].title}</h2>
                <p className="text-white/70 text-sm mb-6">{banners[currentSlide].subtitle}</p>
                <button className="bg-[#d4a853] hover:bg-[#c49843] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center gap-2">
                  {banners[currentSlide].cta} <ArrowRight size={16} />
                </button>
              </div>
              {/* Decorative */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full" />
                <div className="absolute bottom-10 right-32 w-20 h-20 bg-[#d4a853]/10 rounded-full" />
                <div className="absolute top-1/2 right-20 -translate-y-1/2">
                  <Package size={120} className="text-white/10" />
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-[#1a3a5c] cursor-pointer transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-[#1a3a5c] cursor-pointer transition-all"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full transition-all cursor-pointer ${
                    i === currentSlide ? 'w-6 h-2 bg-[#d4a853]' : 'w-2 h-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Brands Strip */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {topBrands.map((brand, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 text-center cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-soft ${
                  brand.highlight
                    ? 'bg-[#d4a853]/5 border-[#d4a853]/30 hover:border-[#d4a853]'
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                <p className={`font-bold text-sm ${brand.highlight ? 'text-[#d4a853]' : 'text-[#1a3a5c]'}`}>{brand.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{brand.tag}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Products */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#1a3a5c]">Top Deals For You</h2>
              <p className="text-xs text-gray-400 mt-0.5">Best prices on industrial supplies</p>
            </div>
            <button className="text-sm font-semibold text-[#d4a853] hover:text-[#c49843] cursor-pointer flex items-center gap-1 transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dealProducts.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-gradient-to-r from-[#1a3a5c] to-[#0a1929] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[#d4a853] text-xs font-bold tracking-widest uppercase mb-1">Bulk Orders</p>
              <h3 className="text-2xl font-bold text-white mb-1">Get Special Prices for Bulk Orders</h3>
              <p className="text-white/60 text-sm">Contact us for custom quotes on large quantity orders</p>
            </div>
            <button className="bg-[#d4a853] hover:bg-[#c49843] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex-shrink-0 flex items-center gap-2">
              Request Quote <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Trending Products */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#1a3a5c]">Trending Now</h2>
              <p className="text-xs text-gray-400 mt-0.5">Most popular products this week</p>
            </div>
            <button className="text-sm font-semibold text-[#d4a853] hover:text-[#c49843] cursor-pointer flex items-center gap-1 transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="bg-[#1a3a5c]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xs">SHARDUL-GE</p>
                  <p className="text-[#d4a853] text-[7px] tracking-widest">MARKETPLACE</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">India's leading B2B marketplace for industrial supplies and components.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Company</h4>
              <div className="space-y-2">
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">About Us</p>
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">Careers</p>
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">Blog</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Support</h4>
              <div className="space-y-2">
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">Help Center</p>
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">Contact Us</p>
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">Returns</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wider">Policies</h4>
              <div className="space-y-2">
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">Terms of Use</p>
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
                <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition-colors">Shipping Policy</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-gray-500 text-xs">&copy; 2026 SHARDUL-GE Technologies Pvt. Ltd. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BuyerDashboard;
