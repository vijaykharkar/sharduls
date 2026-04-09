import React from 'react';

const Button = ({ children, variant = 'primary', loading, disabled, className = '', ...props }) => {
  const base = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm';

  const variants = {
    primary: 'bg-gradient-to-r from-[#d4a853] to-[#c49843] hover:from-[#c49843] hover:to-[#b08536] text-white shadow-gold hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-[#1a3a5c]/5 hover:bg-[#1a3a5c]/10 text-[#1a3a5c] border border-[#1a3a5c]/20 hover:border-[#1a3a5c]/40',
    outline: 'bg-transparent border-2 border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853] hover:text-white',
    success: 'bg-gradient-to-r from-[#1a3a5c] to-[#102a43] hover:from-[#102a43] hover:to-[#0a1929] text-white shadow-navy hover:shadow-lg hover:-translate-y-0.5',
    ghost: 'bg-transparent hover:bg-[#1a3a5c]/5 text-[#1a3a5c]',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
