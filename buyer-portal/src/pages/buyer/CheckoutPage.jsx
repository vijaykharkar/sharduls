import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, PackageCheck } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { useToast } from '../../components/common/Toast';
import { formatPrice } from '../../utils/helpers';
import Button from '../../components/ui/Button';
import Modal from '../../components/common/Modal';

const steps = [
  { id: 1, label: 'Livraison', icon: Truck },
  { id: 2, label: 'Paiement', icon: CreditCard },
  { id: 3, label: 'Confirmation', icon: PackageCheck },
];

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shipping, setShipping] = useState({ name: '', line1: '', line2: '', city: '', postal: '', country: 'France' });
  const [payment, setPayment] = useState({ method: 'card', cardNumber: '', expiry: '', cvv: '' });
  const { items, subtotal, shipping: shippingCost, total, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const inputClass = 'w-full px-4 py-2.5 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all';

  const handlePlaceOrder = () => {
    setShowSuccess(true);
    addToast('Commande confirmée! 🎉', 'success');
    clearCart();
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/orders');
    }, 3000);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-charcoal">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-border p-4">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s.id ? 'gold-gradient text-white' : 'bg-gray-100 text-charcoal-lighter'}`}>
                {step > s.id ? <Check size={16} /> : s.id}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${step >= s.id ? 'text-charcoal' : 'text-charcoal-lighter'}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-3 rounded ${step > s.id ? 'bg-gold' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={step}>
        {/* Step 1: Shipping */}
        {step === 1 && (
          <motion.div key="shipping" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-charcoal mb-4">Adresse de livraison</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Nom complet</label>
                <input value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className={inputClass} placeholder="Sophie Martin" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Adresse ligne 1</label>
                <input value={shipping.line1} onChange={(e) => setShipping({ ...shipping, line1: e.target.value })} className={inputClass} placeholder="12 Rue de la Paix" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Adresse ligne 2 (optionnel)</label>
                <input value={shipping.line2} onChange={(e) => setShipping({ ...shipping, line2: e.target.value })} className={inputClass} placeholder="Appartement, étage…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Ville</label>
                  <input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className={inputClass} placeholder="Paris" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Code postal</label>
                  <input value={shipping.postal} onChange={(e) => setShipping({ ...shipping, postal: e.target.value })} className={inputClass} placeholder="75002" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Pays</label>
                <input value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className={inputClass} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border accent-gold" />
                <span className="text-xs text-charcoal-lighter">Sauvegarder cette adresse</span>
              </label>
              <Button onClick={() => setStep(2)} className="w-full" size="lg">Continuer vers le paiement</Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <motion.div key="payment" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-charcoal mb-4">Paiement</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <button onClick={() => setPayment({ ...payment, method: 'card' })} className={`flex-1 p-3 rounded-xl border-2 text-xs font-semibold text-center cursor-pointer transition-all ${payment.method === 'card' ? 'border-gold bg-gold-50 text-gold' : 'border-border text-charcoal-lighter'}`}>
                  <CreditCard size={20} className="mx-auto mb-1" /> Carte bancaire
                </button>
                <button onClick={() => setPayment({ ...payment, method: 'cod' })} className={`flex-1 p-3 rounded-xl border-2 text-xs font-semibold text-center cursor-pointer transition-all ${payment.method === 'cod' ? 'border-gold bg-gold-50 text-gold' : 'border-border text-charcoal-lighter'}`}>
                  <PackageCheck size={20} className="mx-auto mb-1" /> Paiement à la livraison
                </button>
              </div>
              {payment.method === 'card' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Numéro de carte</label>
                    <input value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} className={inputClass} placeholder="4242 4242 4242 4242" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">Expiration</label>
                      <input value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className={inputClass} placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">CVV</label>
                      <input value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className={inputClass} placeholder="123" maxLength={3} type="password" />
                    </div>
                  </div>
                </>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="flex-1 py-2.5 border-2 border-border rounded-xl text-sm font-semibold text-charcoal-lighter hover:border-charcoal cursor-pointer transition-colors">Retour</button>
                <Button onClick={() => setStep(3)} className="flex-1" size="lg">Vérifier la commande</Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <motion.div key="confirm" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-charcoal mb-4">Confirmer la commande</h2>
            <div className="space-y-4">
              <div className="bg-cream rounded-xl p-4">
                <p className="text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">Articles</p>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-charcoal">{item.name}</p>
                        <p className="text-[10px] text-charcoal-lighter">Qté: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-charcoal">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="bg-cream rounded-xl p-4 text-sm space-y-1.5">
                <div className="flex justify-between"><span className="text-charcoal-lighter">Sous-total</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-charcoal-lighter">Livraison</span><span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>{shippingCost === 0 ? 'Gratuite' : formatPrice(shippingCost)}</span></div>
                <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold text-charcoal">Total</span><span className="font-bold text-gold text-lg">{formatPrice(total)}</span></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(2)} className="flex-1 py-2.5 border-2 border-border rounded-xl text-sm font-semibold text-charcoal-lighter hover:border-charcoal cursor-pointer transition-colors">Retour</button>
                <Button onClick={handlePlaceOrder} className="flex-1" size="lg">Confirmer et payer</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={() => {}}>
        <div className="text-center py-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Commande confirmée!</h2>
          <p className="text-charcoal-lighter text-sm mb-4">Merci pour votre achat. Vous allez être redirigé vers vos commandes.</p>
          <div className="w-12 h-1 bg-gold rounded-full mx-auto animate-shimmer gold-shimmer" />
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
