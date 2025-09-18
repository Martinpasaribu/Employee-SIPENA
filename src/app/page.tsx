// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center px-6 py-12">
      
      {/* Logo */}
      <div className="text-green-500">
        <Image
          src="/image/icon-main.png"
          alt="Logo"
          width={120}
          height={40}
          className="mb-8 "
        />
      </div>

      {/* Hero Text */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 text-center mb-4">
        Selamat Datang di <span className="text-green-700">SIPENA</span>
      </h1>
      <p className="text-gray-500 text-center max-w-xl mb-8 text-md">
        Selamat datang di sistem pelaporan
      </p>

      {/* Tombol */}
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition"
        >
          Masuk
        </Link>
        {/* <Link
          href="/register"
          className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition"
        >
          Daftar
        </Link> */}
        {/* <Link
          href="/booking"
          className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition"
        >
          Fasilitas
        </Link> */}
      </div>

      {/* Gambar Hero */}
      {/* <div className="mt-12">
        <Image
          src="/dashboard-preview.png"
          alt="Preview Dashboard"
          width={800}
          height={400}
          className="rounded-xl shadow-lg border"
        />
      </div> */}

      {/* Footer */}
      <footer className="mt-12 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Pengadilan Negeri Sidenreng Rappang All rights reserved.
      </footer>
    </div>
  );
}
