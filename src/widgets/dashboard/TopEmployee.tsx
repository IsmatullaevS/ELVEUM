import React from "react";

type Row = { name: string; thisMonth: number; prevMonth: number; };

const TopEmployee: React.FC<{rows?: Row[]}> = ({rows}) => {
  const data = rows ?? [{name:'Wendy Smith (Demo)', thisMonth: 40_00, prevMonth: 0}];
  const fmtUZS = (n:number)=> new Intl.NumberFormat('ru-RU',{minimumFractionDigits:2}).format(n).replace(',', '.') + ' UZS';

  return (
    <div className="card">
      <div className="card-header">Лучший сотрудник</div>
      <div className="card-content">
        <table className="table">
          <thead>
            <tr>
              <th>Член команды</th>
              <th>В этом месяце</th>
              <th>Прошлый месяц</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r,i)=>(
              <tr key={i}>
                <td>{r.name}</td>
                <td className="mono">{fmtUZS(r.thisMonth)}</td>
                <td className="mono">{fmtUZS(r.prevMonth)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopEmployee;
