import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Banknote, Clock, TrendingUp, Calendar, Download } from 'lucide-react';
import mockPayments, { paymentSummary } from '../data/mockPayments';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { useToast } from '../context/ToastContext';
import { formatPrice, formatDate } from '../utils/helpers';

const PaymentsPage = () => {
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const stats = [
    { icon: Banknote, label: 'Total Earned', value: formatPrice(paymentSummary.totalEarned), color: 'bg-green-500/10 text-green-400' },
    { icon: Clock, label: 'Pending', value: formatPrice(paymentSummary.pending), color: 'bg-yellow-500/10 text-yellow-400' },
    { icon: TrendingUp, label: 'This Month', value: formatPrice(paymentSummary.thisMonth), color: 'bg-blue-500/10 text-blue-400' },
    { icon: Calendar, label: 'Last Month', value: formatPrice(paymentSummary.lastMonth), color: 'bg-purple-500/10 text-purple-400' },
  ];

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  const handleCSV = () => addToast('CSV downloaded!', 'success');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-highlight">Payments</h1>
        <button onClick={handleCSV} className="flex items-center gap-1.5 px-4 py-2 chrome-gradient text-background text-xs font-bold rounded-xl cursor-pointer hover:shadow-chrome transition-colors">
          <Download size={14} /> Download CSV
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 0 20px rgba(168,178,192,0.15)' }} className="bg-surface rounded-2xl border border-border p-5 border-t-2 border-t-primary/40">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={20} /></div>
              <p className="text-xl font-bold text-highlight">{s.value}</p>
              <p className="text-xs text-muted mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-sm font-bold text-highlight">Transactions</h2>
        </div>
        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-[#0A0D14]">
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Invoice</th>
                </tr></thead>
                <tbody>
                  {mockPayments.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 text-muted">{formatDate(p.date)}</td>
                      <td className="px-5 py-3 font-semibold text-highlight">{p.orderId}</td>
                      <td className="px-5 py-3 font-semibold text-highlight">{formatPrice(p.amount)}</td>
                      <td className="px-5 py-3"><Badge status={p.status === 'Paid' ? 'Delivered' : p.status === 'Processing' ? 'Processing' : 'Pending'}>{p.status}</Badge></td>
                      <td className="px-5 py-3"><button className="text-primary hover:text-primary-light cursor-pointer text-xs font-semibold"><Download size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-3 p-4">
              {mockPayments.map((p) => (
                <div key={p.id} className="border border-border rounded-xl p-4 bg-[#0A0D14]">
                  <div className="flex justify-between mb-1"><span className="font-semibold text-highlight text-sm">{p.orderId}</span><Badge status={p.status === 'Paid' ? 'Delivered' : 'Pending'}>{p.status}</Badge></div>
                  <div className="flex justify-between"><span className="text-xs text-muted">{formatDate(p.date)}</span><span className="font-bold text-highlight">{formatPrice(p.amount)}</span></div>
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
