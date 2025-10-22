import React from 'react';
import { cn } from '@/shared/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Базовые стили
        'inline-flex items-center justify-center rounded-base font-medium',
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',

        // Варианты (используют CSS-переменные!)
        {
          'bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] hover:bg-[var(--color-button-primary-bg-hover)]':
            variant === 'primary',
          'bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] hover:bg-[var(--color-button-secondary-bg-hover)]':
            variant === 'secondary',
          'bg-[var(--color-button-ghost-bg)] text-[var(--color-button-ghost-text)] hover:bg-[var(--color-button-ghost-bg-hover)]':
            variant === 'ghost',
        },

        // Размеры
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
