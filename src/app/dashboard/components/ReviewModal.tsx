/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ReviewModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Star, MessageSquare } from 'lucide-react';
import { PostReview } from '../service/services_report';
import { useToast } from '@/components/ToastContect';

export interface ReportReview {
  stars: number;
  message: string;
  status: boolean;
}

interface Report {
  _id?: string;
  review?: ReportReview;
  report_code: string;
}

interface ReviewModalProps {
  show: boolean;
  onClose: () => void;
  report: Report | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ show, onClose, report }) => {
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (show) {
      const existingReview = report?.review || { stars: 0, message: '' };
      setStars(existingReview.stars);
      setMessage(existingReview.message);
    }
  }, [show, report]);

  if (!show || !report) return null;

  const getRatingName = (s: number) => {
    switch (s) {
      case 1:
        return { label: 'Sangat Buruk', color: 'text-red-500' };
      case 2:
        return { label: 'Kurang Baik', color: 'text-orange-500' };
      case 3:
        return { label: 'Cukup Baik', color: 'text-yellow-500' };
      case 4:
        return { label: 'Baik Sekali', color: 'text-lime-500' };
      case 5:
        return { label: 'Luar Biasa!', color: 'text-green-600' };
      default:
        return { label: 'Pilih Rating', color: 'text-gray-400' };
    }
  };

  const ratingStatus = getRatingName(stars);
  const isFormValid = stars > 0 && message.trim().length >= 5;

  const handleSave = async () => {
    if (!report._id || !isFormValid) return;

    setIsSaving(true);
    const reviewData: ReportReview = { stars, message: message.trim(), status: true };

    try {
      await PostReview(report._id, reviewData);

      showToast('success', 'Review berhasil dikirim');

      // Tutup modal terlebih dahulu
      onClose();

      // Tunggu sedikit agar animasi modal selesai, lalu refresh halaman
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      console.error('Gagal menyimpan review:', error);
      showToast('error', `${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg m-4 transform transition-all duration-300 scale-100 border-t-4 border-green-500">
        {/* HEADER */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-5">
          <h2 className="text-sm md:text-xl font-extrabold text-slate-800 flex items-center">
            <MessageSquare size={24} className="mr-2 text-green-600" />
            Ulasan Layanan Laporan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 p-1 rounded-full hover:bg-gray-200 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-6">
          {/* Rating */}
          <div className="bg-green-50 p-2 md:p-5 rounded-xl border border-green-100 text-center">
            <p className="text-sm md:text-base font-semibold text-green-700 mb-3">
              Bagaimana penilaian Anda terhadap laporan ini?
            </p>

            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <button
                  key={starValue}
                  onClick={() => setStars(starValue)}
                  className={`
                    p-1 rounded-md transition-all duration-300 transform 
                    ${
                      starValue <= stars
                        ? 'text-yellow-400 scale-110'
                        : 'text-gray-300 hover:text-yellow-300 hover:scale-105'
                    }
                  `}
                  disabled={isSaving}
                >
                  <Star
                    className="h-5 w-5 md:h-8 md:w-8"
                    fill={starValue <= stars ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>

            <span
              className={`block text-md md:text-xl font-extrabold mt-4 ${ratingStatus.color} transition-colors duration-300`}
            >
              {ratingStatus.label}
            </span>
          </div>

          {/* Message */}
          <div>
            <p className="text-sm font-bold text-slate-700 mb-2">Masukan/Komentar Ulasan:</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Berikan masukan atau pujian Anda mengenai layanan kami (min. 5 karakter)"
              rows={5}
              className="w-full text-black p-4 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:bg-gray-100 text-base shadow-inner"
              disabled={isSaving}
            />
            {message.length < 5 && message.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">Komentar minimal 5 karakter.</p>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex justify-center md:justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-3 md:px-6 py-1 md:py-2 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100 transition shadow-sm"
            disabled={isSaving}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`px-3 md:px-6 py-1 md:py-2 rounded-xl text-white font-semibold shadow-lg transition transform active:scale-[0.98] 
              ${
                isFormValid && !isSaving
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            disabled={!isFormValid || isSaving}
          >
            {isSaving ? 'Mengirim Ulasan...' : 'Kirim Ulasan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
