/* eslint-disable @typescript-eslint/no-explicit-any */

// components/AddReportModal.tsx
"use client";

import { useState, useEffect } from "react";
import { addReport, GetFacilityCode } from "../service/services_report";
import { EmployeeMappingAddReport, Facility } from "../models";
import { useToast } from "@/components/ToastContect";
import { X, Wrench, MessageSquare, Upload, Trash2 } from "lucide-react"; // Import ikon

interface AddReportModalProps {

  show: boolean;
  onClose: () => void;
  update: () => void;
  user: EmployeeMappingAddReport;
  facilities: any[]
  
}

// Definisikan tipe data untuk form
interface ReportForm {
  employee_key: string;
  facility_key: string;
  division_key: { _id: string; name: string; code: string };
  report_type: string;
  broken_type: string;
  complain_des: string;
  broken_des: string;
  image: File | null;
}


export default function AddReportModal({ show, onClose, update, user, facilities }: AddReportModalProps) {
  const { showToast } = useToast();

// Perbarui state awal
  const [form, setForm] = useState<ReportForm>(() => {
    // Inisialisasi default dari user saat pertama kali dibuka
    const initialDivision = user?.division_key?.[0]
      ? {
          _id: user.division_key[0]._id,
          name: user.division_key[0].name,
          code: user.division_key[0].code,
        }
      : { _id: "", name: "", code: "" };
    
    return {
      employee_key: user?._id || "",
      facility_key: "",
      division_key: initialDivision,
      report_type: "",
      broken_type: "R", // Defaultkan ke Ringan
      complain_des: "",
      broken_des: "",
      image: null,
    };
  });

  const [facility, setFacility] = useState<any []>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setForm((prev) => ({ ...prev, image: file }));
      
      if (previewUrl) URL.revokeObjectURL(previewUrl); // Cleanup URL lama
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: null }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleDivisionChange = (id: string) => {
    const selected = facilities.find((div: any) => div._id === id);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        division_key: {
          _id: selected._id,
          name: selected.name,
          code: selected.code,
        },
        facility_key: "", // Reset facility saat divisi berubah
        report_type: "", // Reset report type
      }));
      setFacility(selected.items || []);
    }
  };


  const handleSubmit = async () => {
    // ... (Logika submit tetap sama)
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("report_type", form.report_type);
      formData.append("employee_key",  user?._id);

      // Kirim semua data division
      formData.append("division_key", form.division_key._id);


      if (form.report_type !== "K") {
        formData.append("broken_type", form.broken_type);
        formData.append("facility_key", form.facility_key);
        formData.append("broken_des", form.broken_des);
      } else {
        formData.append("complain_des", form.complain_des);
      }

      if (form.image) {
        formData.append("image", form.image);
      }

      await addReport(formData);
      showToast("success", "Report berhasil dikirim!");
      onClose();
      update();

      // Reset form
      setForm({
        employee_key: user?._id || "",
        facility_key: "",
        division_key: { _id: "", name: "", code: "" },
        report_type: "",
        broken_type: "R",
        complain_des: "",
        broken_des: "",
        image: null,
      });

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error("❌ Error saat submit report:", err);
      showToast("error", `Terjadi kesalahan saat menyimpan report`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  // Kelas styling input/select/textarea yang konsisten dan elegan
  const inputClass = "w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150";

return (
  <>
    {/* Overlay */}
    
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      {/* Modal Container */}
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg relative 
                   max-h-[90vh] overflow-y-auto p-6 sm:p-8"
      >
        
        {/* Header Modal */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Form Laporan Baru
            </h2>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Tutup Modal"
            >
                <X size={20} />
            </button>
        </div>


        {/* Body Form */}
        <div className="space-y-6">

          {/* Bagian Tipe Report (Toggle) */}
          <div className="border border-gray-200 p-4 rounded-xl">
            <p className="block mb-3 text-sm font-semibold text-gray-700 uppercase">
              Pilih Jenis Laporan
            </p>

            <div className="flex gap-3 flex-wrap">
                {/* Tombol Fasilitas/Kerusakan */}
                <button
                    type="button"
                    onClick={() => {
                        setForm((prev) => ({
                            ...prev,
                            report_type: (prev.report_type === "K" || prev.report_type === "") ? "M" : "K", 
                            complain_des: "",
                        }));
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-2 flex-1 min-w-[140px] rounded-lg text-sm font-semibold transition-all shadow-md active:scale-[0.99] ${
                        form.report_type !== "K" && form.report_type !== ""
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    <Wrench size={16} />
                    Laporan Kerusakan
                </button>

                {/* Tombol Komplain */}
                <button
                    type="button"
                    onClick={() => {
                        setForm((prev) => ({
                            ...prev,
                            report_type: prev.report_type === "K" ? "M" : "K", // Toggle antara K dan M (asumsi M adalah default non-K)
                            broken_des: "",
                            broken_type: "R",
                            facility_key: "",
                        }));
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-2 flex-1 min-w-[140px] rounded-lg text-sm font-semibold transition-all shadow-md active:scale-[0.99] ${
                        form.report_type === "K"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    <MessageSquare size={16} />
                    Buat Komplain
                </button>
            </div>
            
            {/* Status Aktif */}
            <div className={`mt-3 text-xs font-medium text-center py-1 rounded-md ${
                form.report_type === "K"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}>
                Jenis Aktif: {form.report_type === "K" ? "Komplain" : "Kerusakan Fasilitas"}
            </div>
          </div>


          {/* --- Inputan berdasarkan Tipe Report --- */}
          {form.report_type === "K" ? (
            // Form Komplain
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                Penjelasan Komplain <span className="text-red-500">*</span>
                </label>
                <textarea
                value={form.complain_des}
                onChange={(e) =>
                    setForm((prev) => ({ ...prev, complain_des: e.target.value }))
                }
                className={`${inputClass} min-h-[100px]`}
                placeholder="Tuliskan keluhan atau komplain Anda secara rinci..."
                rows={4}
                />
            </div>
          ) : (
            // Form Fasilitas/Kerusakan
            <>
              {/* Grid 2 Kolom untuk Division dan Facility di PC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Select Division */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Pilih Division <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={inputClass}
                    value={form.division_key._id}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                  >
                    <option value="">-- Pilih Divisi --</option>
                    {facilities?.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.code}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Facility */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Pilih Fasilitas <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={inputClass}
                    value={form.facility_key || ""}
                    onChange={(e) => {
                      const selectedFacilityItem = facility.find(
                        (r: any) => r.facility?.facility_key === e.target.value
                      );

                      if (selectedFacilityItem) {
                        setForm((prev) => ({
                          ...prev,
                          facility_key: e.target.value,
                          report_type: selectedFacilityItem.facility?.category || prev.report_type,
                        }));
                      }
                    }}
                  >
                    <option value="">-- Pilih Fasilitas --</option>
                    {facility?.map((r: any) => (
                      <option
                        key={r.item?._id} 
                        value={r.facility?.facility_key}
                      >
                        {r.item?.name} — {r.facility?.name} ({r.facility?.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tipe Kerusakan */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tipe Kerusakan <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.broken_type}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, broken_type: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="R">Ringan</option>
                  <option value="S">Sedang</option>
                  <option value="B">Berat</option>
                </select>
              </div>

              {/* Penjelasan Kerusakan */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Penjelasan Kerusakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.broken_des}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, broken_des: e.target.value }))
                  }
                  className={`${inputClass} min-h-[100px]`}
                  placeholder="Deskripsi kerusakan secara detail..."
                  rows={4}
                />
              </div>
            </>
          )}

          {/* Upload Gambar Section */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload Gambar (Opsional)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100 cursor-pointer
                "
              />
              
              {/* Tombol Hapus Gambar */}
              {form.image && (
                <button
                    type="button"
                    onClick={removeImage}
                    className="p-2 rounded-full text-red-600 hover:bg-red-50 transition"
                    title="Hapus Gambar"
                >
                    <Trash2 size={20} />
                </button>
              )}
            </div>

            {/* Preview Thumbnail */}
            {previewUrl && (
              <div className="mt-4 relative w-20 h-20 sm:w-24 sm:h-24">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200 cursor-pointer shadow-sm"
                  onClick={() => setShowImageModal(true)}
                />
                <div 
                    className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 p-1 rounded-full bg-red-500 text-white cursor-pointer"
                    onClick={removeImage}
                >
                    <X size={12} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-semibold disabled:opacity-50 transition duration-150 text-sm shadow-sm"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold disabled:opacity-50 transition duration-150 text-sm shadow-md shadow-blue-500/50"
          >
            {loading ? "Mengirim..." : "Kirim Laporan"}
          </button>
        </div>
      </div>
    </div>

    {/* Modal Preview Gambar Fullscreen */}
    {showImageModal && previewUrl && (
      <div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
        onClick={() => setShowImageModal(false)}
      >
        <div className="relative">
            <img
                src={previewUrl}
                alt="Full Preview"
                className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl"
            />
            <button
                onClick={(e) => { e.stopPropagation(); setShowImageModal(false); }}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
            >
                <X size={24} />
            </button>
        </div>
      </div>
    )}
  </>
);

}