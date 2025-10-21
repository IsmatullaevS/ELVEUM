
export type Resource = {
  id: string;
  name: string;
  avatarUrl?: string;
  color?: string;
};

export type ScheduleEvent = {
  id: string;
  resourceId: string;
  title: string;
  start: string;
  end: string;
  status?: 'default' | 'busy' | 'blocked' | 'group';
  note?: string;
  color?: string;
};
