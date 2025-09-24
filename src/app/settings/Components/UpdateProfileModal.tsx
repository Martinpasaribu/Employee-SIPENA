/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import { useToast } from "@/components/ToastContect";
import { UpdateEmployee } from "../service/service_list_admin";
import { Eye, EyeOff } from "lucide-react";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  update: () => void;
  users: any;
  adminId?: string; // id admin yang mau diupdate
}

export default function UpdateProfileModal({
  isOpen,
  onClose,
  update,
  users,
}: UpdateProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialForm = {
    user_id: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);

  const { showToast } = useToast();

  // isi form otomatis ketika modal terbuka
  useEffect(() => {
    if (isOpen && users) {
      setForm({
        user_id: users.user_id || "",
        username: users.username || "",
        email: users.email || "",
        phone: users.phone || "",
        password: "",
      });
    }
  }, [isOpen, users]);

  const formatUserId = (value: string) =>
    value
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9_]/g, "");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!users?._id) throw new Error("User id kosong");

      const res = await UpdateEmployee(users._id, form);

      showToast("success", res.message || "Update berhasil");

      update();
      onClose();

      // reset form setelah submit
      setForm(initialForm);
    } catch (err: any) {
      showToast("error", err.message || "Update gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal title="Update Your Profile" isOpen={isOpen} onClose={onClose}>
      <form className="space-y-4" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Masukkan user id"
          value={form.user_id}
          onChange={(e) =>
            setForm({ ...form, user_id: formatUserId(e.target.value) })
          }
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <input
          type="text"
          placeholder="New Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <input
          type="email"
          placeholder="New Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="tel"
          placeholder="New Telepon"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </BaseModal>
  );
}
