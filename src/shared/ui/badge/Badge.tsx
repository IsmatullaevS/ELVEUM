import { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'neutral';
}

export const Badge = ({ className, variant = 'neutral', children, ...props }: BadgeProps) => {
  const variants = {
    success: 'bg-teal-100 text-teal-700',
    warning: 'bg-orange-100 text-orange-700',
    error: 'bg-rose-100 text-rose-700',
    neutral: 'bg-slate-100 text-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
