import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col select-none">
      <div className="aspect-[3/4] skeleton-shimmer" />
      <div className="py-3 space-y-2">
        <div className="h-2 w-16 skeleton-shimmer" />
        <div className="h-3 w-3/4 skeleton-shimmer" />
        <div className="h-3 w-1/3 skeleton-shimmer" />
      </div>
    </div>
  );
};
