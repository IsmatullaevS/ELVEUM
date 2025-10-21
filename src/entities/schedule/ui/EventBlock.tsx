
import React from 'react';
import { minutesSinceMidnight } from '../lib/time';
import type { ScheduleEvent, Resource } from '../model/types';

type Props = {
  ev: ScheduleEvent;
  resource?: Resource;
  dayStart: Date;
  pxPerMin: number;
  onClick?: (ev: ScheduleEvent) => void;
};

export const EventBlock: React.FC<Props> = ({ ev, resource, dayStart, pxPerMin, onClick }) => {
  const start = new Date(ev.start);
  const end = new Date(ev.end);
  const startMin = minutesSinceMidnight(start);
  const endMin = minutesSinceMidnight(end);
  const y = startMin * pxPerMin;
  const h = Math.max((endMin - startMin) * pxPerMin, 20);
  const band = ev.color ?? resource?.color ?? 'var(--elv-primary)';

  return (
    <div
      role="button"
      onClick={() => onClick?.(ev)}
      className="absolute w-[96%] left-1/2 -translate-x-1/2 rounded-[10px] border shadow-[var(--elv-shadow)] 
                 bg-[color:var(--elv-event-bg)] border-[color:var(--elv-event-border)] 
                 hover:shadow-lg active:scale-[.98] transition-all duration-150"
      style={{ top: y, height: h }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-[10px]" style={{ background: band }} />
      <div className="px-3 py-1.5 text-sm leading-5 text-[color:var(--elv-muted)]">
        <div className="font-medium text-[color:var(--elv-primary)] truncate">{ev.title}</div>
        <div className="text-xs opacity-80">
          {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}&ndash;{end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
