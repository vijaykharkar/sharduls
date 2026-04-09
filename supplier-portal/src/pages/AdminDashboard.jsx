import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, ShoppingCart, Clock, LogOut, User, Bell,
  LayoutDashboard, FileText, Settings, ChevronRight, ChevronDown,
  Truck, CreditCard, ArrowUpRight, Eye, Menu, X, Search
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUser = localStorage.getItem('supplier_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('supplier_user');
    localStorage.removeItem('supplier_access_token');
    localStorage.removeItem('supplier_refresh_token');
    localStorage.removeItem('supplier_role');
    navigate('/login');
  };

  const stats = [
    { label: 'Total Orders', value: '156', icon: <ShoppingCart size={22} />, trend: '+12%', trendUp: true, color: 'navy' },
    { label: 'Pending PO', value: '23', icon: <Clock size={22} />, trend: '+3', trendUp: false, color: 'gold' },
    { label: 'Payments Due', value: '₹4.2L', icon: <CreditCard size={22} />, trend: '+8%', trendUp: true, color: 'navy' },
    { label: 'Shipments', value: '42', icon: <Truck size={22} />, trend: '+5', trendUp: true, color: 'gold' },
  ];

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <ShoppingCart size={20} />, label: 'Orders' },
    { icon: <Truck size={20} />, label: 'Shipments' },
    { icon: <CreditCard size={20} />, label: 'Payments' },
    { icon: <FileText size={20} />, label: 'Invoices' },
    { icon: <Package size={20} />, label: 'Products' },
    { icon: <User size={20} />, label: 'Users' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  const recentOrders = [
    { id: 'PO-101238', status: 'Open', statusColor: 'bg-blue-100 text-blue-700', date: '28 Mar 2026', amount: '₹1,24,500', items: 12 },
    { id: 'PO-101237', status: 'Shipped', statusColor: 'bg-green-100 text-green-700', date: '26 Mar 2026', amount: '₹89,200', items: 8 },
    { id: 'PO-101236', status: 'Delivered', statusColor: 'bg-[#1a3a5c]/10 text-[#1a3a5c]', date: '24 Mar 2026', amount: '₹2,15,000', items: 24 },
    { id: 'PO-101235', status: 'Pending', statusColor: 'bg-[#d4a853]/10 text-[#d4a853]', date: '22 Mar 2026', amount: '₹56,800', items: 5 },
    { id: 'PO-101234', status: 'Shipped', statusColor: 'bg-green-100 text-green-700', date: '20 Mar 2026', amount: '₹3,42,100', items: 30 },
    { id: 'PO-101233', status: 'Delivered', statusColor: 'bg-[#1a3a5c]/10 text-[#1a3a5c]', date: '18 Mar 2026', amount: '₹78,600', items: 10 },
  ];

  if (!user) return null;

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center shadow-gold flex-shrink-0">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="animate-fadeIn">
            <p className="text-white font-bold text-sm tracking-wide">SHARDUL-GE</p>
            <p className="text-[#d4a853] text-[10px] tracking-widest">ADMIN PANEL</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => { setActiveNav(item.label); setMobileSidebar(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeNav === item.label
                ? 'bg-[#d4a853]/20 text-[#d4a853]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span>{item.label}</span>
            {activeNav === item.label && <ChevronRight size={14} className="ml-auto" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user.full_name?.charAt(0) || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{user.full_name}</p>
            <p className="text-gray-500 text-[10px] truncate">Admin</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">
      <aside className="hidden md:flex flex-col bg-gradient-to-b from-[#1a3a5c] to-[#0a1929] text-white w-64 min-h-screen sticky top-0 z-40">
        <SidebarContent />
      </aside>

      {mobileSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileSidebar(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#1a3a5c] to-[#0a1929] text-white flex flex-col animate-slideRight shadow-2xl">
            <button onClick={() => setMobileSidebar(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white sticky top-0 z-30 border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileSidebar(true)} className="md:hidden p-2 text-gray-500 hover:text-[#1a3a5c] hover:bg-gray-100 rounded-lg cursor-pointer">
                <Menu size={22} />
              </button>
              <div className="md:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1a3a5c] to-[#102a43] rounded-lg flex items-center justify-center">
                  <span className="text-[#d4a853] font-bold text-sm">S</span>
                </div>
              </div>
              <div className="hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-80 hover:border-[#d4a853]/50 focus-within:border-[#d4a853] focus-within:ring-2 focus-within:ring-[#d4a853]/20 transition-all">
                <Search size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <input type="text" placeholder="Search orders, products, users..." className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative p-2.5 text-gray-400 hover:text-[#1a3a5c] hover:bg-gray-100 rounded-xl transition-all cursor-pointer">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="h-8 w-px bg-gray-200 hidden sm:block" />
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#1a3a5c] to-[#102a43] rounded-xl flex items-center justify-center">
                    <span className="text-[#d4a853] font-bold text-sm">{user.full_name?.charAt(0) || 'A'}</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-[#1a3a5c] leading-tight">{user.full_name}</p>
                    <p className="text-[10px] text-gray-400">Admin</p>
                  </div>
                  <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-slideDown">
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><User size={16} /> My Profile</button>
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><Settings size={16} /> Settings</button>
                      <div className="h-px bg-gray-100 my-1" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer"><LogOut size={16} /> Logout</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="relative overflow-hidden rounded-2xl mb-8 animate-slideUp" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
            <div className="absolute inset-0 bg-pattern opacity-10" />
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#d4a853]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#d4a853]/10 rounded-full blur-3xl" />
            <div className="relative z-10 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-[#d4a853] text-xs font-semibold tracking-widest uppercase mb-2">Admin Dashboard</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{user.full_name}</h1>
                  <p className="text-gray-300 text-sm">Manage suppliers, buyers, orders, and platform operations.</p>
                </div>
                <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 flex-shrink-0">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider">System Status</p>
                    <p className="text-white font-semibold text-sm">All Systems Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className={`animate-slideUp stagger-${index + 1} bg-white rounded-2xl p-5 border border-gray-100 relative overflow-hidden group hover:-translate-y-1 hover:shadow-soft transition-all duration-300 cursor-pointer`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color === 'navy' ? 'bg-[#1a3a5c]/10 text-[#1a3a5c]' : 'bg-[#d4a853]/10 text-[#d4a853]'}`}>
                    {stat.icon}
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-0.5 ${stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-[#d4a853]/10 text-[#d4a853]'}`}>
                    <ArrowUpRight size={11} /> {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#1a3a5c] mb-0.5">{stat.value}</p>
                <p className="text-gray-400 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden animate-slideUp stagger-3">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#1a3a5c]">Recent Orders</h2>
                <p className="text-xs text-gray-400 mt-0.5">Latest purchase orders and their status</p>
              </div>
              <button className="text-sm font-semibold text-[#d4a853] hover:text-[#c49843] transition-colors cursor-pointer flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Order ID</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Items</th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Amount</th>
                    <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4"><p className="text-sm font-semibold text-[#1a3a5c]">{order.id}</p></td>
                      <td className="px-6 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.statusColor}`}>{order.status}</span></td>
                      <td className="px-6 py-4 hidden sm:table-cell"><p className="text-sm text-gray-500">{order.date}</p></td>
                      <td className="px-6 py-4 hidden md:table-cell"><p className="text-sm text-gray-500">{order.items} items</p></td>
                      <td className="px-6 py-4 text-right"><p className="text-sm font-semibold text-[#1a3a5c]">{order.amount}</p></td>
                      <td className="px-6 py-4 text-center">
                        <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#d4a853] hover:bg-[#d4a853]/10 rounded-lg transition-all cursor-pointer">
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
              <p className="text-xs text-gray-400">Showing 6 of 156 orders</p>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition cursor-pointer">Previous</button>
                <button className="px-3 py-1.5 text-xs font-medium bg-[#1a3a5c] text-white rounded-lg cursor-pointer">1</button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition cursor-pointer">2</button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition cursor-pointer">3</button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition cursor-pointer">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
