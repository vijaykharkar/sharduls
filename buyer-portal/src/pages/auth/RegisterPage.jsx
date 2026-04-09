import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/ui/Button';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nom requis';
    if (!form.email.includes('@')) e.email = 'Email invalide';
    if (form.password.length < 8) e.password = 'Min 8 caractères';
    if (form.password !== form.confirm) e.confirm = 'Les mots de passe ne correspondent pas';
    if (!terms) e.terms = 'Veuillez accepter les conditions';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await register(form);
      addToast(`Bienvenue, ${user.name.split(' ')[0]}! 👋`, 'success');
      navigate('/dashboard');
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
  const inputClass = 'w-full px-4 py-2.5 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all';

  return (
    <div className="min-h-screen flex">
      {/* Left decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-charcoal items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/30 rounded-full animate-spinSlow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-gold/20 rounded-full animate-spinSlow" style={{ animationDirection: 'reverse' }} />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center shadow-gold animate-spinSlow">
            <span className="text-white text-3xl font-bold">✦</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white mb-3">MandalaLux</h1>
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">Artisan Market</p>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
            Rejoignez notre communauté et découvrez l'art artisanal indien.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center bg-cream px-4 py-12">
        <motion.div variants={stagger} initial="hidden" animate="show" className="w-full max-w-md">
          <motion.div variants={fadeUp} className="lg:hidden text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl gold-gradient flex items-center justify-center shadow-gold">
              <span className="text-white text-xl font-bold">✦</span>
            </div>
            <h1 className="font-serif text-xl font-bold text-charcoal">MandalaLux</h1>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-bold text-charcoal">Créer un compte</h2>
            <p className="text-charcoal-lighter text-sm mt-1">Inscrivez-vous pour commencer vos achats</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-soft border border-border p-6 mt-6">
            {errors.form && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-xs">{errors.form}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={fadeUp}>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Nom complet</label>
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} placeholder="Sophie Martin" />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="sophie@example.com" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Téléphone</label>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="+33 6 12 34 56 78" />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Mot de passe</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => update('password', e.target.value)} className={`${inputClass} pr-10`} placeholder="Min 8 caractères" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-lighter hover:text-charcoal cursor-pointer">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Confirmer le mot de passe</label>
                <input type="password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} className={inputClass} placeholder="Répétez le mot de passe" />
                {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="w-4 h-4 rounded border-border accent-gold mt-0.5" />
                  <span className="text-xs text-charcoal-lighter leading-relaxed">
                    J'accepte les <span className="text-gold font-semibold cursor-pointer">conditions générales</span> et la <span className="text-gold font-semibold cursor-pointer">politique de confidentialité</span>
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  {loading ? 'Création…' : 'Créer mon compte'}
                </Button>
              </motion.div>
            </form>

            <motion.p variants={fadeUp} className="text-center text-xs text-charcoal-lighter mt-5">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-gold font-semibold hover:text-gold-dark">Se connecter</Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
