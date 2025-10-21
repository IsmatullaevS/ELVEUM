import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

const EmptyChartIcon: React.FC<{className?: string}> = ({className=""}) => (
  <svg className={className} width="112" height="112" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <g strokeWidth="3" strokeLinecap="round">
      <path d="M8 18 L8 11"/>
      <path d="M12 18 L12 13"/>
      <path d="M16 18 L16 9"/>
    </g>
  </svg>
);

const UpcomingVisits: React.FC = () => {
  type NextPeriod = "n7" | "n30";
  const [period, setPeriod] = useState<NextPeriod>("n7");
  const NEXT_LABELS: Record<NextPeriod,string> = { n7: "Следующие 7 дней", n30: "Следующие 30 дней" };
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<NextPeriod>(period);
  const btnRef = useRef<HTMLButtonElement|null>(null);
  const panelRef = useRef<HTMLDivElement|null>(null);
  const cardRef = useRef<HTMLDivElement|null>(null);
  const [panelPos, setPanelPos] = useState<{left:number; top:number}>({left: 16, top: 72});
  const placePanel = () => {
    if (!cardRef.current || !btnRef.current || !panelRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    const btnRect  = btnRef.current.getBoundingClientRect();
    const panelW = panelRef.current.offsetWidth;
    const leftRaw = (btnRect.right - cardRect.left) - panelW;
    const left = Math.max(16, Math.min(leftRaw, cardRect.width - panelW - 16));
    const top = (btnRect.bottom - cardRect.top) + 12;
    setPanelPos({left, top});
  };
  useLayoutEffect(()=>{ if (open) placePanel(); }, [open]);
  useEffect(()=>{ if(!open) return; const onR=()=>placePanel(); window.addEventListener('resize', onR); return ()=>window.removeEventListener('resize', onR); }, [open]);


  useEffect(()=>{
    const onDown = (e:PointerEvent)=>{
      if(!open) return;
      const t = e.target as Node;
      if(panelRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e:KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return ()=>{ document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); }
  },[open]);

  return (
    <div ref={cardRef} className="card relative" style={{minHeight: 360}}>
      <div className="card-header flex items-center justify-between">
        <div>
          <div>Предстоящие визиты</div>
          <div className="small soft" style={{marginTop:4, fontWeight:400}}>{NEXT_LABELS[period]}</div>
        </div>
        <button ref={btnRef} className="icon-button" aria-label="menu" onClick={()=>{ setLocal(period); setOpen(v=>!v); }}>⋯</button>
      </div>

      {open && (
        <div ref={panelRef} className="card panel" style={{position:'absolute', zIndex:20, left: panelPos.left, top: panelPos.top, maxWidth:'min(508px, calc(100% - 32px))', padding:16}}>
          <div className="h3" style={{marginBottom:8}}>Временной период</div>
          <div style={{position:'relative'}}>
            <select className="select" value={local} onChange={e=>setLocal(e.target.value as NextPeriod)}
              style={{width:'100%',height:44,padding:'0 40px 0 14px',border:'1px solid var(--card-border)',borderRadius:9999}}>
              <option value="n7">Следующие 7 дней</option>
              <option value="n30">Следующие 30 дней</option>
            </select>
            <svg style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}} width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex" style={{gap:12, marginTop:12}}>
            <button className="btn-ghost" onClick={()=> setOpen(false)}>Закрыть</button>
            <button className="btn" onClick={()=>{ setPeriod(local); setOpen(false); }}>Применить изменения</button>
          </div>
        </div>
      )}

      <div className="card-content flex flex-col items-center justify-center text-center" style={{minHeight: 420}}>
        <div className="mt-2 mb-6">
          <EmptyChartIcon className="text-[var(--apple-gray-1)]" />
        </div>
        <div className="text-xl font-semibold">Ваш график пуст</div>
        <div className="small" style={{maxWidth:420, marginLeft:"auto", marginRight:"auto"}}>
          Забронируйте несколько визитов, чтобы здесь отобразились запланированные данные
        </div>
      </div>
    </div>
  );
};

export default UpcomingVisits;
