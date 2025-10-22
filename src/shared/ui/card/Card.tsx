import React from 'react';
import { cn } from '@/shared/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        // Используем семантические токены через Tailwind
        'bg-[var(--color-card-bg)]',
        'border border-[var(--color-card-border)]',
        'shadow-card',
        'rounded-lg p-6',
        className
      )}
    >
      {children}
    </div>
  );
}
