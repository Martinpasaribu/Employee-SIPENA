/* eslint-disable @typescript-eslint/no-explicit-any */

// components/AddReportModal.tsx
"use client";

import { useState } from "react";
import { addReport } from "../service/services_report";
import { EmployeeMappingAddReport } from "../models";
import { useToast } from "@/components/ToastContect";
import { X, Check, XCircle, MessageSquare } from "lucide-react"; // Import ikon Lucide untuk status dan tutup

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
      // Hapus facility_key dan report_type saat division berubah untuk menghindari bug data lama
      facility_key: "",
      report_type: "",
    }));
    setFacility(selected.items || []);
  }
};


const handleSubmit = async () => {
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
  const inputClass = "w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150";


return (
  <>
    {/* Overlay */}
    
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-2 md:p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg relative max-h-[90vh] overflow-y-auto p-3 md:p-6 sm:p-8">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-md md:text-xl font-bold text-gray-800">
              Tambah Report
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

          {/* Jenis Report (Tipe Report) */}
          <div className="mb-6 border border-gray-200 p-4 rounded-xl">
            <p className="block mb-3 text-sm font-semibold text-gray-700">
                Pilih Jenis Laporan
            </p>

            {/* Tampilkan status jenis report */}
            <div className="mb-4">
              {form.report_type === "K" ? (
                
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 font-medium">
                  <span className="font-semibold">Jenis Aktif:</span> Komplain
                  <Check size={16} className="text-red-600 ml-auto" />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 font-medium">
                  <span className="font-semibold">Jenis Aktif:</span> Fasilitas
                  <Check size={16} className="text-green-600 ml-auto" />
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3">
              
              {/* Tombol Komplain */}
              <button
                type="button"
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    report_type: prev.report_type === "K" ? "" : "K", // toggle komplain
                    complain_des: "",
                    broken_des: "",
                    broken_type: "",
                    facility_key: "",
                  }));
                }}
                className={`flex items-center justify-center gap-2 px-4 py-2 flex-1 rounded-lg text-sm font-semibold transition-all shadow-sm focus:outline-none active:scale-[0.99] ${
                  form.report_type === "K"
                    ? "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/50"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {form.report_type === "K" ? (
                  <>
                    <XCircle size={16} />
                    Batalkan Komplain
                  </>
                ) : (
                  <>
                    <MessageSquare size={16} />
                    Buat Komplain
                  </>
                )}
              </button>
            </div>
          </div>


          {/* Inputan berdasarkan Tipe Report */}
          {form.report_type === "K" ? (
            // FORM KOMPLAIN
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Penjelasan Komplain
              </label>
              <textarea
                value={form.complain_des}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, complain_des: e.target.value }))
                }
                className={`${inputClass} min-h-[100px]`}
                placeholder="Tuliskan keluhan atau komplain Anda..."
                rows={4}
              />
            </div>
          ) : (
            // FORM KERUSAKAN FASILITAS
            <>

              {/* Select Division dan Select Facility di dalam Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select Division */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Pilih Division
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
                      Pilih Fasilitas
                    </label>
                    <select
                      className={inputClass}
                      value={form.facility_key || ""}
                      onChange={(e) => {
                        const selectedFacility = facility.find(
                          (r: any) => r.facility?.facility_key === e.target.value
                        );

                        if (selectedFacility) {
                          setForm((prev) => ({
                            ...prev,
                            facility_key: e.target.value,
                            report_type: selectedFacility.facility?.category || prev.report_type, // set report_type sesuai category
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
                  Tipe Kerusakan
                </label>
                <select
                  value={form.broken_type}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, broken_type: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">-- Tipe Kerusakan --</option>
                  <option value="R">Ringan</option>
                  <option value="S">Sedang</option>
                  <option value="B">Berat</option>
                </select>
              </div>

              {/* Penjelasan Kerusakan */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Penjelasan Kerusakan
                </label>
                <textarea
                  value={form.broken_des}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, broken_des: e.target.value }))
                  }
                  className={`${inputClass} min-h-[100px]`}
                  placeholder="Deskripsi kerusakan..."
                  rows={4}
                />
              </div>

            </>
          )}

          {/* Upload Gambar */}
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Gambar
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-700
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-green-50 file:text-green-700
                           hover:file:bg-green-100 cursor-pointer
                "
              />
          </div>
          

          {/* Preview Thumbnail */}
          {previewUrl && (
            <div className="mb-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer border-2 border-gray-200 shadow-sm transition-transform duration-200 hover:scale-105"
                onClick={() => setShowImageModal(true)}
              />
            </div>
          )}
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
            className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold disabled:opacity-50 transition duration-150 text-sm shadow-md shadow-green-500/50"
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
                // Max size disesuaikan dengan viewport
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