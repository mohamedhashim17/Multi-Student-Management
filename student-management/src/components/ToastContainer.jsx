import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useStudentContext();

  return (
    <div className="toast-container" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          return (
            <motion.div
              key={toast.id}
              className={`toast-item toast-${toast.type || "success"}`}
              initial={{ opacity: 0, y: -20, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 40 }}
              transition={{ duration: 0.25 }}
              layout
            >
              <div className="toast-icon">
                {isSuccess && <CheckCircle2 size={20} className="text-emerald" />}
                {isError && <AlertCircle size={20} className="text-rose" />}
                {!isSuccess && !isError && <Info size={20} className="text-cyan" />}
              </div>

              <div className="toast-content">
                <h4 className="toast-title">{toast.title}</h4>
                {toast.message && <p className="toast-message">{toast.message}</p>}
              </div>

              <button
                className="toast-close"
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
              >
                <X size={15} />
              </button>

              <div className="toast-progress-bar" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
