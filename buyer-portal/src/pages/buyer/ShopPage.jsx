import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import products from '../../data/products';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilter, { categories } from '../../components/product/ProductFilter';

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'popular', label: 'Populaire' },
];

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('cat') || 'All',
    priceMin: 0,
    priceMax: 500,
    size: '',
    minRating: 0,
    inStock: false,
    sort: 'newest',
    search: '',
  });

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [filters]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (filters.category !== 'All') result = result.filter((p) => p.category === filters.category);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.artisan.toLowerCase().includes(q));
    }
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
    if (filters.minRating) result = result.filter((p) => p.rating >= filters.minRating);
    if (filters.inStock) result = result.filter((p) => p.inStock);
    if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'popular') result.sort((a, b) => b.reviews - a.reviews);
    else result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return result;
  }, [filters]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-charcoal">Boutique</h1>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-lighter" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
              placeholder="Rechercher…"
              className="w-full pl-9 pr-3 py-2 bg-white border border-border rounded-xl text-sm outline-none focus:border-gold"
            />
          </div>
          <select
            value={filters.sort}
            onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}
            className="px-3 py-2 bg-white border border-border rounded-xl text-sm outline-none focus:border-gold cursor-pointer"
          >
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden p-2 bg-white border border-border rounded-xl text-charcoal-lighter hover:text-charcoal cursor-pointer"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hidden pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilters((p) => ({ ...p, category: cat }))}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.category === cat
                ? 'gold-gradient text-white shadow-gold'
                : 'bg-white border border-border text-charcoal-lighter hover:border-gold hover:text-gold'
            }`}
          >
            {cat === 'All' ? 'Tous' : cat}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Filter sidebar (desktop) */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-border p-5 sticky top-20">
            <h3 className="text-sm font-bold text-charcoal mb-4">Filtres</h3>
            <ProductFilter filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* Mobile filter drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto animate-slideLeft shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-charcoal">Filtres</h3>
                <button onClick={() => setShowFilters(false)} className="text-charcoal-lighter hover:text-charcoal cursor-pointer">
                  <X size={20} />
                </button>
              </div>
              <ProductFilter filters={filters} setFilters={setFilters} />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          <p className="text-xs text-charcoal-lighter mb-4">{filtered.length} produit{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}</p>
          <ProductGrid products={filtered} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
