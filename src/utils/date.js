export function toDateTimeLocal(date) {
  return date.toISOString().slice(0, 16);
}
