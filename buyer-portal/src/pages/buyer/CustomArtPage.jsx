import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Palette, CheckCircle } from 'lucide-react';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const artTypes = ['Mandala', 'Lippan', 'Combined'];
const sizes = [
  { label: 'S', dim: '30×30 cm', price: '€50–150' },
  { label: 'M', dim: '50×50 cm', price: '€150–300' },
  { label: 'L', dim: '70×70 cm', price: '€300–600' },
  { label: 'XL', dim: '100×100 cm', price: '€600–1000' },
];
const occasions = ['Home Decor', 'Gift', 'Wedding', 'Corporate'];
const colorSwatches = ['#C9A84C', '#C4622D', '#E8A598', '#1A1A1A', '#FFFFFF', '#2563EB', '#16A34A', '#9333EA'];

const pastRequests = [
  { id: 'CR-001', type: 'Mandala', status: 'In Progress', date: '2024-03-20' },
  { id: 'CR-002', type: 'Lippan', status: 'Completed', date: '2024-02-15' },
];

const CustomArtPage = () => {
  const [form, setForm] = useState({ artType: 'Mandala', size: 'M', colors: ['#C9A84C'], occasion: 'Home Decor', description: '', budget: 300, timeline: '2-3 weeks' });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const toggleColor = (c) => {
    setForm((p) => ({
      ...p,
      colors: p.colors.includes(c) ? p.colors.filter((x) => x !== c) : [...p.colors, c],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.description.length < 50) {
      addToast('La description doit contenir au moins 50 caractères', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Demande envoyée avec succès! ✨', 'success');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-charcoal">Art Sur Mesure</h1>
        <p className="text-sm text-charcoal-lighter mt-1">Créez une œuvre unique avec nos artisans</p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Art Type */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Type d'art</label>
            <div className="flex gap-3">
              {artTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update('artType', t)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 cursor-pointer transition-all ${
                    form.artType === t ? 'border-gold bg-gold-50 text-gold' : 'border-border text-charcoal-lighter hover:border-gold/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Taille</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sizes.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => update('size', s.label)}
                  className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all ${
                    form.size === s.label ? 'border-gold bg-gold-50' : 'border-border hover:border-gold/50'
                  }`}
                >
                  <p className={`text-lg font-bold ${form.size === s.label ? 'text-gold' : 'text-charcoal'}`}>{s.label}</p>
                  <p className="text-[10px] text-charcoal-lighter">{s.dim}</p>
                  <p className="text-[10px] text-gold font-medium mt-0.5">{s.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Palette de couleurs</label>
            <div className="flex flex-wrap gap-2">
              {colorSwatches.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleColor(c)}
                  className={`w-10 h-10 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-center ${
                    form.colors.includes(c) ? 'border-charcoal scale-110' : 'border-border hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {form.colors.includes(c) && <CheckCircle size={16} className={c === '#FFFFFF' ? 'text-charcoal' : 'text-white'} />}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Occasion</label>
            <div className="flex flex-wrap gap-2">
              {occasions.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => update('occasion', o)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                    form.occasion === o ? 'bg-charcoal text-white border-charcoal' : 'border-border text-charcoal-lighter hover:border-charcoal'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Description <span className="text-charcoal-lighter font-normal normal-case">(min 50 caractères)</span></label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold resize-none transition-all"
              placeholder="Décrivez votre vision — motifs, style, inspiration…"
            />
            <p className="text-[10px] text-charcoal-lighter mt-1">{form.description.length}/50 caractères minimum</p>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Budget: <span className="text-gold">€{form.budget}</span></label>
            <input
              type="range"
              min={50}
              max={1000}
              step={25}
              value={form.budget}
              onChange={(e) => update('budget', +e.target.value)}
              className="w-full accent-gold"
            />
            <div className="flex justify-between text-[10px] text-charcoal-lighter"><span>€50</span><span>€1000</span></div>
          </div>

          {/* Upload */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Image de référence (optionnel)</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
              <Upload size={24} className="mx-auto text-charcoal-lighter mb-2" />
              <p className="text-xs text-charcoal-lighter">Glissez une image ou <span className="text-gold font-semibold">parcourir</span></p>
              <p className="text-[10px] text-charcoal-lighter mt-1">PNG, JPG jusqu'à 5 MB</p>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" loading={submitted}>
            {submitted ? 'Envoi en cours…' : 'Soumettre la demande'}
          </Button>
        </form>
      </div>

      {/* Past Requests */}
      <div>
        <h2 className="text-lg font-bold text-charcoal mb-4">Mes demandes</h2>
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-cream">
                <th className="text-left px-5 py-3 text-xs font-bold text-charcoal uppercase tracking-wider">ID</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-charcoal uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-charcoal uppercase tracking-wider">Statut</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-charcoal uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {pastRequests.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-cream/50">
                  <td className="px-5 py-3 font-semibold text-charcoal">{r.id}</td>
                  <td className="px-5 py-3 text-charcoal-lighter">{r.type}</td>
                  <td className="px-5 py-3"><Badge variant={r.status === 'Completed' ? 'green' : 'blue'}>{r.status}</Badge></td>
                  <td className="px-5 py-3 text-charcoal-lighter">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomArtPage;
