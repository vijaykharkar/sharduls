import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Loader2, CheckCircle, Clock, XCircle, Truck, RefreshCw } from 'lucide-react';
import orderApi from '../api/orderApi';
import { useToast } from '@shared/context/ToastContext';

const STATUS_CONFIG = {
  pending:    { label: 'Pending',    icon: Clock,       cls: 'bg-amber-50 text-amber-600' },
  confirmed:  { label: 'Confirmed',  icon: CheckCircle, cls: 'bg-green-50 text-green-600' },
  processing: { label: 'Processing', icon: RefreshCw,   cls: 'bg-blue-50 text-blue-600' },
  shipped:    { label: 'Shipped',    icon: Truck,       cls: 'bg-indigo-50 text-indigo-600' },
  delivered:  { label: 'Delivered',  icon: CheckCircle, cls: 'bg-green-50 text-green-700' },
  cancelled:  { label: 'Cancelled',  icon: XCircle,     cls: 'bg-red-50 text-red-500' },
  refunded:   { label: 'Refunded',   icon: RefreshCw,   cls: 'bg-gray-100 text-gray-500' },
};

const PAYMENT_CONFIG = {
  pending:              { label: 'Pending',     cls: 'text-amber-600' },
  requires_action:      { label: 'Action Needed', cls: 'text-orange-600' },
  processing:           { label: 'Processing',  cls: 'text-blue-600' },
  succeeded:            { label: 'Paid',        cls: 'text-green-600' },
  failed:               { label: 'Failed',      cls: 'text-red-600' },
  cancelled:            { label: 'Cancelled',   cls: 'text-gray-500' },
  refunded:             { label: 'Refunded',    cls: 'text-gray-500' },
  partially_refunded:   { label: 'Partially Refunded', cls: 'text-yellow-600' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fmt = (paise) => (paise / 100).toLocaleString('en-IN');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await orderApi.getAll();
      setOrders(res.data?.data || []);
    } catch (err) {
      addToast(err.userMessage || 'Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 size={28} className="animate-spin text-[#d4a853]" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">My Orders</h1>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-10 text-center">
          <div className="w-20 h-20 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-[#d4a853]/50" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">No Orders Yet</h2>
          <p className="text-sm text-gray-500 mb-4">Your orders will appear here once you start shopping</p>
          <Link to="/buyer/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => {
          const sc = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
          const StatusIcon = sc.icon;
          const pc = order.payment ? (PAYMENT_CONFIG[order.payment.status] || PAYMENT_CONFIG.pending) : null;
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
                <div>
                  <p className="text-xs text-gray-400">Order</p>
                  <p className="text-sm font-bold text-gray-800">{order.order_number}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${sc.cls}`}>
                    <StatusIcon size={11} /> {sc.label}
                  </div>
                  {pc && <p className={`text-[10px] font-semibold mt-0.5 ${pc.cls}`}>Payment: {pc.label}</p>}
                </div>
              </div>
              <div className="px-5 py-3 space-y-2">
                {(order.items || []).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.product_image && <img src={item.product_image} alt="" className="w-10 h-10 object-cover rounded-lg" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{item.product_name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {item.quantity} × ₹{fmt(item.unit_price)}</p>
                    </div>
                    <p className="text-xs font-bold text-gray-700">₹{fmt(item.total_price)}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-[10px] text-gray-400">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                </p>
                <p className="text-sm font-bold text-gray-900">₹{fmt(order.total_amount)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
