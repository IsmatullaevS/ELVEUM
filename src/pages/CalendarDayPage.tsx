
import React from 'react';
import { DayCalendar } from '@/entities/schedule/ui/DayCalendar';
import type { Resource, ScheduleEvent } from '@/entities/schedule/model/types';

const resources: Resource[] = [
  { id: 'r1', name: 'Akmal Muhtorov', color: '#7C3AED' },
  { id: 'r2', name: 'Wendy Smith (Demo)', color: '#06B6D4' },
];

const todayISO = new Date().toISOString().slice(0,10);
const events: ScheduleEvent[] = [
  { id:'e1', resourceId:'r1', title:'15:35', start:`${todayISO}T15:35:00`, end:`${todayISO}T16:25:00` },
  { id:'e2', resourceId:'r2', title:'14:25', start:`${todayISO}T14:25:00`, end:`${todayISO}T15:10:00` },
];

export default function CalendarDayPage() {
  const day = new Date();
  return (
    <div className="h-[calc(100vh-64px)]">
      <DayCalendar
        day={day}
        resources={resources}
        events={events}
        startHour={8}
        endHour={22}
        minuteStep={15}
        pxPerMin={1.5}
        onEventClick={(ev)=>console.log('open event', ev)}
        onQuickAction={(p)=>console.log('quick action', p)}
      />
    </div>
  );
}


