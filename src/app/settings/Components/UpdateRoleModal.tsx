/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BaseModal from "./BaseModal";
import { useState, useEffect } from "react";

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: any | null;
  onUpdate: (id: string, role: string) => Promise<void>;
}

export default function UpdateRoleModal({
  isOpen,
  onClose,
  admin,
  onUpdate,
}: UpdateRoleModalProps) {
  const [role, setRole] = useState(admin?.role || "");

  useEffect(() => {
    if (admin) {
      setRole(admin.role);
    }
  }, [admin]);

  const handleSubmit = async () => {
    if (!admin?._id) return;
    await onUpdate(admin._id, role);
    onClose();
  };

  return (
    <BaseModal title="Update Role Admin" isOpen={isOpen} onClose={onClose}>
      {admin && (
        <div>
          <p className="mb-2 text-sm">
            Update role untuk:{" "}
            <span className="font-semibold text-blue-600">{admin.username}</span>
          </p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="">Pilih Role</option>
            <option value="A">Admin</option>
            <option value="CA">Co Admin</option>
            <option value="SA">Super Admin</option>
          </select>

          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-sm hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
