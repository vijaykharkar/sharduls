import React from 'react';
import { ShoppingCart, Clock, CheckCircle, Truck, Package, XCircle } from 'lucide-react';

const MOCK_STATS = [
  { label: 'Total Orders', value: 0, color: 'bg-blue-100 text-blue-600', icon: ShoppingCart },
  { label: 'Pending', value: 0, color: 'bg-amber-100 text-amber-600', icon: Clock },
  { label: 'Processing', value: 0, color: 'bg-violet-100 text-violet-600', icon: Package },
  { label: 'Delivered', value: 0, color: 'bg-green-100 text-green-600', icon: CheckCircle },
];

const AdminOrdersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Orders</h1>
        <p className="text-xs text-gray-500 mt-0.5">Manage all orders across the platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{s.value}</p>
              <p className="text-[10px] text-gray-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
        <ShoppingCart size={48} className="mx-auto text-gray-200 mb-4" />
        <h2 className="text-lg font-bold text-gray-400 mb-1">No Orders Yet</h2>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          When buyers place orders for approved products, they will appear here. You can track, manage, and update order statuses.
        </p>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
