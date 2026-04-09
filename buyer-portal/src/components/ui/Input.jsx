import React, { forwardRef } from 'react';
import { classNames } from '../../utils/helpers';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-charcoal mb-1.5">{label}</label>}
      <input
        ref={ref}
        className={classNames(
          'w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all duration-200',
          error ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-border focus:ring-2 focus:ring-gold/20 focus:border-gold',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
