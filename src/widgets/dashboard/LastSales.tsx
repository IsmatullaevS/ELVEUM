import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";

type Point = { label: string; labelFull?: string; a: number; b: number };
const fmt = (n:number) => new Intl.NumberFormat("ru-RU",{minimumFractionDigits:0, maximumFractionDigits:0}).format(n);
const NBSP = String.fromCharCode(160);
const nb = (s:string)=> s.replace(/\s/g, NBSP);

/** Build time series for last N days with a spike on the most recent Monday */
function buildSeries(days:number): Point[]{
  const today = new Date();
  const lastMonday = new Date(today);
  const mondayOffset = (today.getDay() + 6) % 7; // Mon=0
  lastMonday.setDate(today.getDate() - mondayOffset);
  const fmtWeek = new Intl.DateTimeFormat("ru-RU",{weekday:"short"});
  const fmtWeekLong = new Intl.DateTimeFormat("ru-RU",{weekday:"long"});
  const fmtMonShort = new Intl.DateTimeFormat("ru-RU",{month:"short"});
  const out: Point[] = [];
  for(let i=0;i<days;i++){
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const wd = fmtWeek.format(d).replace(".","");
    const wdLong = fmtWeekLong.format(d);
    const monShort = fmtMonShort.format(d);
    const isSpike = d.toDateString() === lastMonday.toDateString();
    out.push({ label: `${wd} ${d.getDate()}`.trim(), labelFull: `${wdLong}, ${d.getDate()} ${monShort}`.trim(), a: isSpike ? 40 : 0, b: isSpike ? 172 : 0 });
  }
  return out;
}


