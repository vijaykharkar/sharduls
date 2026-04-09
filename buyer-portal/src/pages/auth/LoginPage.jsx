import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      addToast(`Bienvenue, ${user.name.split(' ')[0]}! 👋`, 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-charcoal items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/30 rounded-full animate-spinSlow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-gold/20 rounded-full animate-spinSlow" style={{ animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-gold/10 rounded-full animate-spinSlow" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center shadow-gold animate-spinSlow">
            <span className="text-white text-3xl font-bold">✦</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white mb-3">MandalaLux</h1>
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">Artisan Market</p>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
            Découvrez l'art artisanal indien fait main. Mandala, Lippan et créations sur mesure.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center bg-cream px-4 py-12">
        <motion.div variants={stagger} initial="hidden" animate="show" className="w-full max-w-md">
          {/* Mobile logo */}
          <motion.div variants={fadeUp} className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl gold-gradient flex items-center justify-center shadow-gold">
              <span className="text-white text-xl font-bold">✦</span>
            </div>
            <h1 className="font-serif text-xl font-bold text-charcoal">MandalaLux</h1>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-bold text-charcoal">Connexion</h2>
            <p className="text-charcoal-lighter text-sm mt-1">Accédez à votre espace acheteur</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-soft border border-border p-6 mt-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={fadeUp}>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Email ou téléphone</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                  placeholder="sophie@example.com"
                  required
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                    placeholder="password123"
                    required
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-lighter hover:text-charcoal cursor-pointer">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-border accent-gold" />
                  <span className="text-xs text-charcoal-lighter">Se souvenir de moi</span>
                </label>
                <button type="button" className="text-xs text-gold font-semibold hover:text-gold-dark cursor-pointer">
                  Mot de passe oublié ?
                </button>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  {loading ? 'Connexion…' : 'Se connecter'}
                </Button>
              </motion.div>
            </form>

            <motion.p variants={fadeUp} className="text-center text-xs text-charcoal-lighter mt-5">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-gold font-semibold hover:text-gold-dark">Créer un compte</Link>
            </motion.p>
          </motion.div>

          <motion.p variants={fadeUp} className="text-center text-[10px] text-charcoal-lighter mt-4">
            Hint: utilisez n'importe quel email + mot de passe <strong>password123</strong>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
