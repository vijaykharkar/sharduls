import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';

export default function OrdersPage() {
  /* Orders will come from API — for now show empty state */
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">My Orders</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-10 text-center">
        <div className="w-20 h-20 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package size={32} className="text-[#d4a853]/50" />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">No Orders Yet</h2>
        <p className="text-sm text-gray-500 mb-4">Your orders will appear here once you start shopping</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors">
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
