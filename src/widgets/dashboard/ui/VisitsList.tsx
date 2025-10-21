import React from "react";

type Item = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  status: 'Выполнено' | 'Забронировано';
};

const Chip: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span className="badge">{children}</span>
);

const VisitsList: React.FC<{items?: Item[]}> = ({items}) => {
  const demo: Item[] = items ?? [
    {id:'1', date:'пн, 13 окт. 2025 11:50', title:'Стрижка', subtitle:'Без предварительной записи, 45 мин with Wendy', status:'Выполнено'},
    {id:'2', date:'пн, 13 окт. 2025 10:00', title:'Укладка волос феном', subtitle:'Jack Doe, 35 мин with Wendy', status:'Забронировано'},
    {id:'3', date:'пн, 13 окт. 2025 13:00', title:'Цвет волос', subtitle:'Jane Doe, 1 ч 15 мин with Akmal', status:'Забронировано'},
    {id:'4', date:'пн, 13 окт. 2025 11:00', title:'Стрижка', subtitle:'', status:'Забронировано'},
  ];

  return (
    <div className="card">
      <div className="card-header">Визиты</div>
      <div className="card-content">
        <div className="divide-y" style={{maxHeight: 420, overflowY: 'auto'}}>
          {demo.map(it => (
            <div key={it.id} className="py-3 flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-[var(--subtle)]">{it.date}</div>
                <div className="font-semibold leading-6">{it.title}</div>
                <div className="small">{it.subtitle}</div>
              </div>
              <Chip>{it.status}</Chip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitsList;
