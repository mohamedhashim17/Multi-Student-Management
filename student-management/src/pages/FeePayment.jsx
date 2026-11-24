import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  Download,
  Receipt,
  ShieldCheck,
  Clock,
  Sparkles,
  Printer,
  X,
  Smartphone,
  Building,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function FeePayment() {
  const { currentStudent, feeDetails, payFee, addToast } = useStudentContext();

  const safeFee = feeDetails || {};
  const dueAmount = Number(safeFee.dueAmount || 0);
  const totalAnnualFee = Number(safeFee.totalAnnualFee || 120000);
  const paidAmount = Number(safeFee.paidAmount || 100000);
  const status = safeFee.status || (dueAmount > 0 ? "Pending Dues" : "Paid");
  const dueDate = safeFee.dueDate || "15 Dec 2026";
  const academicYear = safeFee.academicYear || "2026-27";
  const breakdown = Array.isArray(safeFee.breakdown) ? safeFee.breakdown : [];
  const transactions = Array.isArray(safeFee.transactions) ? safeFee.transactions : [];

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [payAmount, setPayAmount] = useState(dueAmount > 0 ? String(dueAmount) : "10000");
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState("rahim@okhdfcbank");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const modeName =
        paymentMethod === "upi"
          ? "UPI (Instant QR / App)"
          : paymentMethod === "card"
          ? "Credit / Debit Card (Visa)"
          : "Netbanking Portal";
      const rec = payFee(Number(payAmount), modeName);
      setIsProcessing(false);
      setIsPayModalOpen(false);
    }, 1200);
  };

  const handlePrintReceipt = (txn) => {
    setSelectedReceipt(txn);
  };

  return (
    <div className="fee-page-wrapper">
      {/* Top Banner */}
      <div className="page-header-card">
        <div>
          <div className="flex-center gap-8">
            <span className="section-pill">ONLINE FINANCIAL PORTAL</span>
            <span className={`badge-pill-${dueAmount > 0 ? "rose" : "emerald"}`}>
              {status}
            </span>
          </div>
          <h1 className="page-main-heading">
            Tuition & Campus <span className="text-glow-emerald">Fee Management</span>
          </h1>
          <p className="page-subtext">
            Instant secure online fee settlement via UPI or cards, detailed fee ledger, and downloadable official receipts.
          </p>
        </div>

        {dueAmount > 0 && (
          <button
            className="btn-primary-neon"
            onClick={() => setIsPayModalOpen(true)}
          >
            <CreditCard size={16} /> Pay Due Balance (₹{dueAmount.toLocaleString()})
          </button>
        )}
      </div>

      {/* 3 Metric Cards */}
      <div className="stats-kpi-grid mt-24">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">TOTAL ANNUAL FEE</span>
            <div className="kpi-icon-box bg-cyan-dim">
              <Receipt size={18} className="text-cyan" />
            </div>
          </div>
          <h2 className="kpi-value">₹{totalAnnualFee.toLocaleString()}</h2>
          <p className="kpi-subtext">Academic Cycle {academicYear}</p>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">TOTAL PAID AMOUNT</span>
            <div className="kpi-icon-box bg-emerald-dim">
              <CheckCircle2 size={18} className="text-emerald" />
            </div>
          </div>
          <h2 className="kpi-value text-emerald">₹{paidAmount.toLocaleString()}</h2>
          <p className="kpi-subtext">Verified by Bursar & Accounts Office</p>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">PENDING DUE BALANCE</span>
            <div className="kpi-icon-box bg-magenta-dim">
              <Clock size={18} className="text-magenta" />
            </div>
          </div>
          <h2 className={`kpi-value ${dueAmount > 0 ? "text-rose" : "text-emerald"}`}>
            ₹{dueAmount.toLocaleString()}
          </h2>
          <p className="kpi-subtext">Due by: <strong>{dueDate}</strong></p>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">PAYMENT SECURITY</span>
            <div className="kpi-icon-box bg-purple-dim">
              <ShieldCheck size={18} className="text-purple" />
            </div>
          </div>
          <h2 className="kpi-value text-sm font-bold">256-Bit Encrypted</h2>
          <p className="kpi-subtext">NPCI / RBI Authorized Gateway</p>
        </div>
      </div>

      {/* Split Breakdown & Transactions */}
      <div className="dashboard-analytics-grid mt-24">
        {/* Fee Itemized Breakdown */}
        <div className="analytics-card">
          <div className="card-top-controls">
            <div>
              <span className="section-pill">BREAKDOWN</span>
              <h3 className="card-title">Institutional Fee Schedule</h3>
            </div>
            <Receipt size={18} className="text-emerald" />
          </div>

          <div className="fee-breakdown-list">
            {breakdown.map((item, idx) => (
              <div key={idx} className="fee-item-row">
                <div>
                  <h4 className="fee-item-name">{item?.item || "Tuition Fee"}</h4>
                  <span className="text-xs text-muted">
                    Total: ₹{(item?.amount || 0).toLocaleString()}
                  </span>
                </div>

                <div className="fee-item-values">
                  <span className="text-emerald font-bold">
                    Paid: ₹{(item?.paid || 0).toLocaleString()}
                  </span>
                  {(item?.due || 0) > 0 && (
                    <span className="text-rose font-bold text-xs">
                      Due: ₹{(item?.due || 0).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History & Downloadable Receipts */}
        <div className="analytics-card">
          <div className="card-top-controls">
            <div>
              <span className="section-pill">TRANSACTION LEDGER</span>
              <h3 className="card-title">Payment History</h3>
            </div>
            <Download size={18} className="text-cyan" />
          </div>

          <div className="transactions-list">
            {transactions.map((txn) => (
              <div key={txn.id} className="transaction-glass-row">
                <div className="txn-icon-box">
                  <CheckCircle2 size={16} className="text-emerald" />
                </div>

                <div className="txn-meta">
                  <div className="flex-between">
                    <span className="font-bold text-sm">₹{(txn?.amount || 0).toLocaleString()}</span>
                    <span className="font-mono text-xs text-emerald">{txn?.receiptNo}</span>
                  </div>
                  <p className="text-xs text-muted">{txn?.mode} • {txn?.date}</p>
                </div>

                <button
                  className="btn-secondary text-xs"
                  onClick={() => handlePrintReceipt(txn)}
                  title="Download / View Receipt"
                >
                  <Receipt size={13} /> Receipt
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <AnimatePresence>
        {isPayModalOpen && (
          <div className="modal-overlay" onClick={() => setIsPayModalOpen(false)}>
            <motion.div
              className="modal-glass-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="modal-header">
                <div>
                  <span className="modal-badge-chip">SECURE CHECKOUT</span>
                  <h2>College Fee Payment Gateway</h2>
                  <p className="modal-subtitle">Pay securely for {currentStudent.name} ({currentStudent.rollNo})</p>
                </div>
                <button className="modal-close-btn" onClick={() => setIsPayModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handlePaySubmit} className="modal-form">
                <div className="form-scrollable-body">
                  <div className="form-group">
                    <label className="form-label">Payment Amount (INR)</label>
                    <input
                      type="number"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="font-bold text-lg"
                      min="100"
                      max={feeDetails.dueAmount > 0 ? feeDetails.dueAmount : 100000}
                    />
                  </div>

                  <div className="payment-method-tabs mt-10">
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === "upi" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("upi")}
                    >
                      <Smartphone size={16} /> UPI / QR
                    </button>
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === "card" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard size={16} /> Debit / Credit Card
                    </button>
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === "netbanking" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("netbanking")}
                    >
                      <Building size={16} /> Netbanking
                    </button>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="upi-qr-display-box">
                      <div className="qr-sim-box">
                        <QrCode size={130} className="text-dark" />
                        <span className="qr-scan-label">Scan with GPay / PhonePe / Paytm</span>
                      </div>
                      <div className="upi-or-divider">OR ENTER VPA</div>
                      <input
                        type="text"
                        placeholder="yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="card-input-fields">
                      <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input type="text" placeholder="4111 2222 3333 4444" defaultValue="4532 •••• •••• 8812" />
                      </div>
                      <div className="form-row two-cols">
                        <div className="form-group">
                          <label className="form-label">Expiry (MM/YY)</label>
                          <input type="text" placeholder="12/28" defaultValue="09/28" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">CVV</label>
                          <input type="password" placeholder="•••" defaultValue="781" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="form-group">
                      <label className="form-label">Select Bank</label>
                      <select defaultValue="HDFC Bank">
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Punjab National Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsPayModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-neon"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing Payment..." : `Authorize Payment of ₹${Number(payAmount).toLocaleString()}`}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Official Receipt Modal */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="modal-overlay" onClick={() => setSelectedReceipt(null)}>
            <motion.div
              className="modal-glass-container receipt-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="receipt-paper">
                <div className="receipt-header">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <h3>EDUFLOW INSTITUTE OF HIGHER LEARNING</h3>
                    <p className="text-xs">OFFICIAL STUDENT FEE PAYMENT RECEIPT</p>
                  </div>
                </div>

                <div className="receipt-meta-grid">
                  <div>
                    <span className="r-label">Receipt No:</span>
                    <strong className="r-val">{selectedReceipt.receiptNo}</strong>
                  </div>
                  <div>
                    <span className="r-label">Date:</span>
                    <strong className="r-val">{selectedReceipt.date}</strong>
                  </div>
                  <div>
                    <span className="r-label">Student Name:</span>
                    <strong className="r-val">{currentStudent.name}</strong>
                  </div>
                  <div>
                    <span className="r-label">Roll Number:</span>
                    <strong className="r-val">{currentStudent.rollNo}</strong>
                  </div>
                  <div>
                    <span className="r-label">Department:</span>
                    <strong className="r-val">{currentStudent.department}</strong>
                  </div>
                  <div>
                    <span className="r-label">Payment Mode:</span>
                    <strong className="r-val">{selectedReceipt.mode}</strong>
                  </div>
                </div>

                <div className="receipt-amount-banner">
                  <span>Total Amount Paid:</span>
                  <h2>₹{selectedReceipt.amount.toLocaleString()}</h2>
                  <span className="badge-pill-emerald text-xs">STATUS: SUCCESSFUL</span>
                </div>

                <div className="receipt-footer">
                  <p className="text-xs text-muted">Transaction ID: {selectedReceipt.id} • Auth Code: {selectedReceipt.ref}</p>
                  <p className="text-xs text-dim">This is a system-generated electronic receipt and does not require a physical signature.</p>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setSelectedReceipt(null)}>
                  Close
                </button>
                <button className="btn-primary-neon" onClick={() => window.print()}>
                  <Printer size={15} /> Print / Save as PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
