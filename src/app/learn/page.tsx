"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 flex flex-col">
      
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 md:px-10 py-5 bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Image src="/image/icon-main.png" alt="Logo" width={45} height={45} />
          <h1 className="text-xl md:text-2xl font-bold text-green-700 tracking-wide">SIPENA</h1>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-green-700 transition">Beranda</Link>
          <Link href="/learn" className="hover:text-green-700 font-semibold transition">Pelajari Lebih Lanjut</Link>
          <Link href="/about" className="hover:text-green-700 transition">Tentang</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-grow px-6 md:px-[8rem] py-20 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug">
            Pelajari Lebih Lanjut
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Halaman ini berisi panduan penggunaan sistem SIPENA untuk pegawai.
            Anda dapat menemukan cara melakukan pelaporan harian, memantau aktivitas, dan menggunakan fitur lain yang tersedia.
          </p>

          <ul className="list-disc list-inside text-gray-700 mt-6 space-y-2">
            <li>Membuat laporan aktivitas harian</li>
            <li>Memantau status laporan</li>
            <li>Melihat histori laporan</li>
            <li>Kontak dan bantuan teknis</li>
          </ul>

          <Link
            href="/login"
            className="inline-block mt-8 px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow-md transition"
          >
            Masuk Sekarang
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Image
            src="/image/learn.svg"
            alt="Ilustrasi Learn"
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
    </div>
  );
}
