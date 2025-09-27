/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Division_key, Items } from "../models";
import { Eye } from "lucide-react";

interface FacilityListProps {
  division: Division_key[];
}

export default function FacilityList({ division }: FacilityListProps) {
  const [selectedDivision, setSelectedDivision] = useState<Division_key | null>(null);

  // Fungsi warna status item
  const getFacilityStatusColor = (status: string) => {
    switch (status) {
      case "A":
        return "bg-green-100 text-green-700"; // Available
      case "R":
        return "bg-yellow-100 text-yellow-700"; // Repair
      case "B":
        return "bg-red-100 text-red-700"; // Broken
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="w-full lg:w-[28rem] pt-4 space-y-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
        Fasilitas Divisi
      </h3>

      {/* List Divisi */}
      {division
        ?.filter((div) => div && div._id)
        .map((div, divIndex) => {
          const validItems = (div.item_key || []).filter(
            (item: Items) => item && item._id
          );

          return (
            <div
              key={divIndex}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
            >
              {/* Header Divisi */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <p className="text-sm font-semibold text-gray-800">
                  {div.name} ({div.code})
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-gray-50 bg-green-700 p-1 px-[.6rem] rounded-full">
                    {validItems.length}
                  </span>

                  {/* Tombol lihat hanya di mobile */}
                  <button
                    onClick={() => setSelectedDivision(div)}
                    className="lg:hidden flex items-center gap-1 text-green-600 hover:text-green-800 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat
                  </button>
                </div>
              </div>

              {/* List Item — tampil langsung di desktop */}
              <div className="hidden lg:flex lg:flex-col lg:gap-2 ">
                {validItems.length > 0 ? (
                  validItems.map((f: Items) => (
                    <div
                      key={f._id}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{f.name}</p>
                        <p className="text-xs text-gray-500">{f.code || "-"}</p>
                      </div>
                      <span
                        className={`px-1  rounded-full text-xs font-medium ${getFacilityStatusColor(
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

      {/* Modal daftar item untuk mobile */}
      {selectedDivision && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-5">
            <h4 className="text-sm font-semibold mb-4 text-gray-800">
              {selectedDivision.name} ({selectedDivision.code})
            </h4>

            <div className="max-h-[60vh] overflow-y-auto space-y-3">
              {selectedDivision.item_key?.length ? (
                selectedDivision.item_key.map((f: any) => (
                  <div
                    key={f._id}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {f.name}
                      </p>
                      <p className="text-xs text-gray-500">{f.code || "-"}</p>
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

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedDivision(null)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
