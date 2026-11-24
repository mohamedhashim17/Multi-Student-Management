import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  IdCard,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  BookOpen,
  User,
  ShieldCheck,
  Check,
  AlertCircle,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";
import StudentModal from "../components/StudentModal";
import ConfirmModal from "../components/ConfirmModal";
import IDCardModal from "../components/IDCardModal";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, updateStudent, deleteStudent, markAttendance } = useStudentContext();

  const student = (students || []).find((s) => s?.id === Number(id));

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isIDModalOpen, setIsIDModalOpen] = useState(false);

  if (!student) {
    return (
      <div className="empty-results-card">
        <div className="empty-icon-wrap">⚠️</div>
        <h2>Student Not Found</h2>
        <p>The student with ID #{id} does not exist or was deleted.</p>
        <Link to="/students" className="btn-primary-neon mt-16">
          <ArrowLeft size={16} /> Back to Directory
        </Link>
      </div>
    );
  }

  const att = student.attendance || 0;
  const attColor = att >= 90 ? "#10b981" : att >= 75 ? "#f59e0b" : "#f43f5e";

  const handleAttendanceChange = (status) => {
    markAttendance(student.id, status);
  };

  return (
    <motion.div
      className="student-details-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top Navigation Row */}
      <div className="details-nav-row">
        <Link to="/students" className="btn-back-link">
          <ArrowLeft size={16} />
          <span>Back to Students</span>
        </Link>

        <div className="details-header-actions">
          <button
            className="btn-secondary"
            onClick={() => setIsIDModalOpen(true)}
          >
            <IdCard size={16} />
            <span>Smart ID Card</span>
          </button>

          <button
            className="btn-secondary"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>

          <button
            className="btn-danger-outline"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Student Profile Hero Header Card */}
      <div className="profile-hero-card">
        <div className="profile-hero-banner" />
        <div className="profile-hero-content">
          <div className="profile-avatar-large">
            <span className="avatar-emoji">{student.avatar || "👨‍🎓"}</span>
            <div className="profile-status-badge">● {student.status || "Active"}</div>
          </div>

          <div className="profile-headline-details">
            <div className="flex-center gap-10 flex-wrap">
              <h1 className="profile-name-lg">{student.name}</h1>
              <span className="badge-roll-chip">{student.rollNo}</span>
              <span className="badge-pill-cyan">{student.gender}</span>
            </div>

            <p className="profile-department-text">
              {student.department} • {student.year} • Enrolled 2024
            </p>

            <div className="profile-contact-chips">
              <span className="contact-chip">
                <Mail size={14} className="text-emerald" /> {student.email}
              </span>
              <span className="contact-chip">
                <Phone size={14} className="text-cyan" /> {student.phone}
              </span>
              <span className="contact-chip">
                <MapPin size={14} className="text-magenta" /> {student.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details 3-Column / Grid Layout */}
      <div className="details-sections-grid">
        {/* Left Column: Academic & Personal Info */}
        <div className="details-col">
          <div className="details-card">
            <div className="card-top-controls">
              <div>
                <span className="section-pill">CREDENTIALS</span>
                <h3 className="card-title">Personal & Academic Info</h3>
              </div>
              <User size={18} className="text-emerald" />
            </div>

            <div className="info-keyvalue-list">
              <div className="info-kv-row">
                <span className="info-key">Full Legal Name</span>
                <span className="info-val">{student.name}</span>
              </div>
              <div className="info-kv-row">
                <span className="info-key">University Roll No</span>
                <span className="info-val font-mono">{student.rollNo}</span>
              </div>
              <div className="info-kv-row">
                <span className="info-key">Department Major</span>
                <span className="info-val">{student.department}</span>
              </div>
              <div className="info-kv-row">
                <span className="info-key">Academic Year</span>
                <span className="info-val">{student.year}</span>
              </div>
              <div className="info-kv-row">
                <span className="info-key">Cumulative GPA</span>
                <span className="info-val text-emerald font-bold">{student.cgpa} / 10.0</span>
              </div>
              <div className="info-kv-row">
                <span className="info-key">Date of Birth</span>
                <span className="info-val">{student.dob || "2004-05-12"}</span>
              </div>
              <div className="info-kv-row">
                <span className="info-key">Blood Group</span>
                <span className="info-val text-rose font-bold">{student.bloodGroup || "O+"}</span>
              </div>
              <div className="info-kv-row">
                <span className="info-key">Residential Address</span>
                <span className="info-val">{student.address}</span>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="details-card mt-20">
            <div className="card-top-controls">
              <div>
                <span className="section-pill">ENROLLMENT</span>
                <h3 className="card-title">Curriculum Subjects</h3>
              </div>
              <BookOpen size={18} className="text-purple" />
            </div>

            <div className="courses-list">
              {(student.courses || [
                { code: "CS401", name: "Algorithms & Complex Systems", grade: "A+", credits: 4 },
                { code: "CS402", name: "Operating Systems Internals", grade: "A", credits: 4 },
                { code: "CS403", name: "Database Engineering", grade: "O", credits: 3 },
              ]).map((c) => (
                <div key={c.code} className="course-item-row">
                  <div>
                    <span className="course-code">{c.code}</span>
                    <h5 className="course-name">{c.name}</h5>
                    <span className="course-credits">{c.credits} Credits</span>
                  </div>
                  <span className="course-grade-badge">{c.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Attendance Tracking System & Interactive Log */}
        <div className="details-col">
          <div className="details-card">
            <div className="card-top-controls">
              <div>
                <span className="section-pill">LIVE TRACKER</span>
                <h3 className="card-title">Attendance Tracking System</h3>
              </div>
              <Sparkles size={18} className="text-cyan" />
            </div>

            {/* Attendance Gauge & Today Marker */}
            <div className="attendance-gauge-section">
              <div className="circular-meter-box">
                <svg viewBox="0 0 100 100" className="gauge-svg">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={attColor}
                    strokeWidth="10"
                    strokeDasharray={`${att * 2.51} 251`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="gauge-center-content">
                  <span className="gauge-percent">{att}%</span>
                  <span className="gauge-label">Overall</span>
                </div>
              </div>

              <div className="gauge-status-info">
                <h4>Today's Attendance Status</h4>
                <p className="text-sm opacity-75">
                  Update student's daily biometric presence in one click:
                </p>

                <div className="attendance-action-pills">
                  <button
                    className="att-pill-btn btn-present"
                    onClick={() => handleAttendanceChange("Present")}
                  >
                    <Check size={14} /> Present
                  </button>
                  <button
                    className="att-pill-btn btn-absent"
                    onClick={() => handleAttendanceChange("Absent")}
                  >
                    <XCircle size={14} /> Absent
                  </button>
                  <button
                    className="att-pill-btn btn-late"
                    onClick={() => handleAttendanceChange("Late")}
                  >
                    <Clock size={14} /> Late
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance History Timeline */}
            <div className="attendance-history-box">
              <h4 className="history-heading">Recent Attendance Logs</h4>
              <div className="history-logs-list">
                {(student.attendanceHistory || [
                  { date: "2026-11-23", status: "Present" },
                  { date: "2026-11-22", status: "Present" },
                  { date: "2026-11-21", status: "Present" },
                  { date: "2026-11-20", status: "Absent" },
                  { date: "2026-11-19", status: "Present" },
                ]).map((log, idx) => (
                  <div key={idx} className="history-row">
                    <span className="history-date">
                      <Calendar size={13} className="inline mr-1" />
                      {log.date}
                    </span>
                    <span
                      className={`history-status-badge ${
                        log.status === "Present"
                          ? "status-present"
                          : log.status === "Absent"
                          ? "status-absent"
                          : "status-late"
                      }`}
                    >
                      {log.status === "Present" && <Check size={12} />}
                      {log.status === "Absent" && <XCircle size={12} />}
                      {log.status === "Late" && <Clock size={12} />}
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Smart ID Preview Box */}
          <div className="details-card mt-20">
            <div className="card-top-controls">
              <div>
                <span className="section-pill">CAMPUS PASS</span>
                <h3 className="card-title">Digital NFC Pass</h3>
              </div>
              <ShieldCheck size={18} className="text-emerald" />
            </div>

            <div className="embedded-id-snippet" onClick={() => setIsIDModalOpen(true)}>
              <div className="mini-id-card">
                <div className="flex-between">
                  <span className="mini-id-brand">🎓 EDUFLOW ID</span>
                  <span className="mini-id-chip" />
                </div>
                <div className="mini-id-body">
                  <div className="mini-avatar">{student.avatar || "👨‍🎓"}</div>
                  <div>
                    <h5 className="mini-name">{student.name}</h5>
                    <p className="mini-roll">{student.rollNo}</p>
                    <p className="mini-dept">{student.department}</p>
                  </div>
                </div>
                <div className="mini-id-footer">
                  <span>TAP TO PREVIEW & PRINT FULL 3D CARD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <StudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => {
          updateStudent(student.id, data);
        }}
        studentToEdit={student}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          deleteStudent(student.id);
          navigate("/students");
        }}
        studentName={student.name}
      />

      {/* ID Card Modal */}
      <IDCardModal
        isOpen={isIDModalOpen}
        onClose={() => setIsIDModalOpen(false)}
        student={student}
      />
    </motion.div>
  );
}
