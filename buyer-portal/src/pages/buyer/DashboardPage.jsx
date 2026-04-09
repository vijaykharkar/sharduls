import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Heart, Palette, Award, ArrowRight, ChevronRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useWishlist from '../../hooks/useWishlist';
import products from '../../data/products';
import orders from '../../data/orders';
import ProductCard from '../../components/product/ProductCard';
import { ProductCardSkeleton } from '../../components/ui/Skeleton';

const DashboardPage = () => {
  const { user } = useAuth();
  const { itemCount: wishlistCount } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { icon: Package, label: 'Commandes', value: orders.length, color: 'bg-blue-50 text-blue-600' },
    { icon: Heart, label: 'Wishlist', value: wishlistCount, color: 'bg-red-50 text-red-500' },
    { icon: Palette, label: 'Custom Art', value: 2, color: 'bg-purple-50 text-purple-600' },
    { icon: Award, label: 'Points fidélité', value: user?.loyaltyPoints || 0, color: 'bg-gold-50 text-gold' },
  ];

  const newArrivals = products.filter((p) => p.isNew).slice(0, 6);
  const recentlyViewed = products.slice(5, 11);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative bg-charcoal rounded-2xl p-6 sm:p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 border border-gold rounded-full" />
          <div className="absolute top-1/2 right-20 -translate-y-1/2 w-40 h-40 border border-gold rounded-full" />
        </div>
        <div className="relative z-10">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">Dashboard</p>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            Bonjour {user?.name?.split(' ')[0]}, découvrez nos nouvelles œuvres ✨
          </h1>
          <p className="text-white/50 text-sm mb-4">Explorez notre collection d'art artisanal indien fait main</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-2.5 gold-gradient text-white rounded-xl text-sm font-semibold hover:shadow-gold transition-shadow">
            Explorer la boutique <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: '0 4px 25px -4px rgba(201,168,76,0.2)' }}
            className="bg-white rounded-2xl border border-border p-5"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-charcoal">{s.value}</p>
            <p className="text-xs text-charcoal-lighter mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* New Arrivals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-charcoal">Nouveautés</h2>
          <Link to="/shop" className="text-sm text-gold font-semibold flex items-center gap-1 hover:text-gold-dark transition-colors">
            Voir tout <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-hidden -mx-4 px-4">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="w-64 flex-shrink-0"><ProductCardSkeleton /></div>)
              : newArrivals.map((p, i) => <div key={p.id} className="w-64 flex-shrink-0"><ProductCard product={p} index={i} /></div>)
            }
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-charcoal">Vus récemment</h2>
          <Link to="/shop" className="text-sm text-gold font-semibold flex items-center gap-1 hover:text-gold-dark transition-colors">
            Voir tout <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-hidden -mx-4 px-4">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="w-64 flex-shrink-0"><ProductCardSkeleton /></div>)
              : recentlyViewed.map((p, i) => <div key={p.id} className="w-64 flex-shrink-0"><ProductCard product={p} index={i} /></div>)
            }
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-gold/10 to-terracotta/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gold/20">
        <div>
          <h3 className="font-bold text-charcoal text-lg">Envie d'une œuvre sur mesure ?</h3>
          <p className="text-charcoal-lighter text-sm">Commandez une création personnalisée par nos artisans</p>
        </div>
        <Link to="/custom-art" className="px-6 py-2.5 bg-charcoal text-white rounded-xl text-sm font-semibold hover:bg-charcoal-light transition-colors flex items-center gap-2 flex-shrink-0">
          Demander <Palette size={16} />
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
