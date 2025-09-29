/* eslint-disable @typescript-eslint/no-explicit-any */

// components/AddReportModal.tsx
"use client";

import { useState, useEffect } from "react";
import { addReport, GetFacilityCode } from "../service/services_report";
import { EmployeeMappingAddReport, Facility } from "../models";
import { useToast } from "@/components/ToastContect";

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
  division_key: { _id: string; name: string; code: string }; // ✅ tunggal, sesuai Report model
  report_type: string;
  broken_type: string;
  complain_des: string;
  broken_des: string;
  image: File | null;
}


export default function AddReportModal({ show, onClose, update, user, facilities }: AddReportModalProps) {
  const { showToast } = useToast();

// Perbarui state awal
  const [form, setForm] = useState<ReportForm>({
    employee_key: user?._id || "",
    facility_key: "",
    division_key: user?.division_key?.[0]
      ? {
          _id: user.division_key[0]._id,
          name: user.division_key[0].name,
          code: user.division_key[0].code,
        }
      : { _id: "", name: "", code: "" },
    report_type: "",
    broken_type: "",
    complain_des: "",
    broken_des: "",
    image: null,
  });

  const [facility, setFacility] = useState<any []>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

const handleDivisionChange = (id: string) => {
  const selected = facilities.find((div: any) => div._id === id);
  if (selected) {
    console.log("📦 Division selected:", selected);
    setForm((prev) => ({
      ...prev,
      division_key: {
        _id: selected._id,
        name: selected.name,
        code: selected.code,
      },
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

return (
  <>
    {/* Overlay */}
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-2 sm:p-4">
      {/* Modal */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-5 text-gray-800">
          Tambah Report
        </h2>

        {/* Tipe Report */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Pilih Division
        </label>

        <select
          className="w-full border rounded-lg p-2 mb-3 text-gray-600 text-sm"
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

        {/* Select Facility */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Pilih Fasilitas
        </label>


        <select
          className="w-full border rounded-lg p-2 mb-3 text-gray-600 text-sm"
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



        {/* Inputan berdasarkan Tipe Report */}
        {form.report_type === "K" ? (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Penjelasan Komplain
            </label>
            <textarea
              value={form.complain_des}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, complain_des: e.target.value }))
              }
              className="w-full border rounded-lg p-2 mb-4 text-gray-700 placeholder-gray-400 text-sm"
              placeholder="Tuliskan keluhan atau komplain Anda..."
              rows={3}
            />
          </>
        ) : (
          <>
            {/* Tipe Kerusakan */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tipe Kerusakan
            </label>
            <select
              value={form.broken_type}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, broken_type: e.target.value }))
              }
              className="w-full border rounded-lg p-2 mb-4 text-gray-700 text-sm"
            >
              <option value="">-- Tipe Kerusakan --</option>
              <option value="R">Ringan</option>
              <option value="S">Sedang</option>
              <option value="B">Berat</option>
            </select>



            {/* Penjelasan Kerusakan */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Penjelasan Kerusakan
            </label>
            <textarea
              value={form.broken_des}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, broken_des: e.target.value }))
              }
              className="w-full border rounded-lg p-2 mb-4 text-gray-700 placeholder-gray-500 text-sm"
              placeholder="Deskripsi kerusakan..."
              rows={3}
            />
          </>
        )}

        {/* Upload Gambar */}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Upload Gambar
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border rounded-lg p-2 mb-2 text-gray-700 text-sm"
        />

        {/* Preview Thumbnail */}
        {previewUrl && (
          <div className="mb-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              onClick={() => setShowImageModal(true)}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50 text-sm"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 text-sm"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>

    {/* Modal Preview Gambar */}
    {showImageModal && previewUrl && (
      <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2"
        onClick={() => setShowImageModal(false)}
      >
        <img
          src={previewUrl}
          alt="Full Preview"
          className="max-w-full max-h-full rounded-lg shadow-lg"
        />
      </div>
    )}
  </>
);

}