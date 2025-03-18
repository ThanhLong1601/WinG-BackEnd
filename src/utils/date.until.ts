export function convertTimezoneToString(timezone: number): string {
  const sign = timezone >= 0 ? '+' : '-';
  const absTimezone = Math.abs(timezone);
  const hour = Math.floor(absTimezone);
  const minute = Math.round((absTimezone - hour) * 60);

  return `${sign}${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}