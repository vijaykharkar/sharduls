import React, { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/ui/Button';

const tabs = ['Infos personnelles', 'Adresses', 'Sécurité'];

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwords, setPasswords] = useState({ current: '', newPw: '', confirm: '' });
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Domicile', line1: '12 Rue de la Paix', city: 'Paris', postal: '75002', country: 'France', isDefault: true },
    { id: 2, label: 'Bureau', line1: '45 Avenue Montaigne', city: 'Lyon', postal: '69002', country: 'France', isDefault: false },
  ]);

  const inputClass = 'w-full px-4 py-2.5 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all';

  const handleSaveProfile = () => {
    updateProfile(form);
    addToast('Profil mis à jour!', 'success');
  };

  const handleSavePassword = () => {
    if (passwords.newPw.length < 8) {
      addToast('Le mot de passe doit contenir au moins 8 caractères', 'error');
      return;
    }
    if (passwords.newPw !== passwords.confirm) {
      addToast('Les mots de passe ne correspondent pas', 'error');
      return;
    }
    addToast('Mot de passe mis à jour!', 'success');
    setPasswords({ current: '', newPw: '', confirm: '' });
  };

  const setDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    addToast('Adresse par défaut mise à jour', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-charcoal">Mon Profil</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-2xl border border-border p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === i ? 'gold-gradient text-white shadow-gold' : 'text-charcoal-lighter hover:text-charcoal'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Personal Info */}
      {activeTab === 0 && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user?.avatar || 'https://picsum.photos/100/100?random=200'}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border-3 border-gold/20"
              />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center cursor-pointer shadow-gold hover:bg-gold-dark transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <p className="font-bold text-charcoal">{user?.name}</p>
              <p className="text-xs text-charcoal-lighter">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Nom complet</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} type="email" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">Téléphone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} type="tel" />
            </div>
          </div>

          <Button onClick={handleSaveProfile} size="md">
            <Save size={14} /> Enregistrer
          </Button>
        </div>
      )}

      {/* Addresses */}
      {activeTab === 1 && (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div key={addr.id} className={`bg-white rounded-2xl border p-5 ${addr.isDefault ? 'border-gold' : 'border-border'}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-charcoal">{addr.label}</h3>
                  {addr.isDefault && <span className="text-[10px] bg-gold-50 text-gold font-bold px-2 py-0.5 rounded-full">Par défaut</span>}
                </div>
                {!addr.isDefault && (
                  <button onClick={() => setDefault(addr.id)} className="text-xs text-gold font-semibold cursor-pointer hover:text-gold-dark transition-colors">
                    Définir par défaut
                  </button>
                )}
              </div>
              <div className="text-xs text-charcoal-lighter space-y-0.5">
                <p>{addr.line1}</p>
                <p>{addr.city}, {addr.postal}</p>
                <p>{addr.country}</p>
              </div>
            </div>
          ))}

          <button className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-xs font-semibold text-charcoal-lighter hover:border-gold hover:text-gold cursor-pointer transition-colors">
            + Ajouter une adresse
          </button>
        </div>
      )}

      {/* Security */}
      {activeTab === 2 && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Mot de passe actuel</label>
            <input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className={inputClass} placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Nouveau mot de passe</label>
            <input type="password" value={passwords.newPw} onChange={(e) => setPasswords({ ...passwords, newPw: e.target.value })} className={inputClass} placeholder="Min 8 caractères" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">Confirmer le nouveau mot de passe</label>
            <input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className={inputClass} placeholder="Répétez le mot de passe" />
          </div>
          <Button onClick={handleSavePassword} size="md">
            <Save size={14} /> Mettre à jour
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
