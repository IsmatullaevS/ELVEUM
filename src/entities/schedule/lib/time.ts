
export const MINUTES_IN_DAY = 24 * 60;
export function minutesSinceMidnight(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
export function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}
