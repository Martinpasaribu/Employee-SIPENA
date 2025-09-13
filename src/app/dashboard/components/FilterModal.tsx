// components/FilterModal.tsx
import React from "react";
import { ReportFilters } from "./ReportList";

interface FilterModalProps {
  show: boolean;
  onClose: () => void;
  filters: ReportFilters;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterModal({ show, onClose, filters, onFilterChange }: FilterModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-auto max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Tutup"
        >
          &times;
        </button>
        <h3 className="text-lg text-gray-800 font-bold mb-4">Filter Laporan</h3>
        
        <div className="flex flex-col gap-4 text-gray-500">
          {/* Filter Progress */}
          <select
            name="progress"
            className="border rounded-lg p-2 text-sm w-full"
            value={filters.progress}
            onChange={onFilterChange}
          >
            <option value="">Semua Progress</option>
            <option value="A">Antrian</option>
            <option value="P">Proses</option>
            <option value="S">Selesai</option>
            <option value="T">Tolak</option>
          </select>

          {/* Filter Broken Type */}
          <select
            name="broken_type"
            className="border rounded-lg p-2 text-sm w-full"
            value={filters.broken_type}
            onChange={onFilterChange}
          >
            <option value="">Semua Kerusakan</option>
            <option value="SP">Sedikit Rusak</option>
            <option value="R">Rusak</option>
            <option value="SR">Sarana</option>
          </select>

          {/* Filter Report Type */}
          <select
            name="report_type"
            className="border rounded-lg p-2 text-sm w-full"
            value={filters.report_type}
            onChange={onFilterChange}
          >
            <option value="">Semua Tipe Report</option>
            <option value="FK">Fasilitas Kamar</option>
            <option value="FU">Fasilitas Umum</option>
            <option value="K">Kebersihan</option>
          </select>
        </div>
      </div>
    </div>
  );
}