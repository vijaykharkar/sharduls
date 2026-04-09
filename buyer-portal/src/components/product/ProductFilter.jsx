import React from 'react';
import { Star } from 'lucide-react';

const categories = ['All', 'Mandala', 'Lippan', 'Custom', 'Wall Art', 'Frames'];
const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];

const ProductFilter = ({ filters, setFilters }) => {
  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Prix (€)</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={500}
            value={filters.priceMin}
            onChange={(e) => updateFilter('priceMin', +e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-xs outline-none focus:border-gold"
            placeholder="0"
          />
          <span className="text-charcoal-lighter text-xs">–</span>
          <input
            type="number"
            min={0}
            max={500}
            value={filters.priceMax}
            onChange={(e) => updateFilter('priceMax', +e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-xs outline-none focus:border-gold"
            placeholder="500"
          />
        </div>
        <input
          type="range"
          min={0}
          max={500}
          value={filters.priceMax}
          onChange={(e) => updateFilter('priceMax', +e.target.value)}
          className="w-full mt-3 accent-gold"
        />
      </div>

      {/* Size */}
      <div>
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Taille</h4>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => updateFilter('size', filters.size === s ? '' : s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                filters.size === s
                  ? 'bg-gold text-white border-gold'
                  : 'border-border text-charcoal-lighter hover:border-gold'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Note minimum</h4>
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => updateFilter('minRating', filters.minRating === r ? 0 : r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                filters.minRating === r ? 'bg-gold-50 text-gold' : 'text-charcoal-lighter hover:bg-cream-dark'
              }`}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < r ? 'text-gold fill-gold' : 'text-gray-300'} />
                ))}
              </div>
              <span>& plus</span>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => updateFilter('inStock', e.target.checked)}
            className="w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold"
          />
          <span className="text-xs font-medium text-charcoal">En stock uniquement</span>
        </label>
      </div>

      {/* Reset */}
      <button
        onClick={() => setFilters({ category: 'All', priceMin: 0, priceMax: 500, size: '', minRating: 0, inStock: false, sort: 'newest', search: '' })}
        className="w-full py-2 text-xs text-terracotta font-semibold hover:bg-terracotta/5 rounded-lg cursor-pointer transition-colors"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};

export { categories };
export default ProductFilter;
