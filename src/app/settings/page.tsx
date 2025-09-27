/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import RegisterAdminModal from "./Components/RegisterAdminModal";
import AdminListModal from "./Components/AdminListModal";
import UpdateProfileModal from "./Components/UpdateProfileModal";
import { Plus, List, Edit2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";
import { useToast } from "@/components/ToastContect";

import Link from "next/link";
import { StatusAdmin } from "./constant";
import { FormatDateTime } from "@/utils/Format/date";
import LoadingSpinner from "@/components/Loading";

export default function SettingsPage() {
  const [modalState, setModalState] = useState<null | "register" | "list" | "update">(null);
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState(true);

  const closeModal = () => setModalState(null);
  const router = useRouter();
  const { showToast } = useToast();
    

    const fetchData = useCallback(async () => {
        
        setLoading(true);
  
        try {
          
          const isValid = await authService.checkSession();
  
          if (!isValid) {
            router.push("/login?session=expired");
            return;
          }
    
          const profile = await authService.fetchProfile();
          if (profile?.username) {
            setProfile(profile);
          }
  
  
        } catch (error) {
          showToast("error", `Gagal mengambil data: ${error}`);
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }, [router, showToast]);
    
    useEffect(() => {
        fetchData();
        }, [fetchData]);
        

  return (
    <div className="min-h-screen p-5 md:p-10 bg-gray-50 text-gray-900">
      <h1 className="text-xl md:text-2xl font-extrabold mb-10 tracking-tight text-left">
        Settings
      </h1>

      {/* Admin Management */}
      <div className="bg-white shadow-sm rounded-2xl p-4 md:p-8 mb-8 flex flex-col md:flex-row md:items-start gap-8">
        {/* Profile Info */}
        <div className="flex-1">
          <h2 className="text-md md:text-xl font-bold flex items-center gap-2 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Employee Management
          </h2>

      {loading ? (
        
        <LoadingSpinner/>
      ): (
          <div className="border border-gray-200 rounded-xl p-2 md:p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium w-24 inline-block">User ID :</span>{" "}
                {profile?.user_id}
              </p>
              <p>
                <span className="font-medium w-24 inline-block">Username :</span>{" "}
                {profile?.username}
              </p>
              <p>
                <span className="font-medium w-24 inline-block">Email :</span>{" "}
                {profile?.email}
              </p>
              <p>
                <span className="font-medium w-24 inline-block">Phone :</span>{" "}
                {profile?.phone}
              </p>
              <p>
                <span className="font-medium w-24 inline-block">Role :</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${StatusAdmin(profile?.role).className}`}>
                  {StatusAdmin(profile?.role).label}
                </span>
              </p>
              <p>
                <span className="font-medium w-24 inline-block">Joined :</span>{" "}
                {FormatDateTime(profile?.createdAt)}
              </p>
            </div>
          </div>

          )
      }
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col ">

          <div className="h-[3.5rem]">
                <h1 className="text-md md:text-lg font-bold text-slate-900"> Aksi</h1>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-64">
            {/* <button
              onClick={() => setModalState("register")}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
            >
              <Plus size={18} />
              Register Admin
            </button> */}
            {/* <Link href={'register'}
              className="flex items-center justify-center gap-2 w-full bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-700 transition"
            >
              <Plus size={18} />
              Register Admin
            </Link>
            <button
              onClick={() => setModalState("list")}
              className="flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-300 transition"
            >
              <List size={18} />
              View Admins
            </button> */}
            <button
              onClick={() => setModalState("update")}
              className="text-sm md:text-md  flex items-center justify-center gap-2 w-full bg-green-600 text-white px-2 md:px-4 py-2 md:py-3 rounded-xl font-semibold shadow hover:bg-green-600 transition"
            >
              <Edit2 size={18} />
              Update Profile
            </button>
          </div>

        </div>
      </div>

      {/* Preferences */}
      {/* <div className="bg-white shadow-sm rounded-2xl p-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <Zap className="text-pink-500" size={20} />
          Preferences
        </h2>

        <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
          <div>
            <p className="font-medium text-gray-800">Dark Mode</p>
            <p className="text-sm text-gray-500">
              Enable a darker color theme for the dashboard.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition relative">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
            </div>
          </label>
        </div>
      </div> */}

      {/* Modals */}
      <RegisterAdminModal isOpen={modalState === "register"} onClose={closeModal} />
      <AdminListModal superAdmin={profile?.role === "SA"} isOpen={modalState === "list"} onClose={closeModal} />
      <UpdateProfileModal users={profile} isOpen={modalState === "update"} onClose={closeModal} update={fetchData} />
    </div>
  );
}
