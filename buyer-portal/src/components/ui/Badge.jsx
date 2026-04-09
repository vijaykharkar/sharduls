import React from 'react';
import { classNames } from '../../utils/helpers';

const variants = {
  gold: 'bg-gold-50 text-gold-dark',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  gray: 'bg-gray-100 text-gray-600',
};

const Badge = ({ children, variant = 'gold', className = '' }) => {
  return (
    <span className={classNames('inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
