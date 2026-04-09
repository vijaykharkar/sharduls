import React from 'react';
import { cn, getStatusColor } from '../../utils/helpers';

const statusColors = {
  Pending: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  Processing: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Shipped: 'bg-primary/10 text-primary border border-primary/20',
  Delivered: 'bg-green-500/10 text-green-400 border border-green-500/20',
  Cancelled: 'bg-red-500/10 text-red-400 border border-red-500/20',
  Active: 'bg-green-500/10 text-green-400 border border-green-500/20',
  Inactive: 'bg-muted/10 text-muted border border-border',
  Uploaded: 'bg-green-500/10 text-green-400 border border-green-500/20',
  'Not Uploaded': 'bg-muted/10 text-muted border border-border',
  Open: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  'In Progress': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Resolved: 'bg-green-500/10 text-green-400 border border-green-500/20',
};

const Badge = ({ children, status, className = '' }) => {
  const color = status ? statusColors[status] : 'bg-primary/10 text-primary border border-primary/20';
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', color, className)}>
      {children}
    </span>
  );
};

export default Badge;
