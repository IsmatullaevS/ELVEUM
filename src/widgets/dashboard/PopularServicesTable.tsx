import React from "react";

type Row = { name: string; mThis: number; mPrev: number; };

const PopularServicesTable: React.FC<{rows?: Row[]}> = ({rows}) => {
  const data = rows ?? [
    {name:'Стрижка', mThis:2, mPrev:0},
    {name:'Цвет волос', mThis:1, mPrev:0},
    {name:'Укладка волос феном', mThis:1, mPrev:0},
  ];
  return (
    <div className="card">
      <div className="card-header">Популярные услуги</div>
      <div className="card-content">
        <table className="table">
          <thead>
            <tr>
              <th>Услуга</th>
              <th>В этом месяце</th>
              <th>Прошлый месяц</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r,i)=>(
              <tr key={i}>
                <td>{r.name}</td>
                <td className="mono">{r.mThis}</td>
                <td className="mono">{r.mPrev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopularServicesTable;
