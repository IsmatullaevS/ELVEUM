import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@/shared/ui/Avatar";

type UserMenuProps = {
  fullName: string;
  email?: string;
  onLogout?: () => void;
};


function InsetDivider(){
  return (
    <div className="px-4 my-2">
      <div className="h-px bg-[var(--c-border,#e5e7eb)] rounded"></div>
    </div>
  );
}
export const UserMenu: React.FC<UserMenuProps> = ({ fullName, email, onLogout }) => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full pl-2 pr-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-primary)]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar fullName={fullName} size={40} />
        <span className="sr-only">Открыть меню пользователя</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-5 w-[380px] max-w-[92vw] rounded-2xl overflow-hidden bg-[var(--c-surface,#ffffff)] shadow-[0_16px_40px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
        >
          <div className="flex gap-3 p-4">
            <Avatar fullName={fullName} size={44} />
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-[var(--c-text,#111827)] truncate">
                {fullName || "Пользователь"}
              </div>
              <div className="text-[13px] text-[var(--c-text-muted,#6b7280)] truncate">
                Отзывов пока нет
              </div>
            </div>
          </div>

          <div className="px-4 pb-3">
  <Link
    to="/verify-email"
    className="group flex items-center justify-between gap-3 rounded-xl bg-[var(--c-warn-soft,#fff7ed)] hover:bg-[var(--c-warn-soft-2,#ffedd5)] border border-[var(--c-warn-border,#fed7aa)] px-4 py-3"
  >
    <div className="min-w-0">
      <div className="text-[15px] font-semibold text-[var(--c-text,#111827)]">Подтвердите адрес эл. почты</div>
      <div className="text-[13px] text-[var(--c-text-muted,#6b7280)] mt-0.5">Защитите свою учетную запись</div>
    </div>
    <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </Link>
</div>

          <InsetDivider/>

          <nav className="py-1 text-[15px]" aria-label="User menu actions">
            <Link to="/profile" className="block px-4 py-2.5 mx-4 rounded-lg hover:bg-[var(--c-hover,#EEF1F4)] transition-colors">
              <span className="text-[var(--c-text,#111827)]">Мой профиль</span>
            </Link>
            <Link to="/settings" className="block px-4 py-2.5 mx-4 rounded-lg hover:bg-[var(--c-hover,#EEF1F4)] transition-colors">
              <span className="text-[var(--c-text,#111827)]">Личные настройки</span>
            </Link>
          <InsetDivider/>
            <Link to="/help" className="block px-4 py-2.5 mx-4 rounded-lg hover:bg-[var(--c-hover,#EEF1F4)] transition-colors">
              <span className="text-[var(--c-text,#111827)]">Помощь и поддержка</span>
            </Link>
            <Link to="/lang" className="block px-4 py-2.5 mx-4 rounded-lg hover:bg-[var(--c-hover,#EEF1F4)] transition-colors">
              <span className="text-[var(--c-text,#111827)]">русский ru</span>
            </Link>
            <div className="px-4 pb-3">
              <button
                onClick={onLogout}
                className="w-full text-left rounded-lg px-4 py-2.5 hover:bg-[var(--c-hover,#EEF1F4)] transition-colors text-[var(--c-text,#111827)]"
              >
                Выйти
              </button>
            </div>
    
          </nav>
        </div>
      )}
    </div>
  );
};