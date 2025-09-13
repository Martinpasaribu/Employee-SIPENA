"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  AlertCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";

type ToastType = "success" | "error" | "loading" | "warning";

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextProps {
  toasts: ToastMessage[];
  showToast: (type: ToastType, message: string) => void;
  hideToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto remove except for loading (which must be removed manually)
    if (type !== "loading") {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    }

    return id; // return id in case user wants to remove manually
  }, []);

  const hideToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}

      <div
        className="fixed top-5 right-5 flex flex-col gap-3 z-50 max-w-xs"
        aria-live="assertive"
      >
        <AnimatePresence>
          {toasts.map(({ id, type, message }) => {
            const icon =
              type === "success" ? (
                <Check className="text-blue-200" size={24} />
              ) : type === "error" ? (
                <AlertCircle className="text-red-200" size={24} />
              ) : type === "warning" ? (
                <AlertTriangle className="text-yellow-200" size={24} />
              ) : type === "loading" ? (
                <Loader2
                  className="text-blue-200 animate-spin"
                  size={24}
                />
              ) : null;

            const bgColor =
              type === "success"
                ? "bg-blue-600"
                : type === "error"
                ? "bg-red-700"
                : type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-600"; // loading bg same as success

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 rounded-lg px-5 py-3 shadow-lg text-white select-none ${bgColor}`}
                role="alert"
              >
                {icon}
                <span className="flex-1 text-sm font-medium">{message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast must be used within ToastProvider");
  return context;
}


// const { showToast, hideToast } = useToast();

// // Success
// showToast("success", "Berhasil menambahkan room!");

// // Error
// showToast("error", "Gagal menambahkan room!");

// // Warning
// showToast("warning", "Perhatian: harga terlalu rendah!");

// // Loading (harus manual di-hide)
// const idLoading = showToast("loading", "Sedang memproses...");
// // Setelah selesai
// hideToast(idLoading);
