import React from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function RazorpayButton({ onClick, loading, disabled, totalAmount }) {
  const fmt = (n) => n?.toLocaleString('en-IN');
  const rupees = totalAmount ? totalAmount / 100 : 0;

  return (
    <div className="space-y-3">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className="w-full py-3.5 bg-[#0a1929] text-white rounded-xl text-sm font-bold
                   hover:bg-[#102a43] active:scale-[0.98] transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <ShieldCheck size={16} />
            Pay ₹{fmt(rupees)} Securely
          </>
        )}
      </button>
      <p className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
        <ShieldCheck size={10} className="text-green-500" />
        Secured by Razorpay · UPI · Cards · Net Banking · Wallets
      </p>
    </div>
  );
}
