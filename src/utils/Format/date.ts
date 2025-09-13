export function FormatDateTime(isoString: Date | null) {
  if (!isoString) return "";

  const date = new Date(isoString);

  // Ambil bagian tanggal
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // bulan 0-11
  const year = date.getFullYear();

  // Ambil bagian waktu
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}


export function CalculateDuration(createdAt: Date, progress_end: Date | null) {
  if (!progress_end) {
    return null; // progress belum selesai, jadi tidak ada durasi
  }

  const start = new Date(createdAt).getTime();
  const end = new Date(progress_end).getTime();

  if (end < start) {
    return null; // data tidak valid
  }

  const diffMs = end - start; // selisih dalam ms
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffHours / 24);
  const hours = diffHours % 24;

  return {
    days,
    hours,
    text: `${days} hari ${hours} jam`,
  };
}
