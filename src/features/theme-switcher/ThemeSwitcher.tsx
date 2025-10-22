'use client';

import { useTheme } from '@/shared/lib/theme/useTheme';
import { themes, ThemeId } from '@/shared/config/design-tokens/themes';
import { cn } from '@/shared/lib/utils';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      {Object.keys(themes).map((themeId) => (
        <button
          key={themeId}
          onClick={() => setTheme(themeId as ThemeId)}
          className={cn(
            'px-4 py-2 rounded-base transition-colors font-medium',
            theme === themeId
              ? 'bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)]'
              : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
          )}
        >
          {themes[themeId as ThemeId].name}
        </button>
      ))}
    </div>
  );
}
