import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-xs select-none">
      {/* 3:4 Aspect Image Skeleton */}
      <div className="relative aspect-[3/4] overflow-hidden skeleton-shimmer"></div>

      {/* Details Box Skeleton */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3.5">
        <div className="space-y-2">
          {/* Category & Code line */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded-full skeleton-shimmer"></div>
            <div className="h-3 w-12 rounded-full skeleton-shimmer"></div>
          </div>

          {/* Title line */}
          <div className="h-5 w-3/4 rounded-md skeleton-shimmer"></div>

          {/* Short description line */}
          <div className="space-y-1.5 pt-1">
            <div className="h-2.5 w-full rounded-full skeleton-shimmer"></div>
            <div className="h-2.5 w-4/5 rounded-full skeleton-shimmer"></div>
          </div>
        </div>

        {/* Size chips */}
        <div className="flex items-center gap-1.5 pt-1">
          <div className="h-4 w-6 rounded-full skeleton-shimmer"></div>
          <div className="h-4 w-6 rounded-full skeleton-shimmer"></div>
          <div className="h-4 w-6 rounded-full skeleton-shimmer"></div>
        </div>

        {/* Price & Action button */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD5]/60">
          <div className="space-y-1">
            <div className="h-2.5 w-10 rounded-full skeleton-shimmer"></div>
            <div className="h-4 w-24 rounded-md skeleton-shimmer"></div>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};
