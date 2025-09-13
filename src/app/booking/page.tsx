/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Bed, Wifi, Tv, Coffee, CheckCircle } from "lucide-react";
import BookingModal from "./components/AddBookingModal";
import { GetRoom } from "./services/booking_service";
import { Room } from "./models";
import { useToast } from "@/components/ToastContect";

export default function GuestPage() {
  // const [rooms] = useState<Room[]>([
  //   {
  //     code: "6896288c8f6bc5c4855a93b8",
  //     name: "Kamar Standard",
  //     price: 1500000,
  //     facilities: ["AC", "Meja Kerja", "Lemari", "Kamar Mandi Dalam"],
  //     services: ["WiFi Gratis", "Air Mineral", "TV Kabel"],
  //     status: "available",
  //     image:
  //       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  //   },
  //   {
  //     code: "68a961040b9f7a1314a5d839",
  //     name: "Kamar Premium",
  //     price: 2500000,
  //     facilities: ["AC", "Meja Kerja", "Lemari Besar", "Kamar Mandi Dalam", "Balkon"],
  //     services: ["WiFi Cepat", "Air Mineral", "TV Kabel", "Kopi/Teh Gratis"],
  //     status: "available",
  //     image:
  //       "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  //   },
  //   {
  //     code: "R103",
  //     name: "Kamar Ekonomi",
  //     price: 1000000,
  //     facilities: ["Kipas Angin", "Meja Kecil", "Lemari", "Kamar Mandi Luar"],
  //     services: ["WiFi Gratis"],
  //     status: "booked",
  //     image:
  //       "https://images.unsplash.com/photo-1600585153906-3f9a04e9a1dc?auto=format&fit=crop&w=800&q=80",
  //   },
  // ]);

  const [room, setRoom] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await GetRoom();
          setRoom(data);
          // showToast("success", "Booking Berhasil dikirim");
        } catch (err: any) {
            showToast("error", err.response?.data?.message || err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, []);

  const [showBooking, setShowBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room>();



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Kamar Kost Tersedia</h1>
        <p className="text-gray-600 mt-2">
          Temukan kamar yang nyaman dengan fasilitas terbaik untuk Anda
        </p>
      </header>

        <div className="grid md:grid-cols-3 gap-6">
        {room.map((room) => (
            <div
            key={room.code}
            className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 ${
                room.status === false? "opacity-70" : ""
            } flex flex-col`} // <-- flex column di kartu
            >
            {/* <img src={room.image} alt={room.name} className="w-full h-48 object-cover" /> */}

            <div className="p-5 flex flex-col flex-1">
                {/* Konten utama */}
                <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">{room.name}</h2>
                    {room.status === true ? (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                        Tersedia
                    </span>
                    ) : (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                        Terbooking
                    </span>
                    )}
                </div>

                <p className="text-indigo-600 font-bold text-lg mb-3">
                    Rp {room.price.toLocaleString("id-ID")} / bulan
                </p>

                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Fasilitas:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                    {room.facility.map((f, i) => (
                        <li key={i} className="flex items-center gap-1">
                        <CheckCircle size={14} className="text-green-500" />
                        {f.name}
                        </li>
                    ))}
                    </ul>
                </div>

                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Layanan:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                    {/* {room.services.map((s, i) => (
                        <li key={i} className="flex items-center gap-1">
                        <CheckCircle size={14} className="text-blue-500" />
                        {s}
                        </li>
                    ))} */}
                    </ul>
                </div>
                </div>

                {/* Tombol Booking */}
                {room.status === true && (
                <button
                    className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    onClick={() => {
                    setSelectedRoom(room);
                    setShowBooking(true);
                    }}
                >
                    Booking Sekarang
                </button>
                )}
            </div>
            </div>
        ))}

        {/* Modal Booking */}
        <BookingModal
            show={showBooking}
            onClose={() => setShowBooking(false)}
            room={selectedRoom}
        />
        </div>

      
    </div>
  );
}
