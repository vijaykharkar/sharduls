import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import Badge from '@shared/components/ui/Badge';
import { useToast } from '@shared/context/ToastContext';
import { formatDate } from '@shared/utils/helpers';

const categories = ['Account', 'Orders', 'Payments', 'Products', 'Technical', 'Other'];
const mockTickets = [
  { id: 'TKT-001', subject: 'Payment not received for ORD-10001', status: 'Open', created: '2024-04-08' },
  { id: 'TKT-002', subject: 'Unable to upload product images', status: 'In Progress', created: '2024-04-05' },
  { id: 'TKT-003', subject: 'Request for bulk upload feature', status: 'Resolved', created: '2024-03-28' },
];

const ic = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-violet-300 bg-white text-gray-800 placeholder-gray-400 transition-all';

const SupportPage = () => {
  const [form, setForm] = useState({ subject: '', category: '', description: '' });
  const [tickets, setTickets] = useState(mockTickets);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject || !form.category || !form.description) { addToast('Fill all fields', 'warning'); return; }
    const newTicket = { id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`, subject: form.subject, status: 'Open', created: new Date().toISOString().split('T')[0] };
    setTickets([newTicket, ...tickets]);
    setForm({ subject: '', category: '', description: '' });
    addToast('Ticket raised successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Raise a Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Subject *</label>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={ic} placeholder="Brief description of issue" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={ic}>
                <option value="">Select…</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description *</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${ic} resize-none`} rows={4} placeholder="Describe your issue in detail" />
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-violet-400 transition-colors cursor-pointer">
              <Paperclip size={16} className="mx-auto text-gray-400 mb-1" />
              <p className="text-[10px] text-gray-400">Attach file (optional)</p>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 cursor-pointer transition-colors">
              <Send size={14} /> Submit Ticket
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100"><h2 className="text-sm font-bold text-gray-800">My Tickets</h2></div>
          {tickets.length === 0 ? (
            <div className="text-center py-16 text-gray-400"><p className="text-3xl mb-2">🎫</p><p className="text-xs">No tickets yet</p></div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50">
                    <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ticket ID</th>
                    <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Created</th>
                  </tr></thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 font-semibold text-gray-800">{t.id}</td>
                        <td className="px-5 py-3 text-gray-500 truncate max-w-[200px]">{t.subject}</td>
                        <td className="px-5 py-3"><Badge status={t.status}>{t.status}</Badge></td>
                        <td className="px-5 py-3 text-gray-500">{formatDate(t.created)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden space-y-3 p-4">
                {tickets.map((t) => (
                  <div key={t.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between mb-1"><span className="font-semibold text-gray-800 text-sm">{t.id}</span><Badge status={t.status}>{t.status}</Badge></div>
                    <p className="text-xs text-gray-500 truncate">{t.subject}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{formatDate(t.created)}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
