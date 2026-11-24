import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, RotateCw, Sparkles, Shield, QrCode } from "lucide-react";

export default function IDCardModal({ isOpen, onClose, student }) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-glass-container id-card-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <div className="modal-header">
            <div>
              <span className="modal-badge-chip">SMART ID SYSTEM</span>
              <h2>Student Identity Card</h2>
              <p className="modal-subtitle">Official NFC-Enabled Campus Card</p>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div className="id-card-view-wrapper">
            <div className={`id-card-3d ${isFlipped ? "flipped" : ""}`}>
              {/* FRONT SIDE */}
              <div className="id-card-face id-card-front">
                <div className="id-card-hologram" />
                <div className="id-card-top-bar">
                  <div className="id-card-college-brand">
                    <span className="text-xl">🎓</span>
                    <div>
                      <h4 className="college-name">EDUFLOW INSTITUTE</h4>
                      <p className="college-sub">DEPARTMENT OF HIGHER EDUCATION</p>
                    </div>
                  </div>
                  <div className="id-card-chip">
                    <div className="chip-lines" />
                  </div>
                </div>

                <div className="id-card-body">
                  <div className="id-card-photo-box">
                    <div className="id-card-photo">{student.avatar || "👨‍🎓"}</div>
                    <span className="id-status-badge">STUDENT</span>
                  </div>

                  <div className="id-card-info">
                    <h3 className="id-student-name">{student.name}</h3>
                    <p className="id-roll-number">ID: {student.rollNo}</p>

                    <div className="id-meta-grid">
                      <div>
                        <span className="id-label">DEPT:</span>
                        <span className="id-val">{student.department}</span>
                      </div>
                      <div>
                        <span className="id-label">YEAR:</span>
                        <span className="id-val">{student.year}</span>
                      </div>
                      <div>
                        <span className="id-label">BLOOD:</span>
                        <span className="id-val text-rose font-bold">{student.bloodGroup || "O+"}</span>
                      </div>
                      <div>
                        <span className="id-label">PHONE:</span>
                        <span className="id-val">{student.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="id-card-footer">
                  <div className="id-barcode-simulation">
                    <div className="barcode-bars" />
                    <span className="barcode-text">*{student.rollNo}*</span>
                  </div>

                  <div className="id-signature-box">
                    <div className="signature-art">M. Hashim</div>
                    <span className="signature-title">Registrar</span>
                  </div>
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="id-card-face id-card-back">
                <div className="id-card-magnetic-strip" />
                <div className="id-back-content">
                  <div className="id-back-rules">
                    <h5>TERMS & PRIVILEGES</h5>
                    <ol>
                      <li>This card is non-transferable and remains property of EduFlow Institute.</li>
                      <li>Grants access to Smart Campus Labs, Central Library & Transit.</li>
                      <li>Loss of this card must be reported immediately to Dean of Students.</li>
                    </ol>
                  </div>

                  <div className="id-back-qr-row">
                    <div className="id-qr-box">
                      <div className="qr-matrix-sim">
                        <QrCode size={52} className="qr-icon-svg" />
                      </div>
                      <span className="qr-sub">Scan to Verify</span>
                    </div>

                    <div className="id-back-emergency">
                      <p><strong>Campus Security:</strong> +91 (044) 2876-0000</p>
                      <p><strong>Medical Unit:</strong> Ext: #4491</p>
                      <p><strong>Validity:</strong> 2024 - 2028 Academic Cycle</p>
                      <p className="id-address-sm">{student.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="id-card-controls">
            <button
              className="btn-secondary"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <RotateCw size={16} />
              Flip to {isFlipped ? "Front" : "Back"}
            </button>

            <button className="btn-primary-neon" onClick={handlePrint}>
              <Printer size={16} />
              Print / Save ID Card
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
