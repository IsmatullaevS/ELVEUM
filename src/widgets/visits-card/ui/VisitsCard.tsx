import React from "react";

export type Visit = {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  status: "Выполнено" | "Забронировано" | "Отменено" | "Неявка";
};

type Props = {
  title?: string;
  items?: Visit[];
  visibleRows?: number; // how many rows visible before scroll
  className?: string;
};

const scoped = `
.vc-scope .vc-scroll{max-height:var(--vc-list-max,400px);overflow:auto;-webkit-overflow-scrolling:touch;padding-right:12px;scrollbar-gutter:stable}
.vc-scope .vc-scroll::-webkit-scrollbar{width:8px}
.vc-scope .vc-scroll::-webkit-scrollbar-thumb{background:rgba(0,0,0,.28);border-radius:8px;border:2px solid transparent;background-clip:padding-box}
.vc-scope .vc-scroll:hover::-webkit-scrollbar-thumb{background:rgba(0,0,0,.36)}
.vc-scope .vc-scroll{scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.36) transparent}
.vc-scope .vc-title{font-family:var(--font-heading);font-weight:700;font-size:18px;line-height:1.35}
.vc-scope .vc-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 0}
.vc-scope .vc-list .vc-row + .vc-row{border-top:1px solid var(--card-border)}
/* status variants scoped to avoid affecting global .badge */
.vc-scope .badge[data-v=booked]{color:#0A5DC3;background:rgba(0,122,255,.12);border-color:rgba(0,122,255,.24)}
.vc-scope .badge[data-v=done]{color:#1E7A3F;background:rgba(52,199,89,.14);border-color:rgba(52,199,89,.30)}
.vc-scope .badge[data-v=canceled]{color:#B00020;background:rgba(255,59,48,.12);border-color:rgba(255,59,48,.28)}
.vc-scope .badge[data-v=no-show]{color:#9A5B00;background:rgba(255,149,0,.14);border-color:rgba(255,149,0,.30)}
`;

const variantFor = (status: Visit["status"]) =>
  status === "Выполнено" ? "done" :
  status === "Отменено" ? "canceled" :
  status === "Неявка"   ? "no-show" : "booked";

export const VisitsCard: React.FC<Props> = ({ title = "Визиты", items, visibleRows = 4, className }) => {
  const demo: Visit[] = items ?? [
    { id:"1", date:"пн, 13 окт. 2025 11:50", title:"Стрижка", subtitle:"Без предварительной записи, 45 мин · Wendy", status:"Выполнено" },
    { id:"2", date:"пн, 13 окт. 2025 10:00", title:"Укладка волос феном", subtitle:"Jack Doe, 35 мин · Wendy", status:"Забронировано" },
    { id:"3", date:"пн, 13 окт. 2025 13:00", title:"Цвет волос", subtitle:"Jane Doe, 1 ч 15 мин · Akmal", status:"Забронировано" },
    { id:"4", date:"пн, 13 окт. 2025 11:00", title:"Стрижка", subtitle:"John Doe, 45 мин · Akmal", status:"Забронировано" },
    { id:"5", date:"пн, 13 окт. 2025 14:20", title:"Бритьё опасной бритвой", subtitle:"Timur, 30 мин · Said", status:"Забронировано" },
    { id:"6", date:"пн, 13 окт. 2025 15:40", title:"Коррекция усов", subtitle:"Elyor, 15 мин · Bek", status:"Забронировано" },
    { id:"7", date:"пн, 13 окт. 2025 17:00", title:"Стрижка бороды", subtitle:"Aziz, 25 мин · Zafar", status:"Забронировано" },
    { id:"8", date:"пн, 13 окт. 2025 18:30", title:"Укладка", subtitle:"Otabek, 20 мин · Alex", status:"Выполнено" },
  ];

  const listMax = Math.round(visibleRows * 100); // ~100px per row

  return (
    <div className={`vc-scope card ${className ?? ""}`} style={{}}>
      <style dangerouslySetInnerHTML={{__html: scoped}} />
      <div className="card-header">{title}</div>
      <div className="card-content" style={{display:"flex",flexDirection:"column",minHeight:0}}>
        <div className="vc-scroll" style={{ ["--vc-list-max" as any]: `${listMax}px` }}>
          <div className="vc-list">
            {demo.map((it) => (
              <div className="vc-row" key={it.id}>
                <div style={{display:"grid",gap:4}}>
                  <div className="text-sm text-[var(--subtle)]">{it.date}</div>
                  <div className="vc-title">{it.title}</div>
                  {it.subtitle ? <div className="small">{it.subtitle}</div> : null}
                </div>
                <span className="badge" data-v={variantFor(it.status)}>{it.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
