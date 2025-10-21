
import React from 'react';
import { Icon, IconName } from '@/shared/ui/Icon';

type TabItem = { key: string; label: string; icon: IconName };

export function SidePanel({
  open,
  onClose,
  tabs,
  active,
  onChange,
  children,
}: {
  open: boolean;
  onClose: () => void;
  tabs: readonly TabItem[];
  active: string;
  onChange: (key: string) => void;
  children: React.ReactNode;
}) {
    const noTabs = !tabs || tabs.length <= 1;
return (
    <div className={`fixed inset-0 z-[90] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* sheet */}
      <aside
        className={`absolute right-0 top-0 bottom-0 w-full max-w-[620px] bg-white border-l
                    transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ borderColor: 'rgba(0,0,0,.08)' }}
        role="dialog"
        aria-modal="true"
      >
        {/* internal close button (top-right) */}
        <button
          onClick={onClose}
          className={`absolute -left-14 top-6 h-11 w-11 rounded-full border grid place-items-center bg-white shadow-sm hover:bg-white 
                     transition-opacity transform active:scale-95 duration-150 ease-out 
                     outline-none focus:outline-none ring-0 focus:ring-0 
                     ${open ? "opacity-100" : "opacity-0"}`}
          style={{ borderColor: 'rgba(0,0,0,.06)' }}
          aria-label="Закрыть"
        >
          <Icon name="close" size={20} />
        </button>

        <div className={`h-full flex ${noTabs ? "" : ""}`}>
          {/* left nav */}
          { !noTabs && (
          <nav className="w-[220px] border-r pt-16" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
            {tabs.map((t) => {
              const activeItem = t.key === active;
              return (
                <button
                  key={t.key}
                  className={`relative w-full text-left flex items-center gap-3 px-4 py-3 transition
                              ${activeItem ? 'bg-[rgba(0,0,0,.04)] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-[var(--accent)] before:rounded-full' : 'hover:bg-[rgba(0,0,0,.03)]'}`}
                  onClick={() => onChange(t.key)}
                >
                  <Icon name={t.icon} size={30} />
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium truncate">{t.label}</div>
                  </div>
                </button>
              );
            })}
          </nav>
          )}

          {/* content area */}
          <main className="flex-1 overflow-y-auto pt-16 pb-10 px-10">
            {children}
          </main>
        </div>
      </aside>
    </div>
  );
}
