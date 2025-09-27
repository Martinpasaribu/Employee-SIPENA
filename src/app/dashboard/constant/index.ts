// utils/brokenType.ts
export const getBrokenType = (status: string) => {
  switch (status) {
    case "S":
      return {
        label: "Sedang",
        className: "bg-green-100 text-green-700",
      };
    case "R":
      return {
        label: "Ringan",
        className: "bg-yellow-100 text-yellow-700",
      };
    case "B":
      return {
        label: "Berat",
        className: "bg-red-100 text-red-700",
      };
    default:
      return {
        label: status, // fallback ke kode aslinya
        className: "bg-gray-100 text-gray-700",
      };
  }
};

export const TypeReport = (status: string) => {
  switch (status) {
    case "BL":
      return {
        label: "Bangunan Lainnya",
        className: "bg-green-100 text-green-700",
      };
    case "BK":
      return {
        label: "Bangunan Kantor",
        className: "bg-yellow-100 text-yellow-700",
      };
    case "M":
      return {
        label: "Mesin",
        className: "bg-yellow-100 text-yellow-700",
      };
    case "K":
      return {
        label: "Komplain",
        className: "bg-red-100 text-red-700",
      };
    default:
      return {
        label: status, // fallback ke kode aslinya
        className: "bg-gray-100 text-gray-700",
      };
  }
};

export const Progress = (status: string) => {

  switch (status) {
    case "A":
      return {
        label: "Antrian",
        className: "bg-gray-100 text-gray-700",
      };
    case "P":
      return {
        label: "Di Proses",
        className: "bg-yellow-100 text-yellow-700",
      };
    case "S":
      return {
        label: "Selesai",
        className: "bg-green-100 text-green-700",
      };
    case "T":
      return {
        label: "Ditolak",
        className: "bg-red-100 text-red-700",
      };
    case "RU":
      return {
        label: "Review Ulang",
        className: "bg-purple-100 text-purple-700",
      };
    default:
      return {
        label: status, // fallback ke kode aslinya
        className: "bg-gray-100 text-gray-700",
      };
  }
};