import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, Banknote, Package, Plus, Eye, Download, Headphones, ArrowRight, AlertTriangle, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSupplier } from '../context/SupplierContext';
import mockOrders from '../data/mockOrders';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { formatPrice, formatDate } from '../utils/helpers';

const STEP_LABELS = ['Business Details', 'Contact Details', 'Category & Brand', 'Addresses', 'Bank Details', 'Documents'];
const STEP_KEYS = ['businessDetails', 'contactDetails', 'categoryBrand', 'addresses', 'bankDetails', 'documents'];

const ProgressRing = ({ percentage }) => {
  const r = 54, c = 2 * Math.PI * r;
  const offset = c - (percentage / 100) * c;
  return (
    <svg width="140" height="140" className="transform -rotate-90">
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(168,178,192,0.15)" strokeWidth="10" />
      <motion.circle
        cx="70" cy="70" r={r} fill="none" stroke="#A8B2C0" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </svg>
  );
};

const AnimatedCounter = ({ target, prefix = '', suffix = '' }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const num = typeof target === 'number' ? target : parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;
    if (num === 0) { setVal(0); return; }
    let start = 0; const step = Math.ceil(num / 40);
    const timer = setInterval(() => { start += step; if (start >= num) { setVal(num); clearInterval(timer); } else setVal(start); }, 25);
    return () => clearInterval(timer);
  }, [target]);
  return <>{prefix}{val.toLocaleString('en-IN')}{suffix}</>;
};

const DashboardPage = () => {
  const { user } = useAuth();
  const { profileSteps, completionPercentage } = useSupplier();
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  const rawRevenue = mockOrders.reduce((s, o) => s + o.amount, 0);
  const stats = [
    { icon: ShoppingBag, label: 'Total Orders', value: mockOrders.length, display: null, color: 'bg-blue-500/10 text-blue-400' },
    { icon: Clock, label: 'Pending Orders', value: mockOrders.filter((o) => o.status === 'Pending').length, display: null, color: 'bg-yellow-500/10 text-yellow-400' },
    { icon: Banknote, label: 'Revenue', value: rawRevenue, display: (v) => <AnimatedCounter target={v} prefix="₹" />, color: 'bg-green-500/10 text-green-400' },
    { icon: Package, label: 'Products Listed', value: 8, display: null, color: 'bg-purple-500/10 text-purple-400' },
  ];

  

  const alerts = [
    { msg: 'Upload GSTIN document', link: '/profile' },
    { msg: 'Add pickup address', link: '/profile' },
    { msg: 'Verify bank details', link: '/profile' },
  ].filter(() => completionPercentage < 100);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="space-y-6">
      {completionPercentage < 100 && (
        <div className="relative bg-surface rounded-2xl border border-border p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/4 translate-x-1/4" />
          <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
            <div className="relative flex-shrink-0">
              <ProgressRing percentage={completionPercentage} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-highlight">{completionPercentage}%</span>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-xl font-bold text-highlight mb-1">Complete your profile to start selling</h2>
              <p className="text-muted text-sm mb-4">Finish all steps to activate your store</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {STEP_LABELS.map((lbl, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {profileSteps[STEP_KEYS[i]] ? (
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"><Check size={12} className="text-white" /></div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center"><Clock size={10} className="text-muted" /></div>
                    )}
                    <span className={`text-xs ${profileSteps[STEP_KEYS[i]] ? 'text-accent-light' : 'text-muted'}`}>{lbl}</span>
                  </div>
                ))}
              </div>
              <Link to="/profile" className="inline-flex items-center gap-2 px-5 py-2.5 chrome-gradient text-background rounded-xl text-sm font-bold hover:shadow-chrome transition-shadow">
                Complete Profile <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}</div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 0 20px rgba(168,178,192,0.15)' }} className="bg-surface rounded-2xl border border-border p-5 border-t-2 border-t-primary/40">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={20} /></div>
              <p className="text-2xl font-bold text-highlight">{s.display ? s.display(s.value) : <AnimatedCounter target={s.value} />}</p>
              <p className="text-xs text-muted mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-sm font-bold text-highlight">Recent Orders</h2>
          <Link to="/orders" className="text-xs text-primary font-semibold hover:text-primary-light flex items-center gap-1">View All <ArrowRight size={14} /></Link>
        </div>
        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-[#0A0D14]">
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Order ID</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Buyer</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider hidden sm:table-cell">Product</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Amount</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
              </tr></thead>
              <tbody>
                {mockOrders.slice(0, 5).map((o, idx) => (
                  <tr key={o.id} className={`border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors ${idx % 2 === 0 ? 'bg-surface' : 'bg-[#1A2030]'}`}>
                    <td className="px-5 py-3 font-semibold text-highlight">{o.id}</td>
                    <td className="px-5 py-3 text-muted">{o.buyer}</td>
                    <td className="px-5 py-3 text-muted hidden sm:table-cell truncate max-w-[150px]">{o.products}</td>
                    <td className="px-5 py-3 text-muted hidden md:table-cell">{formatDate(o.date)}</td>
                    <td className="px-5 py-3 font-semibold text-highlight">{formatPrice(o.amount)}</td>
                    <td className="px-5 py-3"><Badge status={o.status}>{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {alerts.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-highlight">Pending Actions</h2>
          {alerts.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertTriangle size={16} className="text-accent flex-shrink-0" />
              <p className="flex-1 text-sm text-highlight">{a.msg}</p>
              <Link to={a.link} className="text-xs text-primary font-semibold hover:text-primary-light whitespace-nowrap">Fix Now →</Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
