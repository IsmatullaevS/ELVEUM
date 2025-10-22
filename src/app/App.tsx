import { CalendarDayPage } from "@/pages/calendar-day";
import { HomePage } from "@/pages/home";
import { CatalogPage } from "@/pages/CatalogPage";
import "@/shared/theme/apple.css";
import React from "react";
import { Routes, Route, Link, useLocation, useSearchParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { Icon } from "@/shared/ui/Icon";
import { SidePanel } from "@/shared/ui/SidePanel";
import { IconButton } from "@/shared/ui/IconButton";
import { UserMenu } from "@/features/user-menu";
import { useAppStore } from "@/shared/store/useAppStore";
import type { AppStore } from "@/shared/store/useAppStore";
import { initializeMockData } from "@/shared/data/mockData";
import { SimpleModePage } from "@/pages/SimpleModePage";
import { UIModeSwitch } from "@/features/ui-mode-switch/ui/UIModeSwitch";

const STR = {
  brand: "ELVEUM",
  chip_my: "Моя точка",
  chip_all: "Все точки",
  chip_platform: "Платформа",
  search_ph: "Поиск клиентов, брони, услуг",
  calendar_label: "Календарь",
  today: "Сегодня",
  today_title: "Сегодня (T)",
  prev_day: "Предыдущий день",
  next_day: "Следующий день",
  notifications: "Уведомления",
  support: "Поддержка",
  s_home: "Главная",
  s_work: "Работа",
  s_sales: "Продажи",
  s_clients: "Клиенты",
  s_catalog: "Каталог",
  s_online: "Онлайн-бронирование",
  s_marketing: "Маркетинг",
  s_team: "Команда",
  s_reports: "Отчеты",
  s_addons: "Дополнения",
  s_settings: "Настройки",
} as const;

const ICON = { base: 30, arrow: 30 } as const;

// ----------------- helpers -----------------
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = React.useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}

// Format a Date as YYYY-MM-DD in local time (no UTC shift)
function toLocalYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export type Scope = "my" | "all" | "platform";
function useScope() {
  const [scope, setScope] = useLocalStorage<Scope>("elveum:scope", "platform");
  return { scope, setScope } as const;
}

function useSelectedDate() {
  const [date, setDate] = useLocalStorage<string>(
    "elveum:selectedDate",
    toLocalYmd(new Date())
  );
  return { date, setDate } as const;
}

type CalendarView = "day" | "3days" | "week" | "month";
function useView(sectionKey: string) {
  const [view, setView] = useLocalStorage<CalendarView>(`elveum:view:${sectionKey}`, "day");
  return { view, setView } as const;
}

// ----------------- data -----------------
function sectionsFor(_scope: Scope) {
  return [
    { key: "home", label: STR.s_home, icon: "home", path: "/home", date: false },
    { key: "work", label: STR.s_work, icon: "work", path: "/work", date: true },
    { key: "sales", label: STR.s_sales, icon: "sales", path: "/sales", date: false },
    { key: "clients", label: STR.s_clients, icon: "clients", path: "/clients", date: false },
    { key: "catalog", label: STR.s_catalog, icon: "catalog", path: "/catalog", date: false },
    { key: "online", label: STR.s_online, icon: "online", path: "/online", date: false },
    { key: "marketing", label: STR.s_marketing, icon: "marketing", path: "/marketing", date: false },
    { key: "team", label: STR.s_team, icon: "team", path: "/team", date: false },
    { key: "reports", label: STR.s_reports, icon: "reports", path: "/reports", date: false },
    { key: "addons", label: STR.s_addons, icon: "addons", path: "/addons", date: false },
    { key: "settings", label: STR.s_settings, icon: "settings", path: "/settings", date: false },
  ] as const;
}

