import React from 'react';
import { Settings, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Admin account & platform settings</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
            <Shield size={24} className="text-violet-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{user?.full_name || user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-500">{user?.email || ''}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-violet-100 text-violet-700 text-[10px] font-bold rounded-full uppercase">{user?.role || 'admin'}</span>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-semibold mb-1 block">Full Name</label>
              <p className="text-sm text-gray-800 font-medium">{user?.full_name || user?.name || '—'}</p>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-semibold mb-1 block">Email</label>
              <p className="text-sm text-gray-800 font-medium">{user?.email || '—'}</p>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-semibold mb-1 block">Phone</label>
              <p className="text-sm text-gray-800 font-medium">{user?.phone || '—'}</p>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-semibold mb-1 block">Role</label>
              <p className="text-sm text-gray-800 font-medium capitalize">{user?.role || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings size={15} className="text-violet-600" /> Platform Info
        </h2>
        <div className="space-y-3">
          {[
            { label: 'Platform', value: 'NexaForge Supplier Portal' },
            { label: 'Version', value: '1.0.0' },
            { label: 'API Base', value: 'http://localhost:8000/api/v1' },
            { label: 'Upload Path', value: '/uploads/' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-xs text-gray-500">{item.label}</span>
              <span className="text-xs font-semibold text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
