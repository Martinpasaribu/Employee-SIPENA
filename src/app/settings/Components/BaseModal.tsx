"use client";

interface BaseModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export default function BaseModal({ title, children, onClose, isOpen }: BaseModalProps) {
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-[99] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative transform transition-transform duration-300 scale-95">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
