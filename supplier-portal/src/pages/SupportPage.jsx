import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import Badge from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { formatDate } from '../utils/helpers';

const categories = ['Account', 'Orders', 'Payments', 'Products', 'Technical', 'Other'];
const mockTickets = [
  { id: 'TKT-001', subject: 'Payment not received for ORD-10001', status: 'Open', created: '2024-04-08' },
  { id: 'TKT-002', subject: 'Unable to upload product images', status: 'In Progress', created: '2024-04-05' },
  { id: 'TKT-003', subject: 'Request for bulk upload feature', status: 'Resolved', created: '2024-03-28' },
];

const SupportPage = () => {
  const [form, setForm] = useState({ subject: '', category: '', description: '' });
  const [tickets, setTickets] = useState(mockTickets);
  const { addToast } = useToast();

  const ic = 'w-full px-4 py-2.5 border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary bg-[#0A0D14] text-highlight placeholder-muted transition-all';

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
      <h1 className="text-xl font-bold text-highlight">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raise Ticket */}
        <div className="bg-surface rounded-2xl border border-border p-6">
          <h2 className="text-sm font-bold text-highlight mb-4">Raise a Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-highlight mb-1">Subject *</label>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={ic} placeholder="Brief description of issue" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-highlight mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={ic}>
                <option value="">Select…</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-highlight mb-1">Description *</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${ic} resize-none`} rows={4} placeholder="Describe your issue in detail" />
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Paperclip size={16} className="mx-auto text-muted mb-1" />
              <p className="text-[10px] text-muted">Attach file (optional)</p>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome cursor-pointer transition-shadow">
              <Send size={14} /> Submit Ticket
            </button>
          </form>
        </div>

        {/* My Tickets */}
        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border"><h2 className="text-sm font-bold text-highlight">My Tickets</h2></div>
          {tickets.length === 0 ? (
            <div className="text-center py-16 text-muted"><p className="text-3xl mb-2">🎫</p><p className="text-xs">No tickets yet</p></div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-[#0A0D14]">
                    <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Ticket ID</th>
                    <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Subject</th>
                    <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Created</th>
                  </tr></thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3 font-semibold text-highlight">{t.id}</td>
                        <td className="px-5 py-3 text-muted truncate max-w-[200px]">{t.subject}</td>
                        <td className="px-5 py-3"><Badge status={t.status}>{t.status}</Badge></td>
                        <td className="px-5 py-3 text-muted">{formatDate(t.created)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile */}
              <div className="md:hidden space-y-3 p-4">
                {tickets.map((t) => (
                  <div key={t.id} className="border border-border rounded-xl p-4 bg-[#0A0D14]">
                    <div className="flex justify-between mb-1"><span className="font-semibold text-highlight text-sm">{t.id}</span><Badge status={t.status}>{t.status}</Badge></div>
                    <p className="text-xs text-muted truncate">{t.subject}</p>
                    <p className="text-[10px] text-muted mt-1">{formatDate(t.created)}</p>
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
