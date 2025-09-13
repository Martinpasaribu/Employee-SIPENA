// components/FacilityList.tsx
import React from "react";
import { Customer } from "../models";

interface FacilityListProps {
  user: Customer | undefined;
}

export default function FacilityList({ user }: FacilityListProps) {
  // Fungsi helper untuk warna badge status fasilitas
  const getFacilityStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "alert":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="w-full lg:w-[18rem] pt-4 ">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">
        Fasilitas 
      </h3>
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <p className="font-semibold text-gray-800 mb-4">
          {user?.room_key?.name} {user?.room_key?.code}
        </p>
        
        {/* 🔹 Container yang bisa di-scroll ke samping */}
        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-1 pb-4 custom-scrollbar">
          {user?.room_key?.facility?.map((f, index) => (
            <div
              key={index}
              // 🔹 Tambahkan min-w-40 untuk lebar item yang konsisten
              className="flex-none min-w-40 flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{f.name}</p>
                <p className="text-xs text-gray-500">{f.code}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getFacilityStatusColor(
                  f.status
                )}`}
              >
                {f.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}