import React from 'react';
import { cn } from '@/shared/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            // Базовые стили с CSS-переменными
            'w-full rounded-base px-4 py-2',
            'bg-[var(--color-input-bg)]',
            'border border-[var(--color-input-border)]',
            'text-[var(--color-input-text)]',
            'placeholder:text-[var(--color-input-placeholder)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-input-border-focus)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200',
            error && 'border-[var(--color-border-error)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[var(--color-text-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
