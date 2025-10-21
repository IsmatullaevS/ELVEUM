
import React from 'react';
import { minutesSinceMidnight, sameDay } from '../lib/time';

export const NowMarker: React.FC<{ day: Date; pxPerMin: number }> = ({ day, pxPerMin }) => {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  if (!sameDay(now, day)) return null;

  const y = minutesSinceMidnight(now) * pxPerMin;
  const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="pointer-events-none absolute left-0 right-0" style={{ top: y }}>
      <div className="relative">
        <div className="absolute left-0 -translate-x-1/2 bg-[color:var(--elv-surface)] text-[color:var(--elv-danger)] border border-[color:var(--elv-danger)] px-2 py-[2px] rounded-full text-xs font-medium shadow-[var(--elv-shadow)]">
          {timeLabel}
        </div>
        <div className="h-[1.5px] bg-[color:var(--elv-danger)] w-full"></div>
      </div>
    </div>
  );
};
