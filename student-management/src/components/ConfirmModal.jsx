import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, studentName = "this student" }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-glass-container confirm-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="confirm-icon-box">
            <AlertTriangle size={32} className="text-rose" />
          </div>

          <h3 className="confirm-title">Delete Student Record?</h3>
          <p className="confirm-desc">
            Are you sure you want to permanently delete <strong>{studentName}</strong>? All
            associated grades, attendance history, and credentials will be removed.
          </p>

          <div className="confirm-actions">
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-danger-neon" onClick={onConfirm}>
              <Trash2 size={16} /> Delete Permanently
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
