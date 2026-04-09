import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Eye, Calendar } from 'lucide-react';
import mockOrders from '../data/mockOrders';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { formatPrice, formatDate } from '../utils/helpers';

const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, [activeTab]);

  const filtered = useMemo(() => {
    let r = activeTab === 'All' ? mockOrders : mockOrders.filter((o) => o.status === activeTab);
    if (search) { const q = search.toLowerCase(); r = r.filter((o) => o.id.toLowerCase().includes(q) || o.buyer.toLowerCase().includes(q)); }
    return r;
  }, [activeTab, search]);

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-highlight">Orders</h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hidden">
          {tabs.map((t) => (
            <button key={t} onClick={() => { setActiveTab(t); setPage(1); }} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${activeTab === t ? 'bg-accent text-white shadow-lg' : 'bg-surface border border-border text-muted hover:border-primary'}`}>{t}</button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary bg-[#0A0D14] text-highlight placeholder-muted" placeholder="Search orders…" />
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted"><p className="text-3xl mb-2">📦</p><p className="text-sm">No orders found</p></div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-[#0A0D14]">
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Buyer</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Product</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Action</th>
                </tr></thead>
                <tbody>
                  {paged.map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 font-semibold text-highlight">{o.id}</td>
                      <td className="px-5 py-3 text-muted">{o.buyer}</td>
                      <td className="px-5 py-3 text-muted truncate max-w-[150px]">{o.products}</td>
                      <td className="px-5 py-3 text-muted">{formatDate(o.date)}</td>
                      <td className="px-5 py-3 font-semibold text-highlight">{formatPrice(o.amount)}</td>
                      <td className="px-5 py-3"><Badge status={o.status}>{o.status}</Badge></td>
                      <td className="px-5 py-3"><button onClick={() => setDetail(o)} className="text-primary hover:text-primary-light cursor-pointer"><Eye size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden space-y-3 p-4">
              {paged.map((o) => (
                <div key={o.id} className="border border-border rounded-xl p-4 bg-[#0A0D14]" onClick={() => setDetail(o)}>
                  <div className="flex justify-between mb-2"><span className="font-semibold text-highlight text-sm">{o.id}</span><Badge status={o.status}>{o.status}</Badge></div>
                  <p className="text-xs text-muted">{o.buyer} — {o.products}</p>
                  <div className="flex justify-between mt-2"><span className="text-xs text-muted">{formatDate(o.date)}</span><span className="font-semibold text-sm">{formatPrice(o.amount)}</span></div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer transition-all ${page === i + 1 ? 'bg-accent text-white' : 'text-muted hover:bg-white/5'}`}>{i + 1}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50" onClick={() => setDetail(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-surface border border-border rounded-2xl shadow-strong max-w-md w-full p-6">
              <button onClick={() => setDetail(null)} className="absolute top-4 right-4 text-muted hover:text-highlight cursor-pointer"><X size={18} /></button>
              <h3 className="text-lg font-bold text-highlight mb-4">Order Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted">Order ID</span><span className="font-semibold text-highlight">{detail.id}</span></div>
                <div className="flex justify-between"><span className="text-muted">Buyer</span><span className="font-semibold text-highlight">{detail.buyer}</span></div>
                <div className="flex justify-between"><span className="text-muted">Product</span><span className="font-semibold text-highlight">{detail.products}</span></div>
                <div className="flex justify-between"><span className="text-muted">Date</span><span className="font-semibold text-highlight">{formatDate(detail.date)}</span></div>
                <div className="flex justify-between"><span className="text-muted">Amount</span><span className="font-bold text-primary">{formatPrice(detail.amount)}</span></div>
                <div className="flex justify-between items-center"><span className="text-muted">Status</span><Badge status={detail.status}>{detail.status}</Badge></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersPage;
