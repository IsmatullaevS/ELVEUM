import { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
}

export const Card = ({ className, variant = 'default', children, ...props }: CardProps) => {
  const variants = {
    default: 'bg-white border border-slate-200',
    bordered: 'bg-slate-50 border border-slate-300',
    elevated: 'bg-white shadow-md',
  };

  return (
    <div
      className={cn('rounded-lg p-6', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
