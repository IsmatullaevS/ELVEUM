import { useAppStore } from '@/shared/store/useAppStore';
import type { AppStore } from '@/shared/store/useAppStore';
import { Icon } from '@/shared/ui/Icon';
import { cn } from '@/shared/lib/utils';

export function UIModeSwitch() {
  const uiMode = useAppStore((state: AppStore) => state.uiMode);
  const toggleUIMode = useAppStore((state: AppStore) => state.toggleUIMode);

  return (
    <button
      onClick={toggleUIMode}
      className={cn(
        'flex items-center gap-2 h-9 px-3 rounded-full',
        'text-sm font-medium transition-all',
        'hover:bg-[var(--bg-tertiary)]',
        'border border-[var(--border)]'
      )}
      title={uiMode === 'simple' ? 'Переключить на полный режим' : 'Переключить на простой режим'}
    >
      <Icon
        name={uiMode === 'simple' ? 'Layout' : 'LayoutGrid'}
        size={16}
        className="text-[var(--text-secondary)]"
      />
      <span className="text-[var(--text-primary)]">
        {uiMode === 'simple' ? 'Простой' : 'Полный'}
      </span>
    </button>
  );
}
