// components/HamburgerMenu.tsx
"use client";

import { useState } from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation"; // 🔹 Impor useRouter
import { authService } from "@/lib/auth"; // 🔹 Impor authService

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // 🔹 Gunakan hook useRouter

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 🔹 Fungsi asinkronus untuk logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/login"); // Redirect ke halaman login setelah berhasil logout
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <>
      {/* Navbar atas dengan efek kaca (Hanya tampil saat menu TIDAK terbuka) */}
      {!isOpen && (
        <nav className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center backdrop-blur-md bg-white/30 border-b border-gray-200 shadow-sm md:hidden transition-opacity duration-300">
          <button
            onClick={toggleMenu}
            className="p-2 -m-2"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-gray-900" />
          </button>
        </nav>
      )}

      {/* Menu Overlay (Tampil saat isOpen true) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white p-6 flex flex-col items-center transition-all duration-300">
          <div className="flex justify-between items-center w-full mb-8">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={toggleMenu}
              className="p-2"
              aria-label="Tutup menu"
            >
              <X size={24} className="text-gray-800"/>
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-center text-gray-700 w-full">
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition">
              <User size={20} />
              Profil Saya
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition">
              <Settings size={20} />
              Pengaturan
            </a>
            <a
              onClick={handleLogout} // 🔹 Panggil fungsi handleLogout saat diklik
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-red-600 hover:text-red-800 cursor-pointer" // 🔹 Tambahkan cursor-pointer
            >
              <LogOut size={20} />
              Keluar
            </a>
          </nav>
        </div>
      )}
    </>
  );
}