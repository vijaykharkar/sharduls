import React from 'react';
import { cn } from '../../utils/helpers';

const Skeleton = ({ className = '' }) => (
  <div className={cn('rounded-xl overflow-hidden relative', className)}>
    <div className="absolute inset-0 bg-surface" />
    <div className="absolute inset-0 chrome-shimmer opacity-20" />
  </div>
);

export default Skeleton;
