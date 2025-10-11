// src/components/AdminNoteModal.tsx
import React from 'react';
import { X, MessageSquare, CheckCircle } from 'lucide-react';
import { Report } from '../models'; // Sesuaikan path model

interface AdminNoteModalProps {
  show: boolean;
  onClose: () => void;
  report: Report | null;
}

const AdminNoteModal: React.FC<AdminNoteModalProps> = ({ show, onClose, report }) => {
  if (!show || !report) return null;

  const adminNote = report.admin_note;
  const hasNote = !!adminNote;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md m-4 transform transition-all duration-300 scale-100"
      >
        <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center">
            {hasNote 
                ? <CheckCircle size={20} className="mr-2 text-green-600" /> 
                : <MessageSquare size={20} className="mr-2 text-gray-500" />
            }
            Balasan Admin
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Laporan ID: #{report._id ? report._id.substring(report._id.length - 6).toUpperCase() : 'N/A'}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 min-h-[80px]">
            {hasNote ? (
              <p className="text-gray-700 whitespace-pre-wrap">{adminNote}</p>
            ) : (
              <p className="text-gray-500 italic">Admin belum memberikan balasan untuk laporan ini. Silakan tunggu pembaruan status.</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNoteModal;