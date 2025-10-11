/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ReportList.tsx
import React, { useState } from "react";
import FilterModal from "./FilterModal";
import { Filter, Wrench, Info, CheckCircle, Clock, XCircle, ChevronDown, Package, MessageSquare, StarIcon } from "lucide-react";
import { IRepair, Report } from "../models";
import { getBrokenType, Progress, TypeReport } from "../constant";
import RepairModal from "./RepairModal";
import AdminNoteModal from "./AdminNoteModal";
import ReviewModal from "./ReviewModal";

// Interface (Tidak diubah)
export interface ReportFilters {
  report_type?: string;
  broken_type?: string;
  progress?: string;
}

interface ReportListProps {
  reports: Report[];
  onReportClick: (report: Report) => void;
  onPreviewImage: (image: string | null) => void;
  previewImage: string | null;
}

// Helper untuk Ikon Status Progress (Tidak diubah)
const ProgressIcon = (progressStatus: string) => {
  switch (progressStatus) {
    case 'A': return <Clock size={14} className="mr-1" />;
    case 'P': return <Wrench size={14} className="mr-1" />;
    case 'S': return <CheckCircle size={14} className="mr-1" />;
    case 'T': return <XCircle size={14} className="mr-1" />;
    case 'RU': return <Info size={14} className="mr-1" />;
    default: return <Info size={14} className="mr-1" />;
  }
}

export default function ReportList({ reports, onReportClick, onPreviewImage, previewImage }: ReportListProps) {
  const [filters, setFilters] = useState<ReportFilters>({
    report_type: "",
    broken_type: "",
    progress: "",
  });

  const [ repair, setRepair ] = useState<IRepair>();
  const [showDescModal, setShowDescModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false); 
  
  // ... (Logika filter dan handler lainnya tidak diubah) ...
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const HandleRepairModal = (data : any) => {
    setRepair(data);
    setShowDescModal(true);
  }

    // Handler baru untuk membuka modal admin
  const HandleAdminModal = (report: Report) => {
    setSelectedReport(report);
    setShowAdminModal(true);
  };


    // Handler untuk membuka modal review
  const HandleReviewModal = (report: Report) => {
    setSelectedReport(report);
    setShowReviewModal(true);
  };


  const filteredReports = reports.filter((report) => {
    const reportTypeMatch = !filters.report_type || report.report_type === filters.report_type;
    const brokenTypeMatch = !filters.broken_type || report.broken_type === filters.broken_type;
    const progressMatch = !filters.progress || report.progress === filters.progress;
    return reportTypeMatch && brokenTypeMatch && progressMatch;
  });
  
  const filterData = [
    { 
        name: "progress", 
        label: "Progress", 
        options: [
            { value: "", label: "Semua Progress" }, 
            { value: "A", label: "Antrian" }, 
            { value: "P", label: "Proses" }, 
            { value: "S", label: "Selesai" }, 
            { value: "T", label: "Ditolak" }, 
            { value: "RU", label: "Review Ulang" }
        ] 
    },
    { 
        name: "broken_type", 
        label: "Tipe Kerusakan", 
        options: [
            { value: "", label: "Semua Kerusakan" }, 
            { value: "S", label: "Sedang" }, 
            { value: "R", label: "Ringan" }, 
            { value: "B", label: "Berat" }
        ] 
    },
    { 
        name: "report_type", 
        label: "Tipe Report", 
        options: [
            { value: "", label: "Semua Tipe Report" }, 
            { value: "BL", label: "Bangunan Lainnya" }, 
            { value: "M", label: "Mesin" }, 
            { value: "BK", label: "Bangunan Kantor" }, 
            { value: "K", label: "Komplain" }
        ] 
    }
  ];

  return (

    
    <section className="w-full max-w-8xl mx-auto my-5">

      <h3 className="text-xl bg-white px-4 py-2 font-extrabold text-slate-800 tracking-tight mb-5">
        Daftar Report Aktif
      </h3>

      {/* STICKY HEADER & FILTER */}
      <div className="sticky top-0 z-20 bg-white shadow-lg pt-6 pb-4 md:pt-8 md:pb-3 border-b border-gray-100/50">
        <div className="flex justify-between items-center px-4">
          
          {/* Tombol Filter Mobile */}
          <div className="block md:hidden">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition active:scale-[0.98] text-sm font-semibold"
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Filter Desktop */}
        <div className="hidden md:flex flex-row gap-3 px-4">
            {filterData.map((filter) => (
                <div key={filter.name} className="relative w-full">
                    <select
                        name={filter.name}
                        className="
                          appearance-none border border-gray-200 bg-white rounded-lg 
                          pl-3 pr-8 py-2 text-sm text-gray-700 w-full 
                          focus:ring-2 focus:ring-green-500 focus:border-green-500 
                          transition shadow-sm hover:border-gray-300
                        "
                        value={filters[filter.name as keyof ReportFilters]}
                        onChange={handleFilterChange}
                    >
                        {filter.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
            ))}
        </div>
      </div>
      
      {/* DAFTAR LAPORAN (Menggunakan struktur grid dari input Anda) */}
      
      <div className="p-4 sm:p-6">
        {filteredReports.length === 0 ? (
          <div className="bg-white p-8 mt-6 rounded-xl shadow-lg text-center border border-gray-100">
            <p className="text-gray-500 font-medium">🙌 Tidak ada report yang sesuai dengan filter yang Anda pilih.</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> {/* Grid 3 kolom untuk desktop */}
            {filteredReports.map((r, i) => {
                // Tentukan warna ikon balasan admin
                const hasAdminNote = !!r.admin_note;
                const adminIconColor = hasAdminNote 
                                        ? 'text-green-500 hover:text-green-600' 
                                        : 'text-gray-400 hover:text-gray-500';
                                        
                // Cek apakah laporan sudah Selesai DAN belum ada review
                const showReviewButton = r.progress === 'S' && r.review.status === false;
                // Cek apakah laporan sudah ada review
                const hasReviewed = r.review.status === true;
                                        

                return (
                <div
                    key={i}
                    // Border top menggunakan warna green (konsisten)
                    className="bg-white p-5 rounded-xl shadow-xl border-t-4 border-green-400/80 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 transform"
                >
                    {/* 1. HEADER CARD: Judul, Tipe & Kerusakan */}
                    <div className="flex items-start justify-between border-b border-gray-100 pb-3 mb-3 gap-2">
                        <div className="flex-1">
                            {/* Warna Tipe Report menggunakan green (konsisten) */}
                            <p className="text-xs text-green-600 font-bold uppercase tracking-widest">
                            {TypeReport(r.report_type).label}
                            </p>
                            <p className="text-lg font-extrabold text-slate-700 leading-tight mt-1">
                            # {r.report_code || (r._id ? r._id.substring(r._id.length - 6).toUpperCase() : i + 1)}
                            </p>
                        </div>
                        <div className={`
                            px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
                            ${getBrokenType(r.broken_type).className}
                        `}>
                            {getBrokenType(r.broken_type).label}
                        </div>
                    </div>

                    {/* 2. Status Progress & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        {/* Status Badge Progress */}
                        <div className={`
                            flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm
                            ${Progress(r.progress).className}
                        `}>
                            {ProgressIcon(r.progress)}
                            {Progress(r.progress).label}
                        </div>

                        {/* Kontainer Tombol Aksi */}
                        <div className="flex items-center space-x-2">
                            
                            {/* Tombol Balasan Admin */}
                            <button
                                onClick={() => HandleAdminModal(r)}
                                className={`p-2 rounded-full bg-gray-50 transition-colors duration-200 active:scale-95 shadow-sm`}
                                title={hasAdminNote ? "Balasan Admin Tersedia" : "Belum Ada Balasan Admin"}
                            >
                                <MessageSquare size={16} className={adminIconColor} />
                            </button>
                            
                            {/* Tombol Ulasan (Review) */}
                            {showReviewButton && (
                                <button
                                    onClick={() => HandleReviewModal(r)}
                                    className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors duration-200 shadow-sm active:scale-95"
                                    title="Beri Ulasan"
                                >
                                    <StarIcon size={16} />
                                </button>
                            )}
                            
                            {/* Tanda Sudah Review */}
                            {hasReviewed && (
                                <span className="flex items-center text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                                    <StarIcon size={15} className="mr-1 fill-current" /> {r.review.stars}
                                </span>
                            )}


                            {/* Tombol Lihat Detail Perbaikan */}
                            {r.repair && (
                                <button
                                    onClick={() => HandleRepairModal(r.repair)}
                                    // Warna tombol detail perbaikan menggunakan green (konsisten)
                                    className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200 shadow-sm active:scale-95"
                                    title="Detail Perbaikan"
                                >
                                    <Wrench size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 3. Catatan Pelapor (Deskripsi) */}
                    <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-slate-500 font-medium mb-1">Catatan Pelapor (Deskripsi)</p>
                            <p className="text-gray-700 text-sm line-clamp-2">
                                {r.complain_des || r.broken_des || "Pelapor tidak memberikan deskripsi tambahan."}
                            </p>
                        </div>
                    </div>
                    
                    {/* 4. Gambar Preview */}
                    {r.image && (
                    <div className="mt-4">
                        <img
                        src={r.image}
                        alt="report-preview"
                        className="w-full h-40 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity duration-200 hover:shadow-lg"
                        onClick={() => onPreviewImage(r.image)}
                        />
                    </div>
                    )}
                </div>
            )})}
          </div>
        )}
      </div>

      {/* Komponen modal filter dan repair (tidak diubah) */}
      <FilterModal
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <RepairModal
        show={showDescModal}
        repair={repair}
        onClose={() => setShowDescModal(false)}
      />

            {/* MODAL BARU UNTUK BALASAN ADMIN */}
      <AdminNoteModal
        show={showAdminModal}
        report={selectedReport}
        onClose={() => {
            setShowAdminModal(false);
            setSelectedReport(null);
        }}
      />

      {/* MODAL BARU: Review Modal (Tanpa onSave, karena save dilakukan internal) */}
      <ReviewModal
        show={showReviewModal}
        report={selectedReport}
        onClose={() => {
            setShowReviewModal(false);
            setSelectedReport(null);
        }}
      />

    </section>
  );
}