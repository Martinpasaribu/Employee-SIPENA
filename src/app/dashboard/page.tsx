/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Plus } from "lucide-react";
import AddReportModal from "./components/AddReportModal";
import { authService } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Employee, EmployeeMappingAddReport } from "./models";
import GreetingSkeleton from "./components/skeletons/GreetingSkeleton";
import ReportListSkeleton from "./components/skeletons/ReportListSkeleton";
import { getReportCustomer } from "./service/services_report";
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


  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/login"); // Redirect ke halaman login setelah berhasil logout
    } catch (error) {
      console.error("Logout gagal:", error);
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

      <section className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          
          {/* Left - User Info */}
            <div className="flex flex-col justify-start items-start gap-4">
              
              <div className="flex  gap-2">
                <div className="bg-white text-indigo-600 p-3 rounded-full w-12 h-12 flex items-center justify-center">
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

              <div className="mt-3 hidden md:flex" >
                <button onClick={handleLogout} className="px-2 py-1 bg-white text-black rounded-md ">
                  Keluar
                </button>
              </div>

            </div>

          {/* Right - Additional Info */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="text-left">
              <p className="text-xs sm:text-sm opacity-80">Divisi</p>
              <div className="text-base sm:text-lg font-semibold text-green-100">
                {/* {user?.division_key[0].code} */}
                {user?.division_key.map((item: any, index: number) => (
                  

                    <p key={index}>
                        {item?.code}
                    </p>

                ))}

              </div>
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm opacity-80">Report</p>
              <p className="text-base sm:text-lg font-semibold text-green-100">
                {reports.length}
              </p>
            </div>
            {/* Bisa ditambahkan card info lain */}
            {/* <div className="text-left">
              <p className="text-xs sm:text-sm opacity-80">Tagihan</p>
              <p className="text-base sm:text-lg font-semibold text-green-100">
                {user?.bill_status}
              </p>
            </div> */}
          </div>
        </div>
      </section>


      )}

      <div className="flex gap-2">
        <div className="mb-2">
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
        
        <FacilityList division={user?.division_key || []} />

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
        user={user as EmployeeMappingAddReport}
        onClose={() => setShowModal(false)}
        update={handleReportAdded}
      />
    </main>
  );
}