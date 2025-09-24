"use client";

import BaseModal from "./BaseModal";


interface RegisterAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterAdminModal({ isOpen, onClose }: RegisterAdminModalProps) {
  return (
    <BaseModal title="Register New Admin" isOpen={isOpen} onClose={onClose}>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Register Admin
        </button>
      </form>
    </BaseModal>
  );
}
