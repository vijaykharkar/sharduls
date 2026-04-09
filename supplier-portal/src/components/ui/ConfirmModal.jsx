import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Confirm', message = 'Are you sure?', confirmText = 'Yes, proceed', danger = false }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-surface border border-border rounded-2xl shadow-strong max-w-sm w-full p-6 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-highlight cursor-pointer"><X size={18} /></button>
          <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${danger ? 'bg-red-500/10' : 'bg-yellow-500/10'}`}>
            <AlertTriangle size={24} className={danger ? 'text-red-500' : 'text-yellow-500'} />
          </div>
          <h3 className="text-lg font-bold text-highlight mb-1">{title}</h3>
          <p className="text-sm text-muted mb-5">{message}</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 border-2 border-border rounded-xl text-sm font-semibold text-muted hover:border-primary cursor-pointer transition-colors">Cancel</button>
            <button onClick={() => { onConfirm(); onClose(); }} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-colors ${danger ? 'bg-accent hover:bg-accent-dark' : 'chrome-gradient text-background hover:shadow-chrome'}`}>{confirmText}</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default ConfirmModal;
