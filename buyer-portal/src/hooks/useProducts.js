import { useState, useEffect, useMemo, useCallback } from 'react';
import MOCK_PRODUCTS from '../data/mockProducts';
import productApi from '../api/productApi';

const PAGE_SIZE = 8;

export default function useProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [apiCategories, setApiCategories] = useState([]);
  const [apiBrands, setApiBrands] = useState([]);

  /* Fetch products from API, fall back to mock data */
  useEffect(() => {
    let cancelled = false;
    async function fetchProducts() {
      setLoading(true);
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          productApi.getAll({ limit: 200 }),
          productApi.getCategories(),
          productApi.getBrands(),
        ]);
        if (cancelled) return;
        const items = prodRes.data?.data?.items || [];
        if (items.length > 0) {
          setAllProducts(items);
          setApiCategories(catRes.data?.data || []);
          setApiBrands(brandRes.data?.data || []);
        } else {
          setAllProducts(MOCK_PRODUCTS);
        }
      } catch {
        if (!cancelled) setAllProducts(MOCK_PRODUCTS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducts();
    return () => { cancelled = true; };
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
          (p.category || '').toLowerCase().includes(q) ||
          (p.brand || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q),
      );
    }
    if (category !== 'All') items = items.filter((p) => p.category === category);
    if (brand !== 'All') items = items.filter((p) => p.brand === brand);

    switch (sortBy) {
      case 'price_low':  items.sort((a, b) => a.price - b.price); break;
      case 'price_high': items.sort((a, b) => b.price - a.price); break;
      case 'rating':     items.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'discount':   items.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
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
    apiCategories,
    apiBrands,
  };
}
