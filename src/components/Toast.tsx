import React from 'react';
import { X } from 'lucide-react';
import { ToastData } from '../types';

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 select-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-[#2A2421] text-[#FAF6F0] px-4 py-3 shadow-lg text-xs font-medium animate-fade-in max-w-xs"
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#D4C5B9] hover:text-white shrink-0 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
