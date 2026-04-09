import React from 'react';
import { classNames } from '../../utils/helpers';

const variants = {
  primary: 'gold-gradient text-white hover:shadow-gold',
  secondary: 'bg-charcoal text-white hover:bg-charcoal-light',
  outline: 'border-2 border-gold text-gold hover:bg-gold-50',
  ghost: 'text-charcoal hover:bg-cream-dark',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

const Button = ({ children, variant = 'primary', size = 'md', className = '', disabled = false, loading = false, ...props }) => {
  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        loading && 'pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