// ----------------- UI atoms -----------------
function ContextChip({ value, onChange }: { value: Scope; onChange: (s: Scope) => void }) {
  const items: { key: Scope; label: string }[] = [
    { key: "my", label: STR.chip_my },
    { key: "all", label: STR.chip_all },
    { key: "platform", label: STR.chip_platform },
  ];

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const btnRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [thumb, setThumb] = React.useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const setBtnRef = (k: string) => (el: HTMLButtonElement | null) => {
    btnRefs.current[k] = el;
  };

  const updateThumb = React.useCallback(() => {
    const el = btnRefs.current[value];
    if (!containerRef.current || !el) return;
    setThumb({ left: (el as HTMLElement).offsetLeft, width: (el as HTMLElement).offsetWidth });
  }, [value]);

  React.useLayoutEffect(() => {
    updateThumb();
  }, [updateThumb]);
  React.useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const ro = new ResizeObserver(() => updateThumb());
    ro.observe(c);
    return () => ro.disconnect();
  }, [updateThumb]);

  const idx = items.findIndex((i) => i.key === value);
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      onChange(items[(idx + 1) % items.length].key);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      onChange(items[(idx - 1 + items.length) % items.length].key);
      e.preventDefault();
    }
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Контекст"
      onKeyDown={onKeyDown}
      className="relative inline-flex items-center rounded-full bg-[var(--bg-secondary)] p-1 h-9 select-none"
    >
      <span
        className="absolute left-0 top-1 bottom-1 rounded-full bg-[var(--accent)] pointer-events-none
                   will-change-[transform,width]
                   transition-[transform,width] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                   motion-reduce:transition-none"
        style={{ transform: `translateX(${thumb.left}px)`, width: thumb.width || 0 }}
        aria-hidden
      />
      {items.map((it) => (
        <button
          key={it.key}
          ref={setBtnRef(it.key)}
          role="tab"
          aria-selected={value === it.key}
          onClick={() => onChange(it.key)}
          className={
            "relative z-[1] h-8 px-3 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap " +
            (value === it.key ? "text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")
          }
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function MiniCalendar({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const base = new Date(selected + "T00:00:00");
  base.setDate(1);
  const month = base.getMonth();
  const days: Date[] = [];
  const first = new Date(base);
  const offset = (first.getDay() + 6) % 7; // Monday first
  first.setDate(first.getDate() - offset);
  for (let i = 0; i < 42; i++) {
    const d = new Date(first);
    d.setDate(first.getDate() + i);
    days.push(d);
  }
  function color(d: Date) {
    const m = d.getMonth();
    if (m !== month) return "";
    const dd = d.getDate() % 3;
    return dd === 0 ? "bg-[#E5F7F2]" : dd === 1 ? "bg-[#FFF0F0]" : "bg-[#F5F7FF]";
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {base.toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="w-8 h-8 grid place-items-center rounded-full hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-tertiary)] transition-colors"
            onClick={() => {
              const d = new Date(base);
              d.setMonth(month - 1);
              onSelect(toLocalYmd(d));
            }}
            aria-label="Предыдущий месяц"
          >
            <Icon name="chevron_left" size={16} />
          </button>
          <button
            className="w-8 h-8 grid place-items-center rounded-full hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-tertiary)] transition-colors"
            onClick={() => {
              const d = new Date(base);
              d.setMonth(month + 1);
              onSelect(toLocalYmd(d));
            }}
            aria-label="Следующий месяц"
          >
            <Icon name="chevron_right" size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[11px] text-[var(--text-secondary)] mb-1">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((w) => (
          <div key={w} className="text-center">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const isCur = d.getMonth() === month;
          const label = d.getDate();
          const isSel = d.toDateString() === new Date(selected + "T00:00:00").toDateString();
          return (
            <button
              key={i}
              onClick={() => onSelect(toLocalYmd(d))}
              className={
                "h-8 rounded-full text-[12px] flex items-center justify-center " +
                (isCur ? color(d) : "opacity-40 ") +
                (isSel ? " ring-2 ring-[var(--accent)]" : "")
              }
              title={d.toLocaleDateString("ru-RU")}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SegmentedView({ value, onChange }: { value: CalendarView; onChange: (v: CalendarView) => void }) {
  const items = [
    { key: "day", label: "День" },
    { key: "3days", label: "3 дня" },
    { key: "week", label: "Неделя" },
    { key: "month", label: "Месяц" },
  ] as const;

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const btnRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [thumb, setThumb] = React.useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const setBtnRef = (k: string) => (el: HTMLButtonElement | null) => {
    btnRefs.current[k] = el;
  };

  const updateThumb = React.useCallback(() => {
    const el = btnRefs.current[value];
    if (!containerRef.current || !el) return;
    setThumb({ left: (el as HTMLElement).offsetLeft, width: (el as HTMLElement).offsetWidth });
  }, [value]);

  React.useLayoutEffect(() => {
    updateThumb();
  }, [updateThumb]);
  React.useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const ro = new ResizeObserver(() => updateThumb());
    ro.observe(c);
    return () => ro.disconnect();
  }, [updateThumb]);

  const idx = items.findIndex((i) => i.key === value);
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      onChange(items[(idx + 1) % items.length].key as CalendarView);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      onChange(items[(idx - 1 + items.length) % items.length].key as CalendarView);
      e.preventDefault();
    }
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Вид"
      onKeyDown={onKeyDown}
      className="relative inline-flex items-center rounded-full bg-[var(--bg-secondary)] p-1 h-9"
    >
      <span
        aria-hidden
        className="absolute left-0 top-1 bottom-1 rounded-full bg-[var(--accent)] pointer-events-none
                   will-change-[transform,width]
                   transition-[transform,width] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                   motion-reduce:transition-none"
        style={{ transform: `translateX(${thumb.left}px)`, width: thumb.width || 0 }}
      />
      {items.map((it) => (
        <button
          key={it.key}
          ref={setBtnRef(it.key)}
          role="tab"
          aria-selected={value === it.key}
          onClick={() => onChange(it.key as CalendarView)}
          className={
            "relative z-[1] h-8 px-3 rounded-full text-[14px] font-medium whitespace-nowrap transition-colors " +
            (value === it.key ? "text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")
          }
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

// ----------------- sheets -----------------
function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [q, setQ] = React.useState("");
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t as any);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const recent = [
    { id: "1", title: "Jack Doe", subtitle: "jack@example.com" },
    { id: "2", title: "Jane Doe", subtitle: "jane@example.com" },
    { id: "3", title: "John Doe", subtitle: "john@example.com" },
  ];

  return (
    <div className={`fixed inset-0 z-[100] ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-200 ease-out ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div
        className={`absolute inset-x-0 bottom-0 top-0 bg-white shadow-2xl transition-transform duration-200 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-10 h-10 rounded-full hover:bg-[var(--bg-secondary)] grid place-items-center"
          aria-label="Закрыть"
        >
          <Icon name="close" size={20} />
        </button>
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <div className="mb-6">
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Что вы ищете?"
              className="w-full text-5xl font-light outline-none border-b border-[var(--border-strong)] pb-3 placeholder:opacity-50"
            />
            <div className="text-[14px] text-[var(--text-secondary)] mt-2">Поиск по имени клиента, телефону, e‑mail или номеру брони</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="h3 mb-2">Предстоящие визиты</div>
              <div className="text-[14px] text-[rgba(11,15,20,.50)]">Не найдено</div>
            </div>
            <div>
              <div className="h3 mb-2">Клиенты (недавно добавленные)</div>
              <div className="divide-y" style={{ borderColor: "var(--border-medium)" }}>
                {recent.map((r) => (
                  <button key={r.id} className="w-full flex items-center gap-3 py-3 hover:bg-[var(--bg-secondary)] rounded px-1 text-left">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] grid place-items-center">
                      <Icon name="clients" size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate">{r.title}</div>
                      <div className="text-[12px] text-[var(--text-secondary)] truncate">{r.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  type Tab = "chat" | "help" | "news";
  const [tab, setTab] = React.useState<Tab>("chat");
  const tabs = [
    { key: "chat", label: "Чат", icon: "chat" },
    { key: "help", label: "Поддержка", icon: "help" },
    { key: "news", label: "Новости", icon: "news" },
  ] as const;

  return (
    <SidePanel open={open} onClose={onClose} tabs={tabs} active={tab} onChange={(k) => setTab(k as Tab)}>
      {tab === "chat" && (
        <div className="space-y-6">
          <h2 className="h2">Чат с клиентами</h2>
          <div className="rounded-xl border p-4 bg-gradient-to-b from-[rgba(0,0,0,.03)] to-white" style={{ borderColor: "var(--border-medium)" }}>
            <div className="mb-3 font-medium">В журнале и окне визита</div>
            <ul className="space-y-2 text-[14px]">
              {[
                "Вся переписка — в одном окне (Telegram, сайт, другие источники)",
                "Полная история диалога с клиентом",
                "Сообщения автоматически подтягиваются в визит",
                "Уведомления о новых сообщениях",
              ].map((s) => (
                <li key={s} className="flex items-center gap-1.5">
                  <Icon name="check" size={16} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button className="h-10 px-4 rounded-full bg-[var(--accent)] text-white hover:brightness-95">Подключить чат</button>
            </div>
          </div>
          <div>
            <div className="h3 mb-2">Недавние сообщения</div>
            <div className="divide-y rounded-xl border" style={{ borderColor: "var(--border-medium)" }}>
              {[
                { id: "m1", from: "Анна", channel: "Telegram", text: "Здравствуйте! Есть места на завтра?", time: "12:00" },
                { id: "m2", from: "Олег", channel: "Web", text: "Хочу перенести запись", time: "10:42" },
              ].map((m) => (
                <div key={m.id} className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] grid place-items-center">
                    <Icon name="chat" size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="font-medium">{m.from}</span> · {m.channel}
                      </div>
                      <div className="text-[12px] text-[var(--text-secondary)]">{m.time}</div>
                    </div>
                    <div className="text-[14px] text-[var(--text-secondary)] truncate">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "help" && (
        <div className="space-y-4">
          <h2 className="h2">Поддержка</h2>
          <p className="text-[14px] text-[var(--text-secondary)]">Мы рядом — задайте вопрос и команда ответит прямо здесь.</p>
        </div>
      )}

      {tab === "news" && (
        <div className="space-y-4">
          <h2 className="h2">Новости</h2>
          <p className="text-[14px] text-[var(--text-secondary)]">Обновления платформы, новые фичи и улучшения.</p>
        </div>
      )}
    </SidePanel>
  );
}

function PageStub() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[var(--radius-md)] border p-4 bg-white hover:shadow transition-shadow"
            style={{ borderColor: "rgba(0,0,0,.06)" }}
          >
            <div className="h-6 w-32 bg-[rgba(0,0,0,.06)] rounded mb-3" />
            <div className="h-3 w-full bg-[rgba(0,0,0,.06)] rounded mb-2" />
            <div className="h-3 w-3/4 bg-[rgba(0,0,0,.06)] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------- sidebar -----------------
function TooltipPortal({
  anchor,
  text,
  show,
  placement = 'right',
}: {
  anchor: HTMLElement | null;
  text: string;
  show: boolean;
  placement?: 'right' | 'bottom';
}) {
  const [pos, setPos] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

  React.useLayoutEffect(() => {
    if (!show || !anchor) return;
    const r = anchor.getBoundingClientRect();
    const p = placement === 'bottom'
      ? { top: Math.round(r.bottom + 10), left: Math.round(r.left + r.width / 2) }
      : { top: Math.round(r.top + r.height / 2), left: Math.round(r.right + 12) };
    setPos(p);
  }, [show, anchor, placement]);

  if (!show || !anchor) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <div
        className="px-3 py-1.5 rounded-lg text-white text-[13px] font-medium select-none relative"
        style={{
          backgroundColor: 'rgba(28,28,30,0.98)',
          boxShadow: '0 10px 30px rgba(0,0,0,.25), 0 4px 10px rgba(0,0,0,.18)',
          transform: placement === 'bottom' ? 'translate(-50%, 0)' : 'translate(0, -50%)',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
        {placement === 'bottom' ? (
          <span
            style={{
              position: 'absolute',
              top: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: '6px solid rgba(28,28,30,0.98)',
            }}
          />
        ) : (
          <span
            style={{
              position: 'absolute',
              left: -6,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '6px solid rgba(28,28,30,0.98)',
            }}
          />
        )}
      </div>
    </div>,
    document.body
  );
}
function Sidebar({ expanded, setExpanded }: { expanded: boolean; setExpanded: (v: boolean) => void }) {
  const location = useLocation();
  const { scope, setScope } = useScope();
  const { date, setDate } = useSelectedDate();
  const [calCollapsed, setCalCollapsed] = useLocalStorage<boolean>("elveum:calendarCollapsed", false);
  const sections = sectionsFor(scope);
  const [hoverEl, setHoverEl] = React.useState<HTMLElement | null>(null);
  const [hoverText, setHoverText] = React.useState("");

  // highlight for active row
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const rowRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const [hl, setHl] = React.useState<{ top: number; height: number }>({ top: 0, height: 0 });
  const setRowRef = (k: string) => (el: HTMLDivElement | null) => {
    rowRefs.current[k] = el;
  };

  const activeKey = React.useMemo(() => {
    const found = sections.find((x) => location.pathname.startsWith(x.path));
    return (found ? found.key : sections[0]?.key) as string;
  }, [location.pathname, sections]);

  const updateHL = React.useCallback(() => {
    const el = rowRefs.current[activeKey];
    if (!listRef.current || !el) return;
    const node = el as HTMLElement;
    setHl({ top: node.offsetTop, height: node.offsetHeight });
  }, [activeKey]);

  React.useLayoutEffect(() => {
    updateHL();
  }, [updateHL, expanded]);
  React.useEffect(() => {
    const c = listRef.current;
    if (!c) return;
    const ro = new ResizeObserver(() => updateHL());
    ro.observe(c);
    return () => ro.disconnect();
  }, [updateHL]);

  return (
    <aside className={`relative h-screen border-r bg-white flex flex-col ${expanded ? "w-[320px]" : "w-16"} transition-[width] duration-300 ease-out`}>
      <div className="px-2 py-2 border-b overflow-hidden">
        <div className="flex items-center justify-between gap-2 h-8">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-[var(--accent)]" />
            {expanded && <div className="text-[12px] font-medium">{STR.brand}</div>}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={expanded ? "w-10 h-10 grid place-items-center rounded-full hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-tertiary)] transition-colors" : "hidden"}
            title={expanded ? "Свернуть" : "Развернуть"}
          >
            <Icon name={expanded ? "chevron_left" : "chevron_right"} size={ICON.base} />
          </button>
        </div>
        {expanded && (
          <div className="px-3 py-2 overflow-hidden">
            <ContextChip value={scope} onChange={setScope} />
          </div>
        )}
      </div>

      {expanded ? (
        <>
          <div className={`grid transition-[grid-template-rows] duration-300 ${calCollapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}>
            <div className={`overflow-hidden transition-opacity duration-300 ${calCollapsed ? "opacity-0" : "opacity-100"}`}>
              <div className="p-3">
                <MiniCalendar selected={date} onSelect={setDate} />
              </div>
            </div>
          </div>
          <div className="relative h-0 border-b overflow-visible">
            <button
              type="button"
              onClick={() => setCalCollapsed(!calCollapsed)}
              aria-expanded={!calCollapsed}
              title={STR.calendar_label}
              className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 h-6 px-4 rounded-full text-white shadow-sm glass-accent z-10"
              style={{ bottom: 0 }}
            >
              <span className={`inline-block transition-transform duration-300 ${calCollapsed ? "" : "rotate-180"}`}>
                <Icon name="expand_more" size={12} />
              </span>
            </button>
          </div>
        </>
      ) : null}

      <nav className={`${expanded ? "sidebar-scroll" : "sidebar-scroll-hidden"} flex-1 overflow-y-auto pt-[2px] pb-10`} style={{ overflowX: "hidden" }}>
        <div ref={listRef} className="relative">
          <span
            aria-hidden
            className="absolute left-0 right-0 rounded-none bg-[rgba(58,58,60,.08)] z-0 transition-[transform,height] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ transform: `translateY(${hl.top}px)`, height: hl.height }}
          />
          <span
            aria-hidden
            className="absolute left-0 w-1 bg-[var(--accent)] z-0 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ transform: `translateY(${hl.top}px)`, height: hl.height }}
          />
          {sections.map((s) => {
            const active = location.pathname.startsWith(s.path);
            return (
              <div key={s.key} ref={setRowRef(s.key)} className="relative group z-[1]">
                <Link
                  to={s.path}
                  className={`w-full flex items-center ${expanded ? "gap-3" : "gap-0"} px-4 ${expanded ? "h-12" : "h-14"} text-[15px] font-medium transition-colors duration-200`}
                  onMouseEnter={(e) => {
                    setHoverEl(e.currentTarget as any);
                    setHoverText(s.label);
                  }}
                  onMouseLeave={() => setHoverEl(null)}
                >
                  <div className="w-10 flex items-center justify-center">
                    <Icon name={(s as any).icon as any} size={32} stroke={1.5} />
                  </div>
                  <div
                    className={`overflow-hidden transition-[max-width,opacity,margin] duration-300 ease-out ${
                      expanded ? "max-w-[180px] ml-3 opacity-100" : "max-w-0 ml-0 opacity-0"
                    }`}
                  >
                    <span className="truncate block">{s.label}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Развернуть"
          className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 h-11 w-7 rounded-full text-white shadow-sm glass-accent grid place-items-center z-20"
        >
          <Icon name="chevron_right" size={14} />
        </button>
      )}

      <TooltipPortal anchor={hoverEl} text={hoverText} show={!expanded && !!hoverEl} />
    </aside>
  );
}

// ----------------- right panel -----------------
function NotificationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  type Tab = "visits" | "reviews" | "online" | "actions";
  const [tab, setTab] = React.useState<Tab>("visits");

  const tabs = [
    { key: "visits", label: "Визиты", icon: "calendar_month" },
    { key: "reviews", label: "Отзывы", icon: "grade" },
    { key: "online", label: "Онлайн-продажи", icon: "sell" },
    { key: "actions", label: "Действие", icon: "bolt" },
  ] as const;

  return (
    <SidePanel open={open} onClose={onClose} tabs={tabs} active={tab} onChange={(k) => setTab(k as Tab)}>
      <div className="mb-6">
        <div className="h2">{tabs.find((x: any) => x.key === tab)?.label}</div>
      </div>

      <div className="rounded-2xl border p-10 text-center" style={{ borderColor: "var(--border-medium)" }}>
        <div className="mx-auto w-12 h-12 rounded-xl bg-[rgba(0,0,0,.05)] grid place-items-center mb-3">
          <Icon name="search" size={22} />
        </div>
        <div className="text-lg font-medium">Нет уведомлений</div>
        <div className="text-[13px] text-[var(--text-secondary)] mt-1">У вас пока нет уведомлений.</div>
      </div>
    </SidePanel>
  );
}

// ----------------- topbar -----------------
function Topbar() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();

  // states for sheets/panels
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [supportOpen, setSupportOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);

  const { scope } = useScope();
  const sections = sectionsFor(scope);
  const section = sections.find((s) => location.pathname.startsWith(s.path)) || sections[0];

  const { view, setView } = useView((section as any).key);
  React.useEffect(() => {
    const q = params.get("view") as CalendarView | null;
    if (q && q !== view) setView(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    const next = new URLSearchParams(params);
    next.set("view", view);
    setParams(next, { replace: true });
  }, [view]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="h-14 px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <nav className="text-[13px] text-[var(--text-secondary)] whitespace-nowrap flex items-center">
              <span className="font-medium text-[rgb(11,15,20)]">{section.label}</span>
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <IconButton name="search" label="Поиск" onClick={() => setSearchOpen(true)} />
            <IconButton name="help" label={STR.support} onClick={() => setSupportOpen(true)} />
            <IconButton name="notifications" label={STR.notifications} onClick={() => setNotifOpen(true)} />
            <UIModeSwitch />
            <UserMenu fullName="Akmal Muhtorov" />
          </div>
        </div>
      </header>

      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <SupportSheet open={supportOpen} onClose={() => setSupportOpen(false)} />
    </>
  );
}

// ----------------- toolbar under topbar -----------------
function TeamDropdown() {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const popRef = React.useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = React.useState<"planned" | "all">("all");
  const [selected, setSelected] = React.useState<Record<string, boolean>>({
    "Akmal Muhtorov (Вы)": true,
    "Wendy Smith (Demo)": false,
  });

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (popRef.current && !popRef.current.contains(t) && btnRef.current && !btnRef.current.contains(t)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const label = mode === "all" ? "Вся команда" : "Запланированная команда";

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="h-9 px-3 rounded-full bg-white border border-[var(--border-strong)] hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)] transition-colors text-[14px] font-medium flex items-center gap-2"
      >
        <span>{label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </button>

      <div
        ref={popRef}
        className={`absolute left-0 top-full mt-2 w-[280px] rounded-2xl border bg-white shadow-xl transition-opacity duration-150 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ borderColor: "var(--border-medium)" }}
      >
        <div className="py-2">
          {[
            { key: "planned", label: "Запланированная команда" },
            { key: "all", label: "Вся команда" },
          ].map((it) => (
            <button
              key={it.key}
              onClick={() => setMode(it.key as any)}
              className={`w-full text-left px-3 py-2.5 flex items-center gap-2 hover:bg-[var(--bg-secondary)] ${mode === it.key ? "bg-[var(--bg-secondary)]" : ""}`}
            >
              <Icon name="team" size={18} />
              <span className="text-[14px]">{it.label}</span>
            </button>
          ))}
          <div className="my-2 mx-3 border-t" style={{ borderColor: "var(--border-medium)" }} />
          <div className="px-3 pb-2 text-[13px] font-medium flex items-center justify-between">
            <span>Члены команды</span>
            <button
              className="text-[13px] text-[var(--accent)] hover:underline"
              onClick={() => setSelected({ "Akmal Muhtorov (Вы)": false, "Wendy Smith (Demo)": false })}
            >
              Очистить все
            </button>
          </div>
          <div className="px-3 pb-3 space-y-1">
            {Object.keys(selected).map((name) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer select-none py-1">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selected[name]}
                  onChange={(e) => setSelected({ ...selected, [name]: e.target.checked })}
                />
                <span className="text-[14px]">{name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FiltersPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  type Tab = "all";
  const tabs = [{ key: "all", label: "Все фильтры", icon: "settings" }] as const;
  return (
    <SidePanel open={open} onClose={onClose} tabs={tabs} active={"all"} onChange={() => {}}>
      <div className="flex items-center justify-between mb-6">
        <div className="h2">Все фильтры</div>
        <button className="h-9 px-3 rounded-full bg:white border border-[var(--border-strong)] text-[14px] font-medium inline-flex items-center gap-1">
          <span>Сохраненные фильтры</span>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </button>
      </div>

      <div className="divide-y rounded-xl border mb-8" style={{ borderColor: "var(--border-medium)" }}>
        {[
          { icon: "calendar_month", label: "Статус назначения" },
          { icon: "grade", label: "Тип" },
          { icon: "grade", label: "Канал" },
          { icon: "sell", label: "Статус платежа" },
          { icon: "tag", label: "Услуги", action: "Редактировать" },
          { icon: "calendar_month", label: "Дата создания записи" },
          { icon: "team", label: "Запрошенный участник команды" },
        ].map((it: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between p-4 hover:bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full grid place-items-center bg-[var(--bg-secondary)]">
                <Icon name={it.icon as any} size={18} />
              </div>
              <div className="text-[15px]">{it.label}</div>
            </div>
            <div className="flex items-center gap-3">
              {it.action ? <button className="text-[13px] text-[var(--accent)] hover:underline">{it.action}</button> : null}
              <Icon name="expand_more" size={16} className="-rotate-90" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button className="h-10 px-4 rounded-full border border-[var(--border-strong)] bg-white">Очистить фил...</button>
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 rounded-full border border-[var(--border-strong)] bg-white grid place-items-center">⋯</button>
          <button className="h-10 px-5 rounded-full bg-[var(--accent)] text-white hover:brightness-95">Применить</button>
        </div>
      </div>
    </SidePanel>
  );
}

function AddMenuButton(){
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement|null>(null);
  const popRef = React.useRef<HTMLDivElement|null>(null);

  React.useEffect(()=>{
    function onKey(e: KeyboardEvent){ if(e.key==='Escape') setOpen(false); }
    function onClick(e: MouseEvent){
      const t = e.target as Node;
      if(popRef.current && !popRef.current.contains(t) && btnRef.current && !btnRef.current.contains(t)){
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return ()=>{ window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick); };
  },[]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={()=>setOpen(v=>!v)}
        className="h-9 px-4 rounded-full bg-[var(--accent)] text-white text-[14px] font-medium inline-flex items-center gap-2 shadow-sm hover:brightness-105 active:brightness-95"
      >
        <span>Добавить</span>
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div
        ref={popRef}
        className={"absolute right-0 mt-2 w-[260px] rounded-2xl border bg-white shadow-xl transition-opacity duration-150 " + (open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
        style={{borderColor:'rgba(0,0,0,.08)'}}
      >
        <div className="p-2">
          {[
            {id:'visit', icon: 'calendar', label:'Визит'},
            {id:'group', icon: 'group', label:'Групповой визит'},
            {id:'blocked', icon: 'calendar-x', label:'Заблокированное время'},
            {id:'sales', icon: 'tag', label:'Продажи'},
            {id:'quickpay', icon: 'card', label:'Быстрая оплата'},
          ].map((it)=>(
            <button key={it.id} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-secondary)] text-left">
              {/* icons as inline svgs for reliability */}
              <span className="w-8 h-8 rounded-full grid place-items-center bg-[var(--bg-secondary)]">
                {it.icon==='calendar' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 2v3M17 2v3M4 9h16M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {it.icon==='group' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 11a4 4 0 1 0-8 0M3 20a6 6 0 0 1 18 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {it.icon==='calendar-x' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 2v3M17 2v3M4 9h16M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.5 13.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {it.icon==='tag' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 10l-8-8H6a2 2 0 0 0-2 2v6l8 8a2 2 0 0 0 2.8 0l5.2-5.2a2 2 0 0 0 0-2.8z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor"/>
                  </svg>
                )}
                {it.icon==='card' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.7"/>
                    <path d="M3 9h18M7 15h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  </svg>
                )}
              </span>
              <span className="text-[14px]">{it.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


// --- Panels: Calendar Settings & Waitlist ---
function CalendarSettingsPanel({open,onClose}:{open:boolean; onClose:()=>void}){
  const tabs = [{key:'main',label:'Настройки',icon:'settings'}] as const;
  const [scale, setScale] = React.useState(75);
  const [quick, setQuick] = React.useState(true);
  return (
    <SidePanel open={open} onClose={onClose} tabs={tabs} active={'main'} onChange={()=>{}}>
      <div className="space-y-8 pb-16">
        <h2 className="h2">Настройки календаря</h2>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Изменение масштаба календаря</div>
            <div className="text-[13px] text-[var(--text-secondary)]">{scale >= 66 ? 'Большой' : scale >= 33 ? 'Средний' : 'Маленький'}</div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={scale}
            onChange={(e)=>setScale(parseInt(e.target.value,10))}
            className="w-full accent-[var(--accent)]"
          />
        </div>

        <div className="pt-4">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <span className="mt-0.5 inline-flex items-center">
              <span
                onClick={()=>setQuick(!quick)}
                className={"w-10 h-6 rounded-full p-0.5 transition bg-[rgba(0,0,0,.15)] " + (quick ? "bg-[var(--accent)]/70" : "")}
                role="switch"
                aria-checked={quick}
              >
                <span className={"block w-5 h-5 rounded-full bg-white shadow transition-transform " + (quick ? "translate-x-4" : "")} />
              </span>
            </span>
            <span>
              <div className="font-medium">Показывать быстрые действия в календаре</div>
              <div className="text-[13px] text-[var(--text-secondary)]">Быстро добавляйте встречи или блокируйте время, нажимая на ячейку календаря</div>
            </span>
          </label>
        </div>

        <div className="sticky bottom-0 bg-white border-t pt-4 pb-3" style={{borderColor:'rgba(0,0,0,.08)'}}>
          <button onClick={onClose} className="w-full h-12 rounded-full bg-[var(--accent)] text-white hover:brightness-95">Применить изменения</button>
        </div>
      </div>
    </SidePanel>
  );
}

function WaitlistPanel({open,onClose}:{open:boolean; onClose:()=>void}){
  const tabs = [{key:'main',label:'Список ожидания',icon:'calendar_month'}] as const;
  const [tab,setTab] = React.useState<'queue'|'expired'|'booked'>('queue');
  return (
    <SidePanel open={open} onClose={onClose} tabs={tabs} active={'main'} onChange={()=>{}}>
      <div className="pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="h2">Список ожидания</h2>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-full border border-[var(--border-strong)] bg-white grid place-items-center">⋯</button>
            <button className="h-9 px-4 rounded-full bg-[var(--accent)] text-white hover:brightness-95">Добавить</button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button className="h-9 px-3 rounded-full bg-white border border-[var(--border-strong)] text-[14px]">Все предстоя…</button>
          <button className="h-9 px-3 rounded-full bg-white border border-[var(--border-strong)] text-[14px]">Создано (от старых к н…)</button>
          <button className="h-9 w-9 rounded-full border border-[var(--border-strong)] bg-white grid place-items-center">
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 6h18M6 12h12M10 18h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="border-b mb-4" style={{borderColor:'rgba(0,0,0,.08)'}}>
          {['Ожидание','Срок действия истек','Забронировано'].map((t,i)=>{
            const k = i===0?'queue':i===1?'expired':'booked';
            const active = (k as any)===tab;
            return (
              <button key={k} onClick={()=>setTab(k as any)} className={"px-3 py-2 text-[14px] mr-2 " + (active ? "border-b-2 border-black font-medium" : "text-[var(--text-secondary)]")}>
                {t} <span className="opacity-60">0</span>
              </button>
            );
          })}
        </div>

        <div className="text-center py-24">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[rgba(0,0,0,.05)] grid place-items-center mb-3">
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M7 2v3M17 2v3M4 9h16M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="text-lg font-medium">Нет записей в списке ожидания</div>
          <div className="text-[13px] text-[var(--text-secondary)] mt-1">У вас нет клиентов в списке ожидания</div>
        </div>
      </div>
    </SidePanel>
  );
}
// --- end Panels ---
function StickySubheader() {
  const location = useLocation();
  const { date, setDate } = useSelectedDate();
  const { scope } = useScope();
  const sections = sectionsFor(scope);
  const section = sections.find((s) => location.pathname.startsWith(s.path)) || sections[0];
  const isDate = Boolean((section as any).date);
  const { view, setView } = useView((section as any).key);
  const [calSettingsOpen, setCalSettingsOpen] = React.useState(false);
  const [waitlistOpen, setWaitlistOpen] = React.useState(false);
  const [tipEl, setTipEl] = React.useState<HTMLElement|null>(null);
  const [tipText, setTipText] = React.useState("");
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  function shiftDate(deltaDays: number) {
    const d = new Date(date + "T00:00:00");
    d.setDate(d.getDate() + deltaDays);
    setDate(toLocalYmd(d));
  }

  if (!isDate) return null;

  return (
    <>
      <div className="sticky top-0 z-40 bg-[rgb(243,245,248)]/90 backdrop-blur border-b" role="toolbar" aria-label="Управление календарём">
        <div className="h-14 px-4 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              className="h-9 px-3 rounded-full text-[14px] font-medium bg-white border border-[var(--border-strong)] hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)] transition-colors"
              onClick={() => setDate(toLocalYmd(new Date()))}
              title={STR.today_title}
            >
              {STR.today}
            </button>

            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                aria-label={STR.prev_day}
                className="w-9 h-9 grid place-items-center rounded-full border border-[var(--border-strong)] bg-white hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)] transition-colors"
                onClick={() => shiftDate(-1)}
              >
                <Icon name="chevron_left" size={ICON.arrow} />
              </button>

              <div className="min-w-[88px] text-[13px] font-medium text-[var(--text-secondary)] text-center select-none">
                {(() => {
                  const d = new Date(date + "T00:00:00");
                  const wd = d.toLocaleDateString("ru-RU", { weekday: "short" }).replace(".", "");
                  const mn = d.toLocaleDateString("ru-RU", { month: "short" }).replace(".", "");
                  const dd = d.getDate();
                  const cap = wd.charAt(0).toUpperCase() + wd.slice(1);
                  return `${cap} ${dd} ${mn}`;
                })()}
              </div>

              <button
                type="button"
                aria-label={STR.next_day}
                className="w-9 h-9 grid place-items-center rounded-full border border-[var(--border-strong)] bg-white hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)] transition-colors"
                onClick={() => shiftDate(1)}
              >
                <Icon name="chevron_right" size={ICON.arrow} />
              </button>
          <div className="flex items-center gap-2 ml-2">
            <TeamDropdown />
            <button
              type="button"
              className="h-8 px-4 grid place-items-center rounded-full border border-[var(--border-strong)] bg-white hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)] transition-colors"
              aria-label="Фильтры"
              onMouseEnter={(e)=>{ setTipEl(e.currentTarget as any); setTipText('Фильтры'); }}
              onMouseLeave={()=>setTipEl(null)}
              onClick={()=>setFiltersOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="[&_path]:vector-effect-non-scaling-stroke [shape-rendering:geometricPrecision]">
                <path d="M3 6h18M6 12h12M10 18h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          
            </div>
          </div><div className="ml-auto flex items-center gap-2">
<div className="flex items-center gap-2 mr-2">
            <button
              type="button"
              onMouseEnter={(e)=>{ setTipEl(e.currentTarget as any); setTipText('Настройки календаря'); }}
              onMouseLeave={()=>setTipEl(null)}
              onClick={()=>setCalSettingsOpen(true)}
              className="h-8 px-4 grid place-items-center rounded-full border border-[var(--border-strong)] bg-white hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)] transition-colors"
              aria-label="Настройки календаря"
            >
              <Icon name="settings" size={18} stroke={1.7} className="[&_path]:vector-effect-non-scaling-stroke [shape-rendering:geometricPrecision]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onMouseEnter={(e)=>{ setTipEl(e.currentTarget as any); setTipText('Список ожидания'); }}
              onMouseLeave={()=>setTipEl(null)}
              onClick={()=>setWaitlistOpen(true)}
              className="h-8 px-4 grid place-items-center rounded-full border border-[var(--border-strong)] bg-white hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)] transition-colors"
              aria-label="Список ожидания"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="[&_path]:vector-effect-non-scaling-stroke [shape-rendering:geometricPrecision]">
                <rect x="4" y="5" width="16" height="15" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="1.7"/>
                <path d="M8 3v4M16 3v4M12 11v4l3 1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
<div className="flex items-center gap-2">
            <SegmentedView value={view} onChange={(v) => setView(v)} />
            <AddMenuButton/>
          </div>
</div>

          
          
          





                  </div>
      </div>

      <FiltersPanel open={filtersOpen} onClose={() => setFiltersOpen(false)} />
      <CalendarSettingsPanel open={calSettingsOpen} onClose={() => setCalSettingsOpen(false)} />
      <WaitlistPanel open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <TooltipPortal anchor={tipEl} text={tipText} show={!!tipEl} placement='bottom' />

    </>
  );
}

// ----------------- layout -----------------
function Layout() {
  const [expanded, setExpanded] = useLocalStorage<boolean>("elveum:sidebar", true);
  const { scope } = useScope();
  const sections = sectionsFor(scope);
  const uiMode = useAppStore((state: AppStore) => state.uiMode);

  // Initialize mock data on mount
  React.useEffect(() => {
    initializeMockData();
  }, []);

  // Simple mode view
  if (uiMode === 'simple') {
    return (
      <div className="min-h-screen bg-[var(--bg-secondary)]">
        <Topbar />
        <SimpleModePage />
      </div>
    );
  }

  // Full mode view
  return (
    <div className="h-screen w-full overflow-x-hidden bg-[rgb(247,248,250)] text-[rgb(11,15,20)]">
      <div className="flex h-full">
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar />
          <div className="flex-1 overflow-auto">
            <StickySubheader />
            <Routes>
              {sections.map((s) => (
                <Route key={s.key} path={s.path} element={s.key === "home" ? <HomePage /> : (s.key === "work" ? <CalendarDayPage /> : (s.key === "catalog" ? <CatalogPage /> : <PageStub />))} />
              ))}
              <Route path="*" element={<PageStub />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- tests -----------------
function runSelfTests() {
  try {
    const arr = sectionsFor("platform" as any);
    console.assert(Array.isArray(arr) && arr.length === 11, "Должно быть 11 разделов");
    const keys = arr.map((x: any) => x.key).join(",");
    console.assert(
      keys === "home,work,sales,clients,catalog,online,marketing,team,reports,addons,settings",
      "Порядок разделов не совпадает"
    );
    console.assert(arr.filter((x: any) => x.date).map((x: any) => x.key).join(",") === "work", "date=true только у work");
  } catch (e) {
    console.warn("Self-tests could not run:", e);
  }
}
runSelfTests();

export default function App() {
  return <Layout />;
}
