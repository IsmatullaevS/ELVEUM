import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, addDays, subDays, startOfWeek, endOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';

// ========== CLASS NAMES ==========

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========== DATE FORMATTING ==========

export function formatDate(date: string | Date, formatStr: string = 'dd.MM.yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: ru });
}

export function formatTime(time: string): string {
  return time;
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd.MM.yyyy HH:mm', { locale: ru });
}

export function formatRelativeDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  const yesterday = subDays(today, 1);
  const tomorrow = addDays(today, 1);

  const dateStr = format(dateObj, 'yyyy-MM-dd');
  const todayStr = format(today, 'yyyy-MM-dd');
  const yesterdayStr = format(yesterday, 'yyyy-MM-dd');
  const tomorrowStr = format(tomorrow, 'yyyy-MM-dd');

  if (dateStr === todayStr) return 'Сегодня';
  if (dateStr === yesterdayStr) return 'Вчера';
  if (dateStr === tomorrowStr) return 'Завтра';

  return format(dateObj, 'd MMMM', { locale: ru });
}

export function formatDayOfWeek(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEEE', { locale: ru });
}

export function getToday(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getTomorrow(): string {
  return format(addDays(new Date(), 1), 'yyyy-MM-dd');
}

export function getYesterday(): string {
  return format(subDays(new Date(), 1), 'yyyy-MM-dd');
}

export function getWeekRange(date?: Date): { start: Date; end: Date } {
  const baseDate = date || new Date();
  return {
    start: startOfWeek(baseDate, { weekStartsOn: 1 }),
    end: endOfWeek(baseDate, { weekStartsOn: 1 }),
  };
}

// ========== CURRENCY FORMATTING ==========

export function formatCurrency(amount: number, currency: 'UZS' | 'USD' = 'UZS'): string {
  if (currency === 'UZS') {
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' сум';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatCompactCurrency(amount: number, currency: 'UZS' | 'USD' = 'UZS'): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M ${currency === 'UZS' ? 'сум' : '$'}`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K ${currency === 'UZS' ? 'сум' : '$'}`;
  }
  return formatCurrency(amount, currency);
}

// Alias for formatCurrency
export const formatPrice = formatCurrency;

// ========== PHONE FORMATTING ==========

export function formatPhone(phone: string): string {
  // Format: +998 90 123 45 67
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('998')) {
    return `+998 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`;
  }
  return phone;
}

// ========== DURATION FORMATTING ==========

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} мин`;
  }
  if (mins === 0) {
    return `${hours} ч`;
  }
  return `${hours} ч ${mins} мин`;
}

// ========== STATUS HELPERS ==========

export function getVisitStatusColor(status: string): string {
  const colors = {
    upcoming: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
    no_show: 'bg-orange-100 text-orange-700',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
}

export function getVisitStatusLabel(status: string): string {
  const labels = {
    upcoming: 'Предстоит',
    in_progress: 'В процессе',
    completed: 'Завершен',
    cancelled: 'Отменен',
    no_show: 'Не пришел',
  };
  return labels[status as keyof typeof labels] || status;
}

export function getPaymentMethodLabel(method: string): string {
  const labels = {
    cash: 'Наличные',
    card: 'Карта',
    transfer: 'Перевод',
  };
  return labels[method as keyof typeof labels] || method;
}

// ========== TIME HELPERS ==========

export function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function addMinutesToTime(time: string, minutes: number): string {
  const totalMinutes = parseTimeToMinutes(time) + minutes;
  return formatMinutesToTime(totalMinutes);
}

export function isTimeInRange(time: string, start: string, end: string): boolean {
  const timeMinutes = parseTimeToMinutes(time);
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);
  return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
}

// ========== VALIDATION ==========

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

// ========== ARRAY HELPERS ==========

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

// ========== ID GENERATION ==========

export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${timestamp}${random}` : `${timestamp}${random}`;
}

// ========== LOCAL STORAGE ==========

export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function removeFromStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}
