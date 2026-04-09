import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-charcoal truncate">{item.name}</h3>
        <p className="text-[10px] text-charcoal-lighter mt-0.5">par {item.artisan}</p>
        <p className="text-sm font-bold text-gold mt-1">{formatPrice(item.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1.5 text-charcoal-lighter hover:bg-cream cursor-pointer transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="px-3 py-1.5 text-sm font-semibold text-charcoal bg-cream min-w-[36px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1.5 text-charcoal-lighter hover:bg-cream cursor-pointer transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="text-right flex-shrink-0 w-20">
        <p className="font-bold text-charcoal text-sm">{formatPrice(item.price * item.quantity)}</p>
      </div>
    </motion.div>
  );
};

export default CartItem;
