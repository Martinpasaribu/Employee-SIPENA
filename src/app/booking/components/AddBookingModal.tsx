/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { AddBooking } from "../services/booking_service";
import { Booking, BookingApi, Room } from "../models";
import { useToast } from "@/components/ToastContect";

interface BookingModalProps {
  show: boolean;
  onClose: () => void;
  room?: Room;
}

export default function BookingModal({ show, onClose, room }: BookingModalProps) {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    booking_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload: BookingApi = {
        username: form.username,
        phone: Number(form.phone),
        email: form.email,
        booking_date: new Date(form.booking_date),
        room_key: room ? room._id : "",
      };

      await AddBooking(payload);

      showToast("success", "Berhasil tambah kamar");
      setForm({ username: "", phone: "", email: "", booking_date: "" });
    } catch (err : any) {
      console.error("Gagal kirim booking", err);
      showToast("error", err.response?.data?.message || err.message);
    }

    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white text-gray-500 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Booking Kamar {room?.code}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="tel"
            placeholder="No WhatsApp"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="email"
            placeholder="Alamat Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="date"
            value={form.booking_date}
            onChange={(e) => setForm({ ...form, booking_date: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />

          {message && <p className="text-sm text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Mengirim..." : "Kirim Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
