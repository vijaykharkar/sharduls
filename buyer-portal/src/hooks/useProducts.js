import { useState, useEffect, useMemo, useCallback } from 'react';
import MOCK_PRODUCTS from '../data/mockProducts';

const PAGE_SIZE = 8;

export default function useProducts() {
  const [allProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  /* reset page when filters change */
  useEffect(() => { setPage(1); }, [category, brand, sortBy, searchQuery]);

  const filtered = useMemo(() => {
    let items = [...allProducts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (category !== 'All') items = items.filter((p) => p.category === category);
    if (brand !== 'All') items = items.filter((p) => p.brand === brand);

    switch (sortBy) {
      case 'price_low':  items.sort((a, b) => a.price - b.price); break;
      case 'price_high': items.sort((a, b) => b.price - a.price); break;
      case 'rating':     items.sort((a, b) => b.rating - a.rating); break;
      case 'discount':   items.sort((a, b) => b.discount - a.discount); break;
      default: break;
    }

    return items;
  }, [allProducts, category, brand, sortBy, searchQuery]);

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const hasMore = paginated.length < filtered.length;

  const loadMore = useCallback(() => setPage((p) => p + 1), []);

  const getById = useCallback((id) => allProducts.find((p) => p.id === Number(id)), [allProducts]);

  return {
    products: paginated,
    allProducts: filtered,
    loading,
    category, setCategory,
    brand, setBrand,
    sortBy, setSortBy,
    searchQuery, setSearchQuery,
    hasMore, loadMore,
    getById,
    totalCount: filtered.length,
  };
}
