import React from 'react';
import {
  Home, Calendar, Wallet, Users, Scissors, Ticket,
  Megaphone, BadgeCheck, TrendingUp, Puzzle, Settings,
  Search, HelpCircle, Bell, MessageCircle, Newspaper,
  CheckCircle, Mail, ExternalLink,
  ChevronLeft, ChevronRight, User, X, ChevronUp, ChevronDown,
  Zap, Tag, Star, CalendarDays, ShoppingBag
} from 'lucide-react';

export type IconName =
  | 'home' | 'work' | 'sales' | 'clients' | 'catalog' | 'online' | 'marketing'
  | 'team' | 'reports' | 'addons' | 'settings'
  | 'search' | 'help' | 'notifications' | 'chat' | 'news' | 'check' | 'mail' | 'external'
  | 'chevron_left' | 'chevron_right' | 'user' | 'close' | 'expand_less' | 'expand_more'
  | 'calendar_month' | 'grade' | 'sell' | 'bolt' | 'tag';

const map: Record<IconName, React.ComponentType<any>> = {
  home: Home,
  work: Calendar,
  sales: Wallet,
  clients: Users,
  catalog: Scissors,
  online: Ticket,
  marketing: Megaphone,
  team: BadgeCheck,
  reports: TrendingUp,
  addons: Puzzle,
  settings: Settings,
  search: Search,
  help: HelpCircle,
  notifications: Bell,
  calendar_month: CalendarDays,
  grade: Star,
  sell: ShoppingBag,
  tag: Tag,
  bolt: Zap,
  chat: MessageCircle,
  news: Newspaper,
  check: CheckCircle,
  mail: Mail,
  external: ExternalLink,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  user: User,
  close: X,
  expand_less: ChevronUp,
  expand_more: ChevronDown,
};

export function Icon({
  name,
  size = 24,
  stroke = 1.5,
  className = '',
}: {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const Component = map[name];
  return (
    <Component
      size={size}
      strokeWidth={stroke}
      className={className}
      style={{
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  );
}
