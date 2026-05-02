import React from 'react';
import { Banknote, TrendingUp, ArrowDownRight, ArrowUpRight, Clock } from 'lucide-react';

const MOCK_STATS = [
  { label: 'Total Revenue', value: '₹0', color: 'bg-green-100 text-green-600', icon: TrendingUp },
  { label: 'Platform Fees', value: '₹0', color: 'bg-violet-100 text-violet-600', icon: Banknote },
  { label: 'Payouts to Suppliers', value: '₹0', color: 'bg-blue-100 text-blue-600', icon: ArrowUpRight },
  { label: 'Pending Settlements', value: '₹0', color: 'bg-amber-100 text-amber-600', icon: Clock },
];

const AdminPaymentsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Payments</h1>
        <p className="text-xs text-gray-500 mt-0.5">Track revenue, platform fees, and supplier payouts</p>
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
        <Banknote size={48} className="mx-auto text-gray-200 mb-4" />
        <h2 className="text-lg font-bold text-gray-400 mb-1">No Payments Yet</h2>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          Payment transactions will appear here once orders are placed and processed. Track revenue, commissions, and supplier payouts in real-time.
        </p>
      </div>
    </div>
  );
};

export default AdminPaymentsPage;