const Chart: React.FC<{data:Point[]; w?:number; h?:number}> = ({data, w=620, h=280}) => {
  // Responsive width based on container
  const wrapRef = useRef<HTMLDivElement|null>(null);
  const [cw, setCw] = useState(w);
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new (window as any).ResizeObserver((entries: any) => {
      const width = entries[0].contentRect.width;
      setCw(Math.max(420, Math.round(width))); // guard minimal width
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Geometry derived from measured width
  const [M, setM] = useState({ L: 52, R: 16, T: 28, B: 48 });
  const {L, R, T, B} = M; // dynamic margins based on labels
  const svgRef = useRef<SVGSVGElement|null>(null)
  const W = cw;
  const innerW = W - L - R, innerH = h - T - B;
  const xs = (i:number)=> L + i * (innerW / Math.max(1,(data.length-1)));
  const rawMax = Math.max(1, ...data.map(d=> Math.max(d.a,d.b)));
  const niceNum = (range:number, round:boolean) => {
    const exp = Math.floor(Math.log10(range || 1));
    const f = range / Math.pow(10, exp);
    const nf = round ? (f<1.5?1:f<3?2:f<7?5:10) : (f<=1?1:f<=2?2:f<=5?5:10);
    return nf * Math.pow(10, exp);
  };
  const niceRange = niceNum(rawMax, false);
  const step = niceNum(niceRange/4, true);
  const niceMax = step*4;
  const useCompact = niceMax >= 100000;
  const fmtCompact = new Intl.NumberFormat("ru-RU",{notation:"compact", maximumFractionDigits:1});

  const ys = (v:number)=> T + (1 - v/niceMax) * innerH;
  const ticks = Array.from({length:5}, (_,i)=> i*step);

  const [hover, setHover] = useState<number|null>(null);
  // Recompute dynamic paddings after render to avoid label clipping
  useLayoutEffect(()=>{
    if(!svgRef.current) return;
    const svg = svgRef.current as unknown as SVGSVGElement;
    const yTicks = Array.from(svg.querySelectorAll('.ytick')) as any[];
    let Lnew = L, Rnew = R, Bnew = B;
    if (yTicks.length){
      const maxYw = Math.max(...yTicks.map((el:any)=> (el as SVGGraphicsElement).getBBox().width));
      Lnew = Math.max(40, Math.ceil(8 + maxYw + 8)); // left axis spacing
    }
    const lastLabel = svg.querySelector('.xlabel-last') as any;
    if (lastLabel){
      const bb = (lastLabel as SVGGraphicsElement).getBBox();
      const overflow = Math.max(0, bb.x + bb.width - (W - 4));
      Rnew = Math.max(12, Math.ceil(overflow + 8));
    }
    const xLabels = Array.from(svg.querySelectorAll('.xlabel')) as any[];
    if (xLabels.length){
      const maxH = Math.max(...xLabels.map((el:any)=> (el as SVGGraphicsElement).getBBox().height));
      Bnew = Math.max(40, Math.ceil(24 + maxH));
    }
    if (Lnew!==L || Rnew!==R || Bnew!==B){
      setM({L: Lnew, R: Rnew, T, B: Bnew});
    }
  }, [W, h, T, B, JSON.stringify(ticks), JSON.stringify(data.map(d=>d.label))]);

  const tipRef = useRef<HTMLDivElement|null>(null);
  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const stepX = innerW / Math.max(1,(data.length-1));
    const idx = Math.min(data.length-1, Math.max(0, Math.round((x - L)/stepX)));
    setHover(idx);
  };

  const tipStyle: React.CSSProperties | undefined = hover===null ? undefined : (()=>{
    const p = data[hover!];
    const x = xs(hover!);
    const yA = ys(p.a), yB = ys(p.b);
    const anchorY = Math.min(yA,yB);
    const m = 12;
    const tipW = tipRef.current?.offsetWidth ?? 220;
    const tipH = tipRef.current?.offsetHeight ?? 80;
    let left = x + m;
    const rightBound = L + innerW;
    if (left + tipW > rightBound) left = x - tipW - m;
    left = Math.max(L+4, Math.min(left, rightBound - tipW - 4));
    let top = anchorY - tipH - m;
    if (top < T) top = anchorY + m;
    top = Math.max(T+4, Math.min(top, T+innerH - tipH - 4));
    return { position:"absolute", left, top, pointerEvents:"none", transition:"left 140ms ease, top 140ms ease" };
  })();

  const labelStep = data.length > 20 ? 3 : data.length > 12 ? 2 : 1;

  const path = (key:'a'|'b', color:string) => {
    const d = data.map((pt,i)=> `${i?'L':'M'} ${xs(i)} ${ys(pt[key])}`).join(' ');
    return <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />;
  };

  return (
    <div ref={wrapRef} className="relative">
      <svg ref={svgRef} width={W} height={h} onMouseMove={onMove} onMouseLeave={()=>setHover(null)}>
        {ticks.map((val,i)=>{
          const y = ys(val);
          return (
            <g key={i}>
              <line x1={L} x2={L+innerW} y1={y} y2={y} stroke="var(--apple-gray-5)" />
              <text x={L-8} y={y+4} textAnchor="end" className="small ytick">{useCompact ? `${fmtCompact.format(val)} UZS` : `${fmt(val)} UZS`}</text>
            </g>
          );
        })}
        {path('a','var(--apple-indigo)')}
        {path('b','var(--apple-green)')}
        {data.map((p,i)=>(
          <g key={i}>
            <circle cx={xs(i)} cy={ys(p.a)} r={3} fill="var(--apple-indigo)" />
            <circle cx={xs(i)} cy={ys(p.b)} r={3} fill="var(--apple-green)" />
          </g>
        ))}
        {data.map((p,i)=>{
          if (i % labelStep !== 0 && i !== data.length-1) return null;
          const x = xs(i), y = T + innerH + 18;
          return <text key={i} x={x} y={y} textAnchor="middle" transform={`rotate(-18 ${x} ${y})`} className={`small xlabel${i === data.length-1 ? " xlabel-last" : ""}`}>{p.label}</text>;
        })}
        {hover!==null && <line x1={xs(hover)} x2={xs(hover)} y1={T} y2={T+innerH} stroke="var(--apple-gray-4)"/>}
      </svg>
      {hover!==null && (
        <div ref={tipRef} style={tipStyle}>
          <div className="card" style={{padding:"8px 12px"}}>
            <div className="font-medium" style={{fontSize:13}}>{data[hover!].labelFull ?? data[hover!].label}</div>
            <div className="small" style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{width:10,height:10,borderRadius:999,background:"var(--apple-indigo)",display:"inline-block"}}/> Продажи <span className="mono">{fmt(data[hover!].a)} UZS</span>
            </div>
            <div className="small" style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{width:10,height:10,borderRadius:999,background:"var(--apple-green)",display:"inline-block"}}/> Визиты <span className="mono">{fmt(data[hover!].b)} UZS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const LastSales: React.FC = () => {
  type SalesPeriod = "p7" | "p30";
  const [period, setPeriod] = useState<SalesPeriod>("p7");
  const SALES_LABELS: Record<SalesPeriod,string> = { p7: "Последние 7 дней", p30: "Последние 30 дней" };
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<SalesPeriod>(period);
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

  const days = period==="p30" ? 30 : 7;
  const data = useMemo(()=> buildSeries(days), [period]);

  const totalSales = data.reduce((s,p)=> s+p.a, 0);
  const totalVisits = data.reduce((s,p)=> s+p.b, 0);
  const visits = 4;

  return (
    <div ref={cardRef} className="card relative">
      <div className="card-header flex items-center justify-between">
        <div>
          <div>Последние продажи</div>
          <div className="small soft" style={{marginTop:4, fontWeight:400}}>{SALES_LABELS[period]}</div>
        </div>
        <button ref={btnRef} className="icon-button" aria-label="menu" onClick={()=>{ setLocal(period); setOpen(v=>!v); }}>⋯</button>
      </div>

      {open && (
        <div ref={panelRef} className="card panel" style={{position:'absolute', zIndex:20, left: panelPos.left, top: panelPos.top, maxWidth:'min(508px, calc(100% - 32px))', padding:16}}>
          <div className="h3" style={{marginBottom:8}}>Временной период</div>
          <div style={{position:'relative'}}>
            <select className="select" value={local} onChange={e=>setLocal(e.target.value as SalesPeriod)}
              style={{width:'100%',height:44,padding:'0 40px 0 14px',border:'1px solid var(--card-border)',borderRadius:9999}}>
              <option value="p7">Последние 7 дней</option>
              <option value="p30">Последние 30 дней</option>
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

      <div className="card-content">
        <div className="kpi mono">{nb(`${fmt(totalSales)} UZS`)}</div>
        <div style={{marginTop:8}}>
          <div><span className="soft" style={{color:"rgba(60,60,67,0.60)"}}>Визиты </span><span className="mono">{visits}</span></div>
          <div><span className="soft" style={{color:"rgba(60,60,67,0.60)"}}>Стоимость визитов </span><span className="mono">{nb(`${fmt(totalVisits)} UZS`)}</span></div>
        </div>
        <div style={{marginTop:16}}>
          <Chart data={data} />
        </div>
        <div className="small" style={{display:'flex', gap:24, marginTop:8}}>
          <span style={{display:'inline-flex',alignItems:'center', gap:8}}>
            <i style={{width:10,height:10,borderRadius:999,background:"var(--apple-indigo)",display:'inline-block'}}/> Продажи
          </span>
          <span style={{display:'inline-flex',alignItems:'center', gap:8}}>
            <i style={{width:10,height:10,borderRadius:999,background:"var(--apple-green)",display:'inline-block'}}/> Визиты
          </span>
        </div>
      </div>
    </div>
  );
};

export default LastSales;
