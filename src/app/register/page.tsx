// // pages/register.tsx
// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";
// import { Eye, EyeOff, UserPlus } from "lucide-react";
// import { useToast } from "@/components/ToastContect";
// import { authService } from "@/lib/auth";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     user_id: "",
//     email: "",
//     password: "",
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const { showToast } = useToast();

//   const fetchMe = useCallback(async () => {
        
//         setLoading(true);
  
//         try {
          
//           const isValid = await authService.checkSession();
  
//           if (!isValid) {
//             router.push("/login?session=expired");
//             return;
//           }
  
//         } catch (error) {
//           showToast("error", `Gagal mengambil data: ${error}`);
//           console.error("Error fetching data:", error);
//         } finally {
//           setLoading(false);
//         }
//       }, [router, showToast]);
    
  
//   useEffect(() => {
//       fetchMe();
//     }, [fetchMe]);
    
//   const handleRegister = async () => {
//     if (!form.user_id || !form.email || !form.password) {
//       alert("Semua field wajib diisi!");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("api/v1/user/register", form);
//       alert("Berhasil daftar!");
//       router.push("/login");
//     } catch (err) {
//       alert("Gagal daftar! Periksa kembali data Anda.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
//           Daftar Akun Baru
//         </h1>
//         <p className="text-gray-500 text-center mb-8">
//           Buat akun untuk mengakses dashboard
//         </p>

//         {/* Username */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             User ID
//           </label>
//           <input
//             type="text"
//             placeholder="Masukkan username"
//             value={form.user_id}
//             onChange={(e) =>
//               setForm({ ...form, user_id: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Masukkan email"
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//           />
//         </div>


//         {/* Password */}
//         <div className="mb-6 relative">
//           <label className="block text-gray-700 font-medium mb-2">
//             Password
//           </label>
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Masukkan password"
//             value={form.password}
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none pr-10"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>


//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Key Access
//           </label>
//           <input
//             type="text"
//             placeholder="Masukkan key access yang diberikan"
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//           />
//         </div>

//         {/* Tombol Register */}
//         <button
//           onClick={handleRegister}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? "Memproses..." : "Daftar"}
//           {!loading && <UserPlus size={18} />}
//         </button>

//         {/* Footer */}
//         <p className="text-sm text-center text-gray-500 mt-6">
//           Sudah punya akun?{" "}
//           <a
//             href="/login"
//             className="text-indigo-600 hover:underline font-medium"
//           >
//             Login di sini
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
