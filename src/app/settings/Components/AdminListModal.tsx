/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { GetAdmin, UpdateRoleAdmin } from "../service/service_list_admin";
import { useToast } from "@/components/ToastContect";
import { StatusAdmin } from "../constant";
import { Settings } from "lucide-react";
import UpdateRoleModal from "./UpdateRoleModal";

interface AdminListModalProps {
  isOpen: boolean;
  superAdmin: boolean;
  onClose: () => void;
}

export default function AdminListModal({ isOpen, superAdmin, onClose }: AdminListModalProps) {
  const [admin, setAdmin] = useState<any[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<any | null>(null);
  const { showToast } = useToast();

  const refetchAdmin = async () => {
    try {
      const data = await GetAdmin();
      setAdmin(data || []);
    } catch (err) {
      console.error("Error fetching admin:", err);
      showToast("error", "Gagal memuat data admin");
      setAdmin([]);
    }
  };

  const handleUpdateRole = async (_id: string, role: string) => {
    try {
      await UpdateRoleAdmin(_id, role);
      showToast("success", "Role berhasil diperbarui");
      refetchAdmin();
    } catch (err) {
      console.error("Error updating role:", err);
      showToast("error", "Gagal memperbarui role admin");
    }
  };

  useEffect(() => {
    if (isOpen) {
      refetchAdmin();
    }
  }, [isOpen]);

  return (
    <>
      <BaseModal title="Admin List" isOpen={isOpen} onClose={onClose}>
        <ul className="space-y-3">
          {admin.map((a) => (
            <li
              key={a._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-semibold">User ID : {a.user_id}</div>
                <div className="text-sm text-gray-500">Nama : {a.username}</div>
                <div className="text-sm text-gray-500">Email : {a.email}</div>
              </div>
              <div className="flex flex-col justify-between items-end h-[4rem]">
                {/* Tombol settings hanya muncul kalau login sebagai super admin */}
                {superAdmin && (
                  <button
                    onClick={() => setSelectedAdmin(a)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <Settings size={20} strokeWidth={1.25} />
                  </button>
                )}

                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    StatusAdmin(a.role).className
                  }`}
                >
                  {StatusAdmin(a.role).label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </BaseModal>

      {/* Modal Update Role */}
      {selectedAdmin && (
        <UpdateRoleModal
          isOpen={!!selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
          admin={selectedAdmin}
          onUpdate={handleUpdateRole}
        />
      )}
    </>
  );
}
