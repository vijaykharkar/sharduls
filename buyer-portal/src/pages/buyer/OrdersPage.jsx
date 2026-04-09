import React, { useState, useEffect } from 'react';
import ordersData from '../../data/orders';
import OrderCard from '../../components/order/OrderCard';
import Skeleton from '../../components/ui/Skeleton';

const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [activeTab]);

  const filtered = activeTab === 'All' ? ordersData : ordersData.filter((o) => o.status === activeTab);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-charcoal">Mes Commandes</h1>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hidden pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab
                ? 'gold-gradient text-white shadow-gold'
                : 'bg-white border border-border text-charcoal-lighter hover:border-gold hover:text-gold'
            }`}
          >
            {tab === 'All' ? 'Toutes' : tab === 'Pending' ? 'En attente' : tab === 'Processing' ? 'En cours' : tab === 'Shipped' ? 'Expédiées' : tab === 'Delivered' ? 'Livrées' : 'Annulées'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-5">
              <div className="flex justify-between mb-3">
                <div className="space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-4 w-32" /></div>
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="flex gap-2 mb-3">{Array.from({ length: 3 }).map((_, j) => <Skeleton key={j} className="w-12 h-12" />)}</div>
              <div className="flex justify-between"><Skeleton className="h-4 w-16" /><Skeleton className="h-4 w-24" /></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-border">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-charcoal font-semibold">Aucune commande</p>
          <p className="text-xs text-charcoal-lighter mt-1">Vos commandes apparaîtront ici</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
