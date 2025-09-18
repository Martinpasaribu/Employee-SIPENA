// components/FacilityList.tsx
import React from "react";
import { Division_key, Items } from "../models";

interface FacilityListProps {
  division: Division_key[];
}

export default function FacilityList({ division }: FacilityListProps) {
  // Warna badge status item
  const getFacilityStatusColor = (status: string) => {
    switch (status) {
      case "A":
        return "bg-green-100 text-green-700"; // Available
      case "R":
        return "bg-yellow-100 text-yellow-700"; // Repair
      case "B":
        return "bg-red-100 text-red-700"; // Broken/Bad
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="w-full lg:w-[22rem] pt-4 space-y-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
        Fasilitas Divisi
      </h3>

{division
  .filter((div) => div && div._id) // skip kalau null
  .map((div, divIndex) => {
    // langsung pakai div, bukan div._id
    const validItems = (div.item_key || []).filter(
      (item: Items) => item && item._id
    );

    return (
      <div
        key={divIndex}
        className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
      >
        {/* Nama Divisi */}
        <p className="font-semibold text-gray-800 mb-4">
          {div.name} ({div.code})
        </p>

        {/* List Items */}
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 pb-4">
          {validItems.length > 0 ? (
            validItems.map((f: Items) => (
              <div
                key={f._id}
                className="flex-wrap items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{f.name}</p>
                  <p className="text-xs text-gray-500">{f.nup || "-"}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getFacilityStatusColor(
                    f.status
                  )}`}
                >
                  {f.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Tidak ada item</p>
          )}
        </div>


      </div>
    );
  })}


    </section>
  );
}
