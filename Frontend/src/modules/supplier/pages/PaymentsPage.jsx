import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Banknote, Clock, TrendingUp, Calendar, Download } from 'lucide-react';
import mockPayments, { paymentSummary } from '../data/mockPayments';
import Badge from '@shared/components/ui/Badge';
import Skeleton from '@shared/components/ui/Skeleton';
import { useToast } from '@shared/context/ToastContext';
import { formatPrice, formatDate } from '@shared/utils/helpers';

const PaymentsPage = () => {
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const stats = [
    { icon: Banknote, label: 'Total Earned', value: formatPrice(paymentSummary.totalEarned), color: 'bg-green-100 text-green-600' },
    { icon: Clock, label: 'Pending', value: formatPrice(paymentSummary.pending), color: 'bg-yellow-100 text-yellow-600' },
    { icon: TrendingUp, label: 'This Month', value: formatPrice(paymentSummary.thisMonth), color: 'bg-blue-100 text-blue-600' },
    { icon: Calendar, label: 'Last Month', value: formatPrice(paymentSummary.lastMonth), color: 'bg-purple-100 text-purple-600' },
  ];

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  const handleCSV = () => addToast('CSV downloaded!', 'success');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Payments</h1>
        <button onClick={handleCSV} className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-violet-700 transition-colors">
          <Download size={14} /> Download CSV
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={20} /></div>
              <p className="text-xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">Transactions</h2>
        </div>
        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50">
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Invoice</th>
                </tr></thead>
                <tbody>
                  {mockPayments.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-500">{formatDate(p.date)}</td>
                      <td className="px-5 py-3 font-semibold text-gray-800">{p.orderId}</td>
                      <td className="px-5 py-3 font-semibold text-gray-800">{formatPrice(p.amount)}</td>
                      <td className="px-5 py-3"><Badge status={p.status === 'Paid' ? 'Delivered' : p.status === 'Processing' ? 'Processing' : 'Pending'}>{p.status}</Badge></td>
                      <td className="px-5 py-3"><button className="text-violet-600 hover:text-violet-700 cursor-pointer text-xs font-semibold"><Download size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-3 p-4">
              {mockPayments.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="flex justify-between mb-1"><span className="font-semibold text-gray-800 text-sm">{p.orderId}</span><Badge status={p.status === 'Paid' ? 'Delivered' : 'Pending'}>{p.status}</Badge></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">{formatDate(p.date)}</span><span className="font-bold text-gray-800">{formatPrice(p.amount)}</span></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
