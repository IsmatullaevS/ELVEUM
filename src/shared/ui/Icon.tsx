import React from 'react';
import {
  IconHome, IconCalendar, IconWallet, IconUsers, IconScissors, IconTicket,
  IconSpeakerphone, IconIdBadge2, IconChartLine, IconPuzzle, IconSettings,
  IconSearch, IconHelpCircle, IconBell, IconMessage, IconNews,
  IconCircleCheck, IconMail, IconExternalLink,
  IconChevronLeft, IconChevronRight, IconUser, IconX, IconArrowUp, IconArrowDown, IconBolt, IconTag, IconStar
} from '@tabler/icons-react';

export type IconName =
  | 'home' | 'work' | 'sales' | 'clients' | 'catalog' | 'online' | 'marketing'
  | 'team' | 'reports' | 'addons' | 'settings'
  | 'search' | 'help' | 'notifications' | 'chat' | 'news' | 'check' | 'mail' | 'external'
  | 'chevron_left' | 'chevron_right' | 'user' | 'close' | 'expand_less' | 'expand_more' | 'calendar_month' | 'grade' | 'sell' | 'bolt' | 'tag';

const map: Record<IconName, React.ComponentType<any>> = {
  home: IconHome,
  work: IconCalendar,
  sales: IconWallet,
  clients: IconUsers,
  catalog: IconScissors,
  online: IconTicket,
  marketing: IconSpeakerphone,
  team: IconIdBadge2,
  reports: IconChartLine,
  addons: IconPuzzle,
  settings: IconSettings,
  search: IconSearch,
  help: IconHelpCircle,
  notifications: IconBell,
  calendar_month: IconCalendar,
  grade: IconStar,
  sell: IconTag,
  tag: IconTag,
  bolt: IconBolt,
  chat: IconMessage,
  news: IconNews,
  check: IconCircleCheck,
  mail: IconMail,
  external: IconExternalLink,
  chevron_left: IconChevronLeft,
  chevron_right: IconChevronRight,
  user: IconUser,
  close: IconX,
  expand_less: IconArrowUp,
  expand_more: IconArrowDown,
};

export function Icon({
  name,
  size = 30,
  stroke = 1.5,
  className,
}: { name: IconName; size?: number; stroke?: number; className?: string }) {
  const C = map[name];
  return <C size={size} stroke={stroke} className={className} />;
}
