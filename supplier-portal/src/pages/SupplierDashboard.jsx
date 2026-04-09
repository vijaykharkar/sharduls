import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, AlertCircle, Download, ChevronDown, ChevronRight,
  Bell, LogOut, User, LayoutDashboard, HelpCircle, FileText,
  Mail, Phone, Landmark, Building2, MapPin, ShieldCheck, Stamp,
  PenLine, Award, PlusCircle, Menu, X, Play
} from 'lucide-react';

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [profileOpen, setProfileOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUser = localStorage.getItem('supplier_user');
    if (!storedUser) { navigate('/login'); return; }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('supplier_user');
    localStorage.removeItem('supplier_access_token');
    localStorage.removeItem('supplier_refresh_token');
    localStorage.removeItem('supplier_role');
    navigate('/login');
  };

  // ─── Mock profile data ───
  const profileCompletion = 100;
  const profileStatus = 'rejected'; // 'pending' | 'approved' | 'rejected'

  const accountDetails = [
    { label: 'Email Verification', verified: true, icon: <Mail size={16} /> },
    { label: 'Phone Verification', verified: true, icon: <Phone size={16} /> },
    { label: 'Bank account Verification', verified: true, icon: <Landmark size={16} /> },
  ];

  const businessDetails = [
    { label: 'GSTIN', verified: true, icon: <Building2 size={16} /> },
    { label: 'Address', verified: true, icon: <MapPin size={16} /> },
  ];

  const brands = [
    { label: 'Brand Authorisation letter', verified: true, icon: <Award size={16} /> },
  ];

  const documents = [
    { label: 'PAN Card', status: 'verified', icon: <FileText size={16} /> },
    { label: 'Cancel Cheque', status: 'verified', icon: <FileText size={16} /> },
    { label: 'Address Proof', status: 'warning', icon: <FileText size={16} /> },
    { label: 'Signature', status: 'warning', icon: <PenLine size={16} /> },
    { label: 'GSTIN Certificate', status: 'verified', icon: <Stamp size={16} /> },
  ];

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <User size={20} />, label: 'Profile' },
  ];

  if (!user) return null;

  const StatusIcon = ({ status }) => {
    if (status === 'verified' || status === true)
      return <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />;
    if (status === 'warning')
      return <AlertCircle size={16} className="text-[#d4a853] flex-shrink-0" />;
    return <AlertCircle size={16} className="text-gray-300 flex-shrink-0" />;
  };

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center shadow-gold flex-shrink-0">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-wide">SHARDUL-GE</p>
            <p className="text-[#d4a853] text-[10px] tracking-widest">SUPPLIER PORTAL</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => { setActiveNav(item.label); setMobileSidebar(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeNav === item.label ? 'bg-[#d4a853]/20 text-[#d4a853]' : 'text-gray-400 hover:text-white hover:bg-white/5'
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
            {user.full_name?.charAt(0) || 'S'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{user.full_name}</p>
            <p className="text-gray-500 text-[10px] truncate">Supplier</p>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer">
          <LogOut size={18} /><span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col bg-gradient-to-b from-[#1a3a5c] to-[#0a1929] text-white w-64 min-h-screen sticky top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileSidebar(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#1a3a5c] to-[#0a1929] text-white flex flex-col animate-slideRight shadow-2xl">
            <button onClick={() => setMobileSidebar(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"><X size={20} /></button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Nav */}
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
              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-6">
                <div className="relative">
                  <button className="flex items-center gap-1 text-sm font-semibold text-[#1a3a5c] hover:text-[#d4a853] transition-colors cursor-pointer">
                    Dashboard <ChevronDown size={14} />
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setSupportOpen(!supportOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#1a3a5c] transition-colors cursor-pointer"
                  >
                    Support <ChevronDown size={14} />
                  </button>
                  {supportOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setSupportOpen(false)} />
                      <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-slideDown">
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Help Center</button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Raise Ticket</button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Contact Us</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative p-2.5 text-gray-400 hover:text-[#1a3a5c] hover:bg-gray-100 rounded-xl transition-all cursor-pointer">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">0</span>
              </button>
              <div className="h-8 w-px bg-gray-200 hidden sm:block" />
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#1a3a5c] to-[#102a43] rounded-full flex items-center justify-center">
                    <span className="text-[#d4a853] font-bold text-sm">{user.full_name?.charAt(0) || 'S'}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-[#1a3a5c]">Hi {user.full_name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-slideDown">
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><User size={16} /> My Profile</button>
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"><HelpCircle size={16} /> Help</button>
                      <div className="h-px bg-gray-100 my-1" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer"><LogOut size={16} /> Logout</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Alert Banner */}
          {profileStatus === 'rejected' && (
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-2xl p-5 mb-6 animate-slideDown">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle size={28} className="text-red-500" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-[#1a3a5c] text-sm">Your profile was rejected.</p>
                <p className="text-gray-500 text-xs mt-0.5">Please update it and resubmit for review.</p>
              </div>
              <button className="flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold text-sm cursor-pointer transition-colors">
                Update now <ChevronRight size={16} />
              </button>
            </div>
          )}

          {profileStatus === 'pending' && (
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-[#d4a853]/5 to-[#d4a853]/10 border border-[#d4a853]/20 rounded-2xl p-5 mb-6 animate-slideDown">
              <div className="w-16 h-16 bg-[#d4a853]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={28} className="text-[#d4a853]" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-[#1a3a5c] text-sm">Profile under review</p>
                <p className="text-gray-500 text-xs mt-0.5">Your profile is being verified. This usually takes 1-2 business days.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Completion Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 animate-slideUp">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#1a3a5c]">
                    Your Account is <span className="text-[#d4a853]">{profileCompletion}%</span> complete
                  </h2>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${profileCompletion}%`,
                      background: profileCompletion === 100 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #d4a853, #c49843)',
                    }}
                  />
                </div>

                {profileStatus === 'rejected' && (
                  <div className="flex items-center gap-2 bg-red-50 rounded-xl px-4 py-2.5 mb-5">
                    <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-600 flex-1">Your profile was rejected. Please update it and resubmit for review.</p>
                    <ChevronRight size={14} className="text-red-400" />
                  </div>
                )}

                {/* Account Details */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-[#1a3a5c] mb-3">Account Details</h3>
                  <div className="space-y-2.5">
                    {accountDetails.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <StatusIcon status={item.verified} />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Details */}
                <div>
                  <h3 className="text-sm font-bold text-[#1a3a5c] mb-3">Business Details</h3>
                  <div className="space-y-2.5">
                    {businessDetails.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <StatusIcon status={item.verified} />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 animate-slideUp stagger-2">
                <h2 className="text-base font-bold text-[#1a3a5c] mb-4">Documents</h2>
                <div className="space-y-0 divide-y divide-gray-50">
                  {documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between py-3 group">
                      <div className="flex items-center gap-3">
                        <StatusIcon status={doc.status} />
                        <span className="text-sm text-gray-700">{doc.label}</span>
                      </div>
                      <button className="p-2 text-gray-300 hover:text-[#1a3a5c] hover:bg-gray-50 rounded-lg transition-all cursor-pointer">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Video Tutorial Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 animate-slideUp stagger-1">
                <h3 className="text-sm font-bold text-[#1a3a5c] mb-3">Watch how to process your Orders</h3>
                <div className="relative rounded-xl overflow-hidden bg-[#1a3a5c] aspect-video flex items-center justify-center cursor-pointer group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] to-[#102a43]" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play size={24} className="text-white ml-1" fill="white" />
                    </div>
                    <p className="text-white/80 text-xs">How to use supplier portal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1 cursor-pointer hover:text-[#1a3a5c] transition-colors">🇮🇳 हिंदी</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-[#1a3a5c] transition-colors font-medium text-[#1a3a5c]">English</span>
                </div>
              </div>

              {/* Brands Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 animate-slideUp stagger-2">
                <h3 className="text-sm font-bold text-[#1a3a5c] mb-3">Brands</h3>
                <div className="space-y-2.5">
                  {brands.map((brand, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <StatusIcon status={brand.verified} />
                      <span className="text-sm text-gray-700">{brand.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#102a43] rounded-2xl p-6 text-white animate-slideUp stagger-3">
                <h3 className="text-sm font-bold mb-2">Need Help?</h3>
                <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                  If you face any issues with your profile or documents, our support team is here to help.
                </p>
                <button className="w-full flex items-center justify-center gap-2 bg-[#d4a853] hover:bg-[#c49843] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer">
                  <PlusCircle size={16} /> Raise New Ticket
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">S</span>
              </div>
              <p className="text-xs text-gray-400">&copy; 2026 SHARDUL-GE. All Rights Reserved.</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-gray-400">
              <span className="hover:text-[#1a3a5c] cursor-pointer transition-colors">TERMS OF USE</span>
              <span className="hover:text-[#1a3a5c] cursor-pointer transition-colors">COPYRIGHT</span>
              <span className="hover:text-[#1a3a5c] cursor-pointer transition-colors">PRIVACY POLICY</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SupplierDashboard;
