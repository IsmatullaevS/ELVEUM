import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    const hasError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2 rounded-md border transition-all duration-200',
            'text-sm text-slate-900 placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            hasError
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
              : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900',
            className
          )}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-rose-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
