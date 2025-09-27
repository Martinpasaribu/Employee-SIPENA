"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Menu, X } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/home/contact/ContactModal";

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 flex flex-col">

      {/* Modal Kontak */}
      <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />


      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 md:px-10 py-5 bg-white shadow-sm sticky top-0 z-30">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/image/icon-main.png" alt="Logo" width={45} height={45} />
          <h1 className="text-lg md:text-xl font-bold text-green-700 tracking-wide">
            SIPENA
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

          <Link href="/about" className="hover:text-green-700 transition">
            Tentang
          </Link>
          <button
            onClick={() => setShowContact(true)}
            className="flex items-center gap-2 hover:text-green-700 transition"
          >
            <MessageSquare size={18} />
            Kontak
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-green-700 transition"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full left-0 w-full bg-white border-t border-gray-100 flex flex-col items-center gap-4 py-4 shadow-md md:hidden z-20"
            >

              <Link
                href="/about"
                className="text-gray-700 hover:text-green-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Tentang
              </Link>
              <button
                onClick={() => {
                  setShowContact(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition"
              >
                <MessageSquare size={18} />
                Kontak
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-grow px-6 md:px-[8rem] py-20 gap-10">
        {/* Teks Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug">
            Selamat Datang di{" "}
            <span className="text-green-700">SIPENA</span>
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Sistem Informasi Pelaporan Pegawai Negeri Sidenreng Rappang.<br />
            Lakukan pelaporan Fasilitas harian dengan cepat, mudah, dan transparan.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
            <Link
              href="/login"
              className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow-md transition"
            >
              Masuk Sebagai Pegawai
            </Link>
            <Link
              href="/learn"
              className="px-8 py-3 border border-green-500 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </motion.div>

        {/* Gambar Kanan */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Image
            src="/image/reports.svg"
            alt="Ilustrasi Pegawai"
            width={480}
            height={400}
            className="drop-shadow-md rounded-xl"
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-5 border-t border-gray-200 text-gray-500 text-sm bg-white">
        © {new Date().getFullYear()} Pengadilan Negeri Sidenreng Rappang • Sistem Pelaporan Pegawai
      </footer>

      {/* Modal Kontak */}
      {showContact && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md text-center"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              Hubungi Kami
            </h2>
            <p className="text-gray-600 mb-6">
              Jika Anda memerlukan bantuan, silakan hubungi tim IT atau HRD melalui kontak berikut.
            </p>

            <div className="flex flex-col gap-3 text-gray-700 text-sm">
              <p>📧 Email: <span className="font-semibold">support@sipena.go.id</span></p>
              <p>📞 Telepon: <span className="font-semibold">(0421) 123-456</span></p>
              <p>🏢 Alamat: Pengadilan Negeri Sidenreng Rappang</p>
            </div>

            <div className="flex justify-center items-center gap-2">

                <button
                  onClick={() => setShowContact(false)}
                  className="mt-6 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                >
                  Tutup
                </button>
                <button
                  onClick={() => setContactOpen(true)}
                  className="mt-6 px-6 py-2 border-1 border-gray-700 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                >
                  Contact
                </button>
                
            </div>

  
          </motion.div>
        </div>
      )}
    </div>
  );
}
