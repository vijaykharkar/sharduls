import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';
import { ProductGridSkeleton } from '../components/ui/Skeleton';
import { CATEGORIES, BRANDS, SORT_OPTIONS } from '../data/mockProducts';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const {
    products, loading, totalCount,
    category, setCategory,
    brand, setBrand,
    sortBy, setSortBy,
    searchQuery, setSearchQuery,
    hasMore, loadMore,
  } = useProducts();

  /* Sync URL params to filters */
  useEffect(() => {
    const c = searchParams.get('category');
    const q = searchParams.get('search');
    if (c && CATEGORIES.includes(c)) setCategory(c);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const activeFilters = (category !== 'All' ? 1 : 0) + (brand !== 'All' ? 1 : 0) + (searchQuery ? 1 : 0);

  const clearAll = () => { setCategory('All'); setBrand('All'); setSearchQuery(''); setSortBy('relevance'); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            {searchQuery ? `Results for "${searchQuery}"` : category !== 'All' ? category : 'All Products'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">{totalCount} product{totalCount !== 1 ? 's' : ''} found</p>
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#d4a853]/20 cursor-pointer">
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters — desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><SlidersHorizontal size={14} /> Filters</h3>
            {activeFilters > 0 && (
              <button onClick={clearAll} className="text-[10px] text-[#d4a853] font-semibold cursor-pointer hover:underline">Clear All</button>
            )}
          </div>

          {/* Category */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Category</p>
            <div className="space-y-1">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${category === c ? 'bg-[#d4a853]/10 text-[#b8923f] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Brand</p>
            <div className="space-y-1">
              {BRANDS.map((b) => (
                <button key={b} onClick={() => setBrand(b)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${brand === b ? 'bg-[#d4a853]/10 text-[#b8923f] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {b}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Chips */}
        <div className="lg:hidden mb-4 flex gap-2 overflow-x-auto scrollbar-hidden pb-2 w-full">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-colors ${category === c ? 'bg-[#0a1929] text-white border-[#0a1929]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#d4a853]'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Active filter pills */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-[#d4a853]/10 text-[#b8923f] text-xs font-semibold px-2.5 py-1 rounded-full">
                  "{searchQuery}" <button onClick={() => setSearchQuery('')} className="cursor-pointer"><X size={12} /></button>
                </span>
              )}
              {category !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#d4a853]/10 text-[#b8923f] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {category} <button onClick={() => setCategory('All')} className="cursor-pointer"><X size={12} /></button>
                </span>
              )}
              {brand !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#d4a853]/10 text-[#b8923f] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {brand} <button onClick={() => setBrand('All')} className="cursor-pointer"><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {loading ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm font-semibold text-gray-600">No products found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
              <button onClick={clearAll} className="mt-4 px-4 py-2 bg-[#0a1929] text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-[#102a43] transition-colors">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
              {hasMore && (
                <div className="text-center mt-8">
                  <button onClick={loadMore} className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                    Load More Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
