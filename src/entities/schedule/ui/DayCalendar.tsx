import React from 'react';
import type { Resource, ScheduleEvent } from '../model/types';
import { NowMarker } from './NowMarker';
import { EventBlock } from './EventBlock';

type WorkHours = { start: string; end: string; };
type Props = {
  day: Date; resources: Resource[]; events: ScheduleEvent[];
  startHour?: number; endHour?: number; minuteStep?: number; pxPerMin?: number;
  workHours?: Record<string, WorkHours>; autoScrollToNow?: boolean;
  onQuickAction?: (p:{type:'visit'|'group'|'blocked';at:Date;resourceId?:string})=>void;
  onCreate?: (p:{start:Date;end:Date;resourceId:string})=>void;
  onEventClick?: (ev: ScheduleEvent)=>void;
};
function parseHHMM(s:string){const [h,m]=s.split(':').map(Number);return h*60+m;}
export const DayCalendar: React.FC<Props> = ({
  day, resources, events, startHour=8, endHour=22, minuteStep=15, pxPerMin=1.5,
  workHours, autoScrollToNow=true, onQuickAction, onCreate, onEventClick
})=>{
  const totalMinutes=(endHour-startHour)*60, gridHeight=totalMinutes*pxPerMin;
  const dayStart=new Date(day); dayStart.setHours(0,0,0,0);
  const hours:number[]=[]; for(let h=startHour;h<=endHour;h++) hours.push(h);
  const [menu,setMenu]=React.useState<null|{x:number;y:number;at:Date;resourceId?:string}>(null);
  const containerRef=React.useRef<HTMLDivElement>(null);
  const [drag,setDrag]=React.useState<null|{startY:number;endY:number;resourceId:string;originClientX:number;originClientY:number;}>(null);
  const [hoverMin,setHoverMin]=React.useState<number|null>(null);
  const yToDate=(y:number)=>{const minutes=Math.round(y/pxPerMin/minuteStep)*minuteStep+startHour*60; const d=new Date(dayStart); d.setMinutes(minutes); return d;};
  const clientYToLocalY=(clientY:number)=>{const b=containerRef.current?.getBoundingClientRect(); if(!b) return 0; return clientY-b.top-56;};
  function onGridPointerDown(e:React.PointerEvent, resourceId:string){(e.target as Element).setPointerCapture(e.pointerId); const y=clientYToLocalY(e.clientY); setDrag({startY:y,endY:y,resourceId,originClientX:e.clientX,originClientY:e.clientY}); setMenu(null);}
  function onGridPointerMove(e:React.PointerEvent){const yLocal=clientYToLocalY(e.clientY); const minutes=Math.round(yLocal/pxPerMin/minuteStep)*minuteStep+startHour*60; setHoverMin(minutes); if(drag){setDrag(d=>d?{...d,endY:yLocal}:d);}}
  function onGridPointerUp(e:React.PointerEvent){ if(!drag) return; (e.target as Element).releasePointerCapture(e.pointerId); const startY=Math.min(drag.startY,drag.endY); const endY=Math.max(drag.startY,drag.endY); const start=yToDate(startY); const end=yToDate(endY+1); const rid=drag.resourceId; const dx=Math.abs(e.clientX-drag.originClientX), dy=Math.abs(e.clientY-drag.originClientY); setDrag(null); if(dx<3 && dy<3){ setMenu({x:e.clientX,y:e.clientY,at:start,resourceId:rid}); return;} if(onCreate) onCreate({start,end,resourceId:rid}); }
  React.useEffect(()=>{ if(!autoScrollToNow) return; const now=new Date(); if(now.toDateString()!==day.toDateString()) return; const y=((now.getHours()*60+now.getMinutes())-startHour*60)*pxPerMin; containerRef.current?.scrollTo({top:Math.max(0,y-200),behavior:'smooth'}); },[]);
  return (<div className="flex flex-col bg-[color:var(--elv-bg)] text-[color:var(--elv-muted)]">
    <div className="sticky top-0 z-20 bg-[color:var(--elv-panel)] border-b elv-border">
      <div className="grid" style={{gridTemplateColumns:`120px repeat(${resources.length}, 1fr)`}}>
        <div className="h-[72px]"></div>
        {resources.map(r=>(<button key={r.id} className="h-[72px] flex items-center gap-3 px-4 text-left hover:bg-[rgba(37,99,235,.06)] transition-colors">
          <div className="relative h-12 w-12 rounded-full ring-2 ring-[color:var(--elv-primary)] overflow-hidden shrink-0" style={{background:'linear-gradient(180deg, rgba(99,102,241,.25), rgba(99,102,241,0))'}}>
            {r.avatarUrl? <img src={r.avatarUrl} alt={r.name} className="h-full w-full object-cover"/> : <div className="h-full w-full grid place-items-center text-[color:var(--elv-primary)] font-semibold">{r.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()}</div>}
          </div><div className="font-medium">{r.name}</div></button>))}
      </div>
    </div>
    <div ref={containerRef} className="relative flex-1 select-none" onPointerMove={onGridPointerMove}>
      <div className="relative min-h-[600px]">
        <div className="grid" style={{gridTemplateColumns:`120px repeat(${resources.length}, 1fr)`}}>
          <div className="relative" style={{height:gridHeight}}>
            {hours.map((h,i)=>{const y=(i*60)*pxPerMin; return (<div key={h} className="absolute left-0 right-2" style={{top:y}}>
              <button className="text-xs tabular-nums text-right pr-3 translate-y-[-8px] select-none opacity-80 hover:opacity-100 w-full" onClick={()=>containerRef.current?.scrollTo({top:y-100,behavior:'smooth'})}>{`${strPad(h)}:00`}</button>
              <div className="h-[1.5px] bg-[color:var(--elv-grid-strong)]"></div>
              {[15,30,45].map(m=>{const yy=y+m*pxPerMin; return <div key={m} className="absolute left-0 right-0 h-[1px] bg-[color:var(--elv-grid)]" style={{top:yy}}/>})}
            </div>)})}
          </div>
          {resources.map(r=>{ const wh=workHours?.[r.id]??{start:'09:00',end:'18:00'}; const wStart=parseHHMM(wh.start), wEnd=parseHHMM(wh.end);
            const yStart=(wStart-startHour*60)*pxPerMin, yEnd=(wEnd-startHour*60)*pxPerMin;
            return (<div key={r.id} className="relative border-l elv-border" style={{height:gridHeight}}
                    onPointerDown={(e)=>onGridPointerDown(e as any,r.id)} onPointerUp={(e)=>onGridPointerUp(e as any)} onContextMenu={(e)=>{e.preventDefault(); setMenu({x:e.clientX,y:e.clientY,at:yToDate(clientYToLocalY(e.clientY)),resourceId:r.id});}}>
              {yStart>0 && <div className="absolute left-0 right-0" style={{top:0,height:yStart,background:'var(--elv-hatch)'}}/>}
              {yEnd<gridHeight && <div className="absolute left-0 right-0" style={{top:yEnd,height:gridHeight-yEnd,background:'var(--elv-hatch)'}}/>}
              {hours.map((h,i)=>{const y=(i*60)*pxPerMin; return (<div key={h} className="absolute left-0 right-0" style={{top:y}}>
                <div className="h-[1.5px] bg-[color:var(--elv-grid-strong)]"></div>
                {[15,30,45].map(m=>{const yy=y+m*pxPerMin; return <div key={m} className="absolute left-0 right-0 h-[1px] bg-[color:var(--elv-grid)]" style={{top:yy}}/>})}
              </div>)})}
              {hoverMin!==null && <div className="pointer-events-none absolute left-0 right-0" style={{top:(hoverMin-startHour*60)*pxPerMin}}><div className="h-[1px] bg-[rgba(37,99,235,.2)]"></div></div>}
              {drag && drag.resourceId===r.id && (()=>{const top=Math.min(drag.startY,drag.endY); const height=Math.max(4,Math.abs(drag.endY-drag.startY));
                const startLbl=yToDate(top).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}); const endLbl=yToDate(top+height).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
                return (<div className="absolute left-[2%] right-[2%] rounded-[10px] border border-[color:var(--elv-primary)] bg-[rgba(37,99,235,.08)]" style={{top, height}}>
                  <div className="absolute -top-5 left-1 text-[11px] bg-white/90 text-black px-1.5 py-[1px] rounded">{startLbl}–{endLbl}</div>
                </div>);})()}
              {events.filter(e=>e.resourceId===r.id).map(ev=>(<EventBlock key={ev.id} ev={ev} resource={r} dayStart={dayStart} pxPerMin={pxPerMin} onClick={onEventClick}/>))}
            </div>);
          })}
        </div>
        <div className="absolute left-[120px] right-0"><NowMarker day={day} pxPerMin={pxPerMin}/></div>
      </div>
    </div>
    {menu && (<div className="fixed z-30" style={{left:menu.x,top:menu.y}}><div className="elv-card w-[320px] overflow-hidden">
      <div className="bg-[color:var(--elv-surface)] px-4 py-3 text-sm font-semibold flex items-center justify-between">
        <span>{menu.at.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
        <button className="opacity-60 hover:opacity-100" onClick={()=>setMenu(null)}>✕</button>
      </div>
      <div className="p-2">
        {[{k:'visit',label:'Добавить визит'},{k:'group',label:'Добавить групповой визит'},{k:'blocked',label:'Заблокировать время'}].map(it=>(
          <button key={it.k} onClick={()=>{onQuickAction?.({type:it.k as any, at:menu.at, resourceId:menu.resourceId}); setMenu(null);}} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[color:var(--elv-event-bg)]">{it.label}</button>
        ))}
        <div className="px-3 pt-1 pb-2 text-xs opacity-70">Настройки быстрых действий</div>
      </div></div></div>)}
  </div>);
};
function strPad(n:number){return n.toString().padStart(2,'0');}
