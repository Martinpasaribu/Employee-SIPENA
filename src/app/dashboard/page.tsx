/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Plus } from "lucide-react";
import AddReportModal from "./components/AddReportModal";
import { authService } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Employee } from "./models";
import { formatDate } from "./function";
import GreetingSkeleton from "./components/skeletons/GreetingSkeleton";
import ReportListSkeleton from "./components/skeletons/ReportListSkeleton";
import { getReportCustomer, updateBookingStatus } from "./service/services_report";
import ReportList from "./components/ReportList";
import FacilityList from "./components/FacilityList";
import { useToast } from "@/components/ToastContect";
import Header from "@/components/Header";
// 🔹 Impor Header jika Anda tetap ingin menggunakannya di sini,
//    tetapi ini tidak sesuai dengan praktik terbaik yang kita diskusikan sebelumnya
// import Header from "@/components/Header";

export default function CustomerPage() {
  const [user, setUser] = useState<Employee>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
        setUser(profile);
        const report = await getReportCustomer(profile._id);
        setReports(report);
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

  const handleUpdateStatus = async (status: string) => {
    setLoading(true);
    try {
      await updateBookingStatus(user ? user._id : '', status);
      await fetchData();
      showToast("success", "Status pengajuan keluar berhasil diajukan!");
    } catch (err) {
      showToast("error", `Gagal update status: ${err}`);
      console.error("Gagal update status:", err);
      setLoading(false);
    }
  };

  const handleReportAdded = async () => {
    setShowModal(false);
    await fetchData();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 pt-[4rem]">
      {/* 🔹 Header dan Skeleton Header di sini sudah dihapus karena sudah dipindahkan ke layout.tsx */}
      <Header />
      {/* Greeting Card */}
      {loading ? <GreetingSkeleton /> : (
        <section className="bg-gradient-to-br from-green-700 to-green-800 text-white rounded-xl shadow p-5 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white text-green-800 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <User size={28} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold">
                  Halo, {user?.username} 👋
                </h2>
                <p className="text-sm opacity-90 leading-snug">
                  Senang melihat Anda kembali. Semoga harimu menyenangkan!
                </p>
              </div>
            </div>
            <div className="p-2 flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="text-left sm:text-left">
                  <p className="text-xs sm:text-sm opacity-80">Divisi</p>
                  <p className="text-md sm:text-xl font-bold">{user?.division_key[0]._id.code}</p>
                </div>
                {/* <div className="text-left sm:text-left">
                  <p className="text-xs sm:text-sm opacity-80">Tagihan</p>
                  <p className="text-md sm:text-xl font-bold">{user?.bill_status}</p>
                </div> */}
              </div>
              {/* <div className="text-left sm:text-left">
                <p className="text-xs sm:text-sm opacity-80">Masuk</p>
                <p className="text-md sm:text-xl font-bold">{formatDate(user?.checkIn, true)}</p>
              </div> */}
            </div>
          </div>
        </section>
      )}

      <div className="flex gap-2">
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-950 transition w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Buat Report
          </button>
        </div>
        
        {/* <div className="mb-6">
          <button
            onClick={() => handleUpdateStatus(
              user?.booking_status === "M" ? "AK" : "OTHER"
            )}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition w-full sm:w-auto justify-center 
              ${user?.booking_status === "M" ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            disabled={user?.booking_status !== "M"}
          >
            {user?.booking_status === "M" ? "Ajukan Keluar" : "Pengajuan Keluar"}
          </button>
        </div> */}

      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-6 w-full">
        {loading ? (
            <ReportListSkeleton />
          ) : (
            <ReportList
              reports={reports}
              onReportClick={() => {}} 
              onPreviewImage={setPreviewImage}
              previewImage={previewImage}
            />
        )}
        
        <FacilityList user={user} />
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}

      <AddReportModal
        show={showModal}
        user={user as Employee}
        onClose={() => setShowModal(false)}
        update={handleReportAdded}
      />
    </main>
  );
}