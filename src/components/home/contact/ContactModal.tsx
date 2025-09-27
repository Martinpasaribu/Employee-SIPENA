"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { PostContact } from "./services/service_contact";
import { useToast } from "@/components/ToastContect";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // state modal konfirmasi

  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await PostContact({ name, email, phone, message });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      showToast("success", "Pesan dikirim.");
      setShowConfirm(true); // tampilkan modal konfirmasi
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showToast("error", `Gagal mengirim pesan: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Contact Modal */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-semibold text-green-700 mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 text-sm mb-6">
            Silakan isi form di bawah untuk menghubungi tim kami.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4 text-gray-600"
          >
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="email"
              placeholder="Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              placeholder="Nomor Telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
              required
            />
            <textarea
              placeholder="Pesan Anda"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold rounded-lg py-2 transition`}
            >
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-60">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-lg"
          >
            <p className="text-gray-700 text-lg mb-4">
              Tim Kami akan menghubungi anda secepatnya
            </p>
            <button
              onClick={() => {setShowConfirm(false), onClose()}}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              OK
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
