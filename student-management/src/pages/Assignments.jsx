import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Clock,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Award,
  Sparkles,
  Calendar,
  X,
  FileCheck,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function Assignments() {
  const { assignments, submitAssignment, addToast } = useStudentContext();

  const safeAssignments = assignments || [];
  const [filterStatus, setFilterStatus] = useState("All"); // 'All' | 'Pending' | 'Submitted' | 'Graded'
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadNotes, setUploadNotes] = useState("");

  const filtered = safeAssignments.filter((a) => {
    if (filterStatus === "All") return true;
    return a?.status === filterStatus;
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    if (!uploadedFileName) {
      addToast("Upload Required", "Please attach a solution document before submitting.", "error");
      return;
    }
    submitAssignment(selectedAssignment.id, uploadedFileName);
    setSelectedAssignment(null);
    setUploadedFileName("");
    setUploadNotes("");
  };

  return (
    <div className="assignments-page-wrapper">
      {/* Top Banner */}
      <div className="page-header-card">
        <div>
          <div className="flex-center gap-8">
            <span className="section-pill">ONLINE SUBMISSION PORTAL</span>
            <span className="badge-pill-cyan">{safeAssignments.filter((a) => a?.status === "Pending").length} Due Soon</span>
          </div>
          <h1 className="page-main-heading">
            Assignments & <span className="text-glow-emerald">Evaluations</span>
          </h1>
          <p className="page-subtext">
            Submit coursework, track submission deadlines, receive teacher grading and detailed academic feedback.
          </p>
        </div>

        <div className="assignment-filter-pills">
          {["All", "Pending", "Submitted", "Graded"].map((st) => (
            <button
              key={st}
              className={`filter-btn ${filterStatus === st ? "active" : ""}`}
              onClick={() => setFilterStatus(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="assignments-cards-grid mt-24">
        {filtered.map((task) => {
          const isPending = task.status === "Pending";
          const isSubmitted = task.status === "Submitted";
          const isGraded = task.status === "Graded";

          return (
            <div key={task.id} className="assignment-glass-card">
              <div className="flex-between items-start mb-12">
                <span className="badge-pill-cyan font-mono">{task.code}</span>
                <span
                  className={`task-status-chip ${
                    isGraded
                      ? "status-graded"
                      : isSubmitted
                      ? "status-submitted"
                      : "status-pending"
                  }`}
                >
                  {isGraded && <Award size={12} />}
                  {isSubmitted && <CheckCircle size={12} />}
                  {isPending && <Clock size={12} />}
                  {task.status}
                </span>
              </div>

              <span className="task-subj-name">{task.subject}</span>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-instructions">{task.instructions}</p>

              <div className="task-meta-row">
                <div className="flex-center gap-6 text-xs text-muted">
                  <Calendar size={13} className="text-emerald" />
                  <span>Due: {task.dueDate}</span>
                </div>
                <span className="text-xs font-bold text-amber">
                  Max Marks: {task.maxMarks}
                </span>
              </div>

              {/* Submission details or Teacher Feedback */}
              {task.submissionFile && (
                <div className="task-submitted-file-box">
                  <FileCheck size={16} className="text-emerald" />
                  <span className="file-name">{task.submissionFile}</span>
                </div>
              )}

              {task.feedback && (
                <div className="teacher-feedback-box">
                  <div className="feedback-header">
                    <MessageSquare size={14} className="text-cyan" />
                    <span>Faculty Evaluation & Feedback:</span>
                  </div>
                  <p className="feedback-body">"{task.feedback}"</p>
                  {task.grade && (
                    <div className="grade-badge-awarded">
                      Score: <strong>{task.grade}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <div className="task-action-footer">
                {isPending ? (
                  <button
                    className="btn-primary-neon w-full"
                    onClick={() => {
                      setSelectedAssignment(task);
                      setUploadedFileName(`Solution_${task.code}_CS001.pdf`);
                    }}
                  >
                    <UploadCloud size={16} /> Submit Assignment
                  </button>
                ) : (
                  <button
                    className="btn-secondary w-full"
                    onClick={() =>
                      addToast("Viewing Submission", `Viewing file: ${task.submissionFile}`, "info")
                    }
                  >
                    <FileText size={15} /> View Uploaded File
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <div className="modal-overlay" onClick={() => setSelectedAssignment(null)}>
            <motion.div
              className="modal-glass-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="modal-header">
                <div>
                  <span className="modal-badge-chip">FILE SUBMISSION</span>
                  <h2>{selectedAssignment.title}</h2>
                  <p className="modal-subtitle">Course: {selectedAssignment.subject} ({selectedAssignment.code})</p>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedAssignment(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleConfirmSubmit} className="modal-form">
                <div className="form-scrollable-body">
                  <div className="file-dropzone-box">
                    <UploadCloud size={42} className="text-emerald animate-bounce" />
                    <h4>Drag and drop your project file or click to browse</h4>
                    <p className="text-xs text-muted">Supports PDF, ZIP, DOCX, or IPYNB (Max 25 MB)</p>
                    <input
                      type="file"
                      id="assignment-file"
                      className="hidden-file-input"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="assignment-file" className="btn-secondary mt-10">
                      Browse Local Files
                    </label>
                  </div>

                  {uploadedFileName && (
                    <div className="staged-file-indicator">
                      <FileCheck size={18} className="text-emerald" />
                      <div>
                        <strong>{uploadedFileName}</strong>
                        <p className="text-xs text-muted">Ready to dispatch to instructor portal</p>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Optional Comments for Professor</label>
                    <textarea
                      rows={3}
                      placeholder="Add any notes regarding libraries used, execution commands, or assumptions..."
                      value={uploadNotes}
                      onChange={(e) => setUploadNotes(e.target.value)}
                      className="glass-textarea"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setSelectedAssignment(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-neon">
                    <Sparkles size={16} /> Confirm & Turn In
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
