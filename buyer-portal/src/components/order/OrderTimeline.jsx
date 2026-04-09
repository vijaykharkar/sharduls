import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = ['Placed', 'Processing', 'Shipped', 'Delivered'];
const statusIndex = { Pending: 0, Processing: 1, Shipped: 2, Delivered: 3, Cancelled: -1 };

const OrderTimeline = ({ status }) => {
  const current = statusIndex[status] ?? 0;

  if (status === 'Cancelled') {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold">Commande annulée</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-6">
      {steps.map((step, i) => {
        const done = i <= current;
        const isActive = i === current;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done ? 'bg-gold text-white' : 'bg-gray-200 text-gray-400'
                } ${isActive ? 'ring-4 ring-gold/20' : ''}`}
              >
                {done ? <Check size={18} /> : i + 1}
              </motion.div>
              <span className={`text-[10px] font-medium ${done ? 'text-charcoal' : 'text-charcoal-lighter'}`}>
                {step === 'Placed' ? 'Confirmée' : step === 'Processing' ? 'En cours' : step === 'Shipped' ? 'Expédiée' : 'Livrée'}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 rounded-full overflow-hidden bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: i < current ? '100%' : '0%' }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="h-full bg-gold rounded-full"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
