/** Formats a Date for an <input type="datetime-local"> in local time. */
export function toDateTimeLocalValue(date: Date, includeSeconds = false): string {
  if (Number.isNaN(date.getTime())) return "";

  const pad = (value: number) => String(value).padStart(2, "0");
  const base = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;

  return includeSeconds ? `${base}:${pad(date.getSeconds())}` : base;
}
