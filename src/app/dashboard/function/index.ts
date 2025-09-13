// utils/dateFormatter.ts
export function formatDate(date?: Date | string, withTime = false): string {
  if (!date) return "-";

  // kalau input masih string dari API
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) return "-"; // antisipasi invalid date

  return withTime
    ? parsedDate.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : parsedDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}
