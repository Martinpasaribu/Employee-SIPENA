/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormatDate, FormatDateTime } from "@/utils/Format/date";
import { IRepair } from "../models";

interface Props {
  show: boolean;
  repair?: IRepair;
  onClose: () => void;
}

export default function RepairModal({ show, repair, onClose }: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-2xl animate-fade-in-up">
        {/* Header Modal */}
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">
            Info Perbaikan
          </h2>
          <p className="mt-2 text-md font-bold text-gray-600">
            Biaya Rp {repair?.price?.toLocaleString('id-ID') || '0'}
          </p>
        </div>

        {/* Bagian Catatan/Deskripsi */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">
            Catatan
          </h3>
          <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
            {repair?.note || "Tidak ada catatan perbaikan yang diberikan."}
          </p>
        </div>

                {/* Bagian Catatan/Deskripsi */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">
            Tanggal Perbaikan
          </h3>
          
          <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
              {FormatDate(repair?.createdAt) || "Tidak ada catatan perbaikan yang diberikan."}
          </p>

        </div>

        {/* Footer Modal dengan Tombol */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

