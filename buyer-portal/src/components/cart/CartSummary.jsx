import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';
import Button from '../ui/Button';

const CartSummary = () => {
  const { subtotal, shipping, total } = useCart();
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promo.toUpperCase() === 'MANDALA10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const finalTotal = total - discount;

  return (
    <div className="bg-white rounded-2xl border border-border p-6 sticky top-20">
      <h2 className="text-lg font-bold text-charcoal mb-4">Récapitulatif</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-charcoal-lighter">Sous-total</span>
          <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-lighter">Livraison</span>
          <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-charcoal'}`}>
            {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction</span>
            <span className="font-semibold">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="text-base font-bold text-charcoal">Total</span>
            <span className="text-base font-bold text-gold">{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-lighter" />
          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Code promo"
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-xs outline-none focus:border-gold"
          />
        </div>
        <button
          onClick={applyPromo}
          className="px-4 py-2 bg-charcoal text-white text-xs font-semibold rounded-lg hover:bg-charcoal-light cursor-pointer transition-colors"
        >
          Appliquer
        </button>
      </div>
      {shipping > 0 && (
        <p className="text-[10px] text-charcoal-lighter mt-2">Livraison gratuite à partir de €100</p>
      )}

      <Link to="/checkout" className="block mt-5">
        <Button className="w-full" size="lg">
          Passer la commande <ArrowRight size={16} />
        </Button>
      </Link>

      <div className="flex items-center gap-2 justify-center mt-3 text-charcoal-lighter">
        <ShieldCheck size={14} />
        <span className="text-[10px]">Paiement sécurisé</span>
      </div>
    </div>
  );
};

export default CartSummary;
