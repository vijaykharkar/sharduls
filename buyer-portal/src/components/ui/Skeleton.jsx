import React from 'react';
import { classNames } from '../../utils/helpers';

const Skeleton = ({ className = '', circle = false }) => {
  return (
    <div
      className={classNames(
        'animate-pulse bg-gray-200',
        circle ? 'rounded-full' : 'rounded-xl',
        className
      )}
    />
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-border overflow-hidden">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between items-center pt-1">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  </div>
);

export default Skeleton;
