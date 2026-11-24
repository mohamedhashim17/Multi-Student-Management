import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  TrendingUp,
  Award,
  ArrowUpRight,
  Plus,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  CreditCard,
  Bell,
  Bot,
  Flame,
  FileText,
  UserCheck,
  ShieldAlert,
  Phone,
  Mail,
  Receipt,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";
import TickerBar from "../components/TickerBar";
import StudentModal from "../components/StudentModal";

export default function Home() {
  const {
    t = (k) => k,
    role = "student",
    setRole,
    currentUser = {},
    currentStudent = {},
    todayClasses = [],
    assignments = [],
    pendingAssignments = [],
    subjectAttendance = [],
    feeDetails = {},
    campusNotices = [],
    students = [],
    activities = [],
    addStudent,
    markAttendance,
    addToast,
  } = useStudentContext();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Role Switch Handler
  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    const labels = {
      student: "Student Portal (Rahim Basha)",
      parent: "Parent Monitoring View (Farooq Basha)",
      faculty: "Faculty & Academic Admin Console (Dr. K. Senthil Kumar)",
    };
    if (addToast) {
      addToast("Portal Changed", `Switched to ${labels[newRole]}`, "success");
    }
  };

  // Safe list of assignments
  const allAssignments = assignments && assignments.length > 0 ? assignments : (pendingAssignments || []);

  // Overall attendance
  const safeAttendance = Array.isArray(subjectAttendance) ? subjectAttendance : [];
  const avgAttendance = safeAttendance.length > 0
    ? Math.round(
        safeAttendance.reduce((acc, s) => acc + (s && s.total > 0 ? (s.attended / s.total) * 100 : 0), 0) /
          safeAttendance.length
      )
    : 92;

  // Low attendance alert subjects
  const lowAttendanceSubjects = safeAttendance.filter(
    (s) => s && s.total > 0 && Math.round((s.attended / s.total) * 100) < 75
  );

  const pendingTasksCount = allAssignments.filter((a) => a && a.status === "Pending").length;

  const currentDateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="home-dashboard-wrapper">
      {/* Role Switcher Indicator Banner */}
      <div className="role-switcher-banner mb-16">
        <div className="flex-center gap-10">
          <span className="text-xs font-bold text-muted">VIEWING MODE:</span>
          <div className="role-pills-row">
            <button
              className={`role-pill-btn ${role === "student" ? "active" : ""}`}
              onClick={() => handleRoleSwitch("student")}
            >
              🎓 Student Portal
            </button>
            <button
              className={`role-pill-btn ${role === "parent" ? "active" : ""}`}
              onClick={() => handleRoleSwitch("parent")}
            >
              👨‍👩‍👦 Parent View
            </button>
            <button
              className={`role-pill-btn ${role === "faculty" ? "active" : ""}`}
              onClick={() => handleRoleSwitch("faculty")}
            >
              👨‍🏫 Faculty View
            </button>
          </div>
        </div>

        <span className="text-xs text-emerald font-mono">
          Logged in as: {role === "parent"
            ? `${currentUser?.role === "parent" ? currentUser.name : (currentStudent?.parentName || "Farooq Basha")} (Parent Guardian)`
            : role === "faculty"
            ? `${currentUser?.role === "faculty" ? currentUser.name : "Dr. K. Senthil Kumar"} (HOD & Professor, CSE)`
            : `${currentUser?.role === "student" ? currentUser.name : (currentStudent?.name || "Rahim Basha")} (Student, ${currentUser?.role === "student" ? currentUser.identifier : (currentStudent?.rollNo || "CS-2024-001")})`}
        </span>
      </div>

      {/* =========================================================================
         PARENT VIEW (Read-only dedicated monitoring portal)
         ========================================================================= */}
      {role === "parent" ? (
        <div className="parent-portal-container">
          <div className="page-header-card">
            <div>
              <div className="flex-center gap-8">
                <span className="section-pill">PARENTAL MONITORING DASHBOARD</span>
                <span className="badge-pill-cyan">Read-Only Secure Access</span>
              </div>
              <h1 className="page-main-heading">
                Student Progress: <span className="text-glow-emerald">{currentStudent?.name || "Rahim Basha"}</span>
              </h1>
              <p className="page-subtext">
                Roll No: <strong>{currentStudent?.rollNo || "CS-2024-001"}</strong> • {currentStudent?.department || "Computer Science"} • {currentStudent?.year || "III Year"} ({currentStudent?.semester || "Semester V"})
              </p>
            </div>

            <div className="flex-center gap-12">
              <Link to="/fees" className="btn-primary-neon">
                <CreditCard size={16} /> Pay Due Fees (₹{(feeDetails?.dueAmount ?? 0).toLocaleString()})
              </Link>
            </div>
          </div>

          {/* Attendance Warnings for Parents */}
          {lowAttendanceSubjects.length > 0 && (
            <div className="parent-warning-banner mt-20">
              <ShieldAlert size={26} className="text-rose flex-shrink-0" />
              <div>
                <h4 className="font-bold text-rose">Academic Attendance Notice</h4>
                <p className="text-xs text-muted">
                  Your ward has attendance below the required 75% in <strong>{lowAttendanceSubjects.map((s) => s.name).join(", ")}</strong>. Please advise them to attend upcoming sessions.
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics for Parents */}
          <div className="stats-kpi-grid mt-20">
            <div className="kpi-card">
              <span className="kpi-title">CUMULATIVE CGPA</span>
              <h2 className="kpi-value text-emerald">{currentStudent?.cgpa || "8.92"} <span className="text-sm font-normal">/ 10.0</span></h2>
              <p className="kpi-subtext">First Class with Distinction</p>
            </div>

            <div className="kpi-card">
              <span className="kpi-title">OVERALL ATTENDANCE</span>
              <h2 className={`kpi-value ${avgAttendance >= 75 ? "text-emerald" : "text-rose"}`}>
                {avgAttendance}%
              </h2>
              <p className="kpi-subtext">Biometric verified campus presence</p>
            </div>

            <div className="kpi-card">
              <span className="kpi-title">PENDING FEE DUES</span>
              <h2 className={`kpi-value ${(feeDetails?.dueAmount || 0) > 0 ? "text-rose" : "text-emerald"}`}>
                ₹{(feeDetails?.dueAmount ?? 0).toLocaleString()}
              </h2>
              <p className="kpi-subtext">Due by: {feeDetails?.dueDate || "15 Dec 2026"}</p>
            </div>

            <div className="kpi-card">
              <span className="kpi-title">ACADEMIC MENTOR</span>
              <h4 className="font-bold text-sm mt-2">{currentStudent?.mentor || "Dr. K. Senthil Kumar (HOD)"}</h4>
              <p className="kpi-subtext">Contact: hod.cse@college.edu</p>
            </div>
          </div>

          {/* Subject Attendance & Results Details */}
          <div className="dashboard-analytics-grid mt-20">
            <div className="analytics-card">
              <span className="section-pill">ATTENDANCE LEDGER</span>
              <h3 className="card-title">Subject-wise Class Attendance</h3>
              <div className="subject-attendance-mini mt-14">
                {subjectAttendance.map((s) => {
                  const pct = Math.round((s.attended / s.total) * 100);
                  return (
                    <div key={s.code} className="flex-between py-2 border-b border-glass text-xs">
                      <span>{s.name} ({s.code})</span>
                      <strong className={pct < 75 ? "text-rose" : "text-emerald"}>
                        {s.attended}/{s.total} ({pct}%)
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="analytics-card">
              <span className="section-pill">CAMPUS ANNOUNCEMENTS</span>
              <h3 className="card-title">Notices for Parents</h3>
              <div className="notices-mini-list mt-14">
                {campusNotices.map((n) => (
                  <div key={n.id} className="py-2 border-b border-glass text-xs">
                    <strong className="block text-sm">{n.title}</strong>
                    <span className="text-dim">{n.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : role === "faculty" ? (
        /* =========================================================================
           FACULTY & ACADEMIC ADMIN PORTAL
           ========================================================================= */
        <div className="faculty-portal-container">
          <div className="page-header-card">
            <div>
              <div className="flex-center gap-8">
                <span className="section-pill">FACULTY & ACADEMIC ADMIN CONSOLE</span>
                <span className="badge-pill-magenta">HOD / Professor Access</span>
              </div>
              <h1 className="page-main-heading">
                Department Management & <span className="text-glow-emerald">Faculty Control</span>
              </h1>
              <p className="page-subtext">
                Logged in as: <strong>Dr. K. Senthil Kumar (HOD, CSE)</strong> • Staff ID: <strong>FAC-CSE-004</strong> • Computer Science & Engineering
              </p>
            </div>

            <div className="flex-center gap-12 flex-wrap">
              <button className="btn-primary-neon" onClick={() => setIsAddModalOpen(true)}>
                <Plus size={16} /> Enroll New Student
              </button>
              <Link to="/students" className="btn-secondary">
                <Users size={16} /> Student Directory ({students.length})
              </Link>
            </div>
          </div>

          {/* 4 Faculty Management KPI Metrics */}
          <div className="stats-kpi-grid mt-20">
            <div className="kpi-card">
              <span className="kpi-title">TOTAL REGISTERED STUDENTS</span>
              <h2 className="kpi-value text-emerald">{students.length}</h2>
              <p className="kpi-subtext">
                👨 Male: {students.filter((s) => s.gender === "Male").length} • 👩 Female: {students.filter((s) => s.gender === "Female").length}
              </p>
            </div>

            <div className="kpi-card">
              <span className="kpi-title">DEPARTMENT AVERAGE CGPA</span>
              <h2 className="kpi-value text-cyan">
                {(students.reduce((acc, s) => acc + (s.cgpa || 0), 0) / Math.max(students.length, 1)).toFixed(2)}
              </h2>
              <p className="kpi-subtext">Class Batch: 2024-2028 CSE</p>
            </div>

            <div className="kpi-card">
              <span className="kpi-title">STUDENTS REQUIRING ATTENTION</span>
              <h2 className="kpi-value text-rose">
                {students.filter((s) => (s.attendance || 0) < 75).length}
              </h2>
              <p className="kpi-subtext">Attendance below 75% threshold</p>
            </div>

            <div className="kpi-card">
              <span className="kpi-title">PENDING ASSIGNMENTS TO EVALUATE</span>
              <h2 className="kpi-value text-amber">
                {allAssignments.filter((a) => a.status === "Submitted" || a.status === "Pending").length}
              </h2>
              <p className="kpi-subtext">Active Coursework Batches</p>
            </div>
          </div>

          {/* Faculty Modules: Daily Class Roll Call & Direct Student Grading */}
          <div className="dashboard-analytics-grid mt-20">
            {/* Today's Lectures Taught */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">TODAY'S TEACHING SCHEDULE</span>
                  <h3 className="card-title">Faculty Class Sessions</h3>
                </div>
                <span className="badge-pill-cyan text-xs">Room Hall B-204</span>
              </div>

              <div className="today-classes-stream mt-12">
                <div className="today-class-item">
                  <div className="class-time-col">
                    <span className="time-val">09:00 AM</span>
                    <span className="badge-pill-emerald text-xs">Conducted</span>
                  </div>
                  <div className="class-info-col">
                    <h4 className="class-subj">CS502 Operating Systems Internals</h4>
                    <div className="class-meta text-xs text-muted">
                      <span>📍 Hall B-204</span> • <span>👨‍🏫 Dr. K. Senthil Kumar</span>
                    </div>
                  </div>
                </div>

                <div className="today-class-item">
                  <div className="class-time-col">
                    <span className="time-val">11:15 AM</span>
                    <span className="badge-pill-cyan text-xs">Next Lecture</span>
                  </div>
                  <div className="class-info-col">
                    <h4 className="class-subj">CS503 Database Management Systems</h4>
                    <div className="class-meta text-xs text-muted">
                      <span>📍 Room 302</span> • <span>👨‍🏫 Prof. Rajesh V</span>
                    </div>
                  </div>
                </div>

                <div className="today-class-item">
                  <div className="class-time-col">
                    <span className="time-val">02:00 PM</span>
                    <span className="badge-pill-magenta text-xs">Lab Session</span>
                  </div>
                  <div className="class-info-col">
                    <h4 className="class-subj">CS505 Linux Kernel & Systems Practical</h4>
                    <div className="class-meta text-xs text-muted">
                      <span>📍 Systems Lab 2</span> • <span>👨‍🏫 Dr. K. Senthil Kumar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Biometric Roll Call for Students */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">DIRECT ATTENDANCE ROLL CALL</span>
                  <h3 className="card-title">Mark Student Presence for Today</h3>
                </div>
                <Link to="/students" className="view-all-link">
                  Full Roster →
                </Link>
              </div>

              <div className="faculty-quick-roster mt-12">
                {students.slice(0, 5).map((s) => (
                  <div key={s.id} className="flex-between py-2 border-b border-glass text-xs">
                    <div>
                      <strong className="block text-sm">{s.name}</strong>
                      <span className="text-dim">{s.rollNo} • Att: {s.attendance}%</span>
                    </div>
                    <div className="flex-center gap-6">
                      <button
                        className="att-pill-btn btn-present text-xs py-1 px-3"
                        onClick={() => markAttendance && markAttendance(s.id, "Present")}
                      >
                        ✓ Present
                      </button>
                      <button
                        className="att-pill-btn btn-absent text-xs py-1 px-3"
                        onClick={() => markAttendance && markAttendance(s.id, "Absent")}
                      >
                        ✗ Absent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Shortcuts for Faculty */}
          <div className="analytics-card mt-20">
            <span className="section-pill">ADMINISTRATIVE ACTIONS</span>
            <h3 className="card-title">Department Tools & Workflows</h3>

            <div className="quick-services-grid mt-14">
              <Link to="/students" className="service-card-btn">
                <Users size={20} className="text-emerald" />
                <span>Manage Students</span>
              </Link>
              <Link to="/academics" className="service-card-btn">
                <BookOpen size={20} className="text-cyan" />
                <span>Upload Course Notes</span>
              </Link>
              <Link to="/assignments" className="service-card-btn">
                <FileText size={20} className="text-magenta" />
                <span>Grade Submissions</span>
              </Link>
              <Link to="/support" className="service-card-btn">
                <ShieldAlert size={20} className="text-rose" />
                <span>Review Grievances</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           STUDENT VIEW / PERSONALIZED DASHBOARD (Default)
           ========================================================================= */
        <>
          {/* Reference Video-inspired Hero Showcase */}
          <motion.section
            className="hero-glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-grid">
              {/* Left Hero Typography */}
              <div className="hero-text-block">
                <div className="hero-pill-badge">
                  <span className="pill-dot" />
                  <span>SEMESTER V • {currentStudent?.department || "Computer Science"}</span>
                </div>

                <h1 className="hero-headline">
                  ACADEMIC <span className="text-glow-emerald">CONTROL</span>
                  <br />
                  <span className="text-outlined">INTELLIGENCE</span>
                </h1>

                <p className="hero-description">
                  Welcome, <strong>{currentStudent?.name || "Student"}</strong> ({currentStudent?.rollNo || "CS-2024-001"}). Track today's class schedule, submit pending assignments, monitor attendance predictions, and practice with your AI study assistant.
                </p>

                <div className="hero-cta-group">
                  <Link to="/academics" className="btn-primary-neon">
                    <span>Curriculum & Predictor</span>
                    <div className="btn-arrow-circle">
                      <ArrowUpRight size={17} />
                    </div>
                  </Link>

                  <Link to="/ai-study" className="btn-glass-secondary">
                    <Bot size={18} className="text-emerald" />
                    <span>Ask AI Study Co-Pilot</span>
                  </Link>
                </div>

                {/* Quick Live Date Pill & Gamification Streak */}
                <div className="hero-date-indicator">
                  <Calendar size={14} className="text-emerald" />
                  <span>{currentDateStr}</span>
                  <span className="badge-pill-rose font-bold text-xs">
                    <Flame size={12} className="inline mr-1" /> {currentStudent?.streak || 14} Day Streak
                  </span>
                </div>
              </div>

              {/* Right Hero Mascot & Floating Badges */}
              <div className="hero-mascot-wrapper">
                <motion.div
                  className="mascot-orb-halo"
                  animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  }}
                />

                <motion.div
                  className="mascot-floating-pod"
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="mascot-core">
                    <div className="mascot-screen">
                      <span className="mascot-face">🤖</span>
                      <div className="mascot-visor-glow" />
                    </div>
                    <div className="mascot-antenna">
                      <div className="antenna-ball" />
                    </div>
                  </div>

                  <motion.div
                    className="floating-mini-card card-top-right"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="mini-card-icon">⚡</div>
                    <div>
                      <div className="mini-card-val">{avgAttendance}%</div>
                      <div className="mini-card-lbl">Avg. Attendance</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="floating-mini-card card-bottom-left"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="mini-card-icon">⭐</div>
                    <div>
                      <div className="mini-card-val">{currentStudent?.cgpa || 8.92}</div>
                      <div className="mini-card-lbl">CGPA Score</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Marquee Ticker */}
            <TickerBar />
          </motion.section>

          {/* Low Attendance Warning Alert if any subject < 75% */}
          {lowAttendanceSubjects.length > 0 && (
            <div className="parent-warning-banner mb-24">
              <AlertTriangle size={24} className="text-rose flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold text-rose">Attendance Warning: Minimum Threshold Alert</h4>
                <p className="text-xs text-muted">
                  Your attendance is below 75% in:{" "}
                  <strong>
                    {lowAttendanceSubjects.map((s) => `${s.name} (${Math.round((s.attended / s.total) * 100)}%)`).join(", ")}
                  </strong>.
                </p>
              </div>
              <Link to="/academics" className="btn-secondary text-xs">
                Open Smart Predictor →
              </Link>
            </div>
          )}

          {/* 4 PRIMARY METRICS */}
          <section className="stats-kpi-grid">
            {/* Metric 1: Today's Classes */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">TODAY'S CLASSES</span>
                <div className="kpi-icon-box bg-emerald-dim">
                  <Clock size={18} className="text-emerald" />
                </div>
              </div>
              <h2 className="kpi-value">{todayClasses.length}</h2>
              <p className="kpi-subtext">Next: <strong>{todayClasses[0]?.subject || "Free Period"}</strong> ({todayClasses[0]?.room || "Campus"})</p>
            </div>

            {/* Metric 2: Pending Tasks */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">PENDING ASSIGNMENTS</span>
                <div className="kpi-icon-box bg-cyan-dim">
                  <FileText size={18} className="text-cyan" />
                </div>
              </div>
              <h2 className="kpi-value text-amber">{pendingTasksCount}</h2>
              <p className="kpi-subtext">Nearest Deadline: <strong>AVL Trees (in 3 days)</strong></p>
            </div>

            {/* Metric 3: Fee Dues */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">FEE DUES</span>
                <div className="kpi-icon-box bg-magenta-dim">
                  <CreditCard size={18} className="text-magenta" />
                </div>
              </div>
              <h2 className={`kpi-value ${(feeDetails?.dueAmount || 0) > 0 ? "text-rose" : "text-emerald"}`}>
                ₹{(feeDetails?.dueAmount ?? 0).toLocaleString()}
              </h2>
              <p className="kpi-subtext">Due Date: <strong>{feeDetails?.dueDate || "15 Dec 2026"}</strong></p>
            </div>

            {/* Metric 4: Academic CGPA */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">ACADEMIC CGPA</span>
                <div className="kpi-icon-box bg-purple-dim">
                  <Award size={18} className="text-purple" />
                </div>
              </div>
              <h2 className="kpi-value text-emerald">{currentStudent?.cgpa || 8.92}</h2>
              <p className="kpi-subtext">Total Credits: <strong>93 Earned</strong></p>
            </div>
          </section>

          {/* ONE-SCREEN PERSONALIZED SCHEDULE & ASSIGNMENTS GRID */}
          <section className="dashboard-analytics-grid">
            {/* Today's Classes List */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">DAILY TIMETABLE</span>
                  <h3 className="card-title">Today's Class Schedule</h3>
                </div>
                <Link to="/academics" className="view-all-link">
                  Full Week <ArrowRight size={14} />
                </Link>
              </div>

              <div className="today-classes-stream">
                {todayClasses.map((c) => (
                  <div key={c.id} className="today-class-item">
                    <div className="class-time-col">
                      <span className="time-val">{c.time.split("-")[0]}</span>
                      <span className="badge-pill-cyan text-xs">{c.status}</span>
                    </div>

                    <div className="class-info-col">
                      <h4 className="class-subj">{c.subject}</h4>
                      <div className="class-meta text-xs text-muted">
                        <span>📍 {c.room}</span> • <span>👨‍🏫 {c.faculty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Assignments & Fee Quick Pay */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">ACTION ITEMS</span>
                  <h3 className="card-title">Pending Assignments</h3>
                </div>
                <Link to="/assignments" className="view-all-link">
                  Submit Work <ArrowRight size={14} />
                </Link>
              </div>

              <div className="pending-tasks-mini-list">
                {allAssignments.map((task) => (
                  <div key={task.id} className="pending-task-row">
                    <div>
                      <span className="font-mono text-xs text-emerald">{task.code}</span>
                      <h4 className="text-sm font-bold">{task.title}</h4>
                      <span className="text-xs text-muted">Due: {task.dueDate}</span>
                    </div>

                    <span
                      className={`badge-pill-${
                        task.status === "Graded"
                          ? "emerald"
                          : task.status === "Submitted"
                          ? "cyan"
                          : "amber"
                      } text-xs`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Fee Dues Shortcut */}
              {(feeDetails?.dueAmount || 0) > 0 && (
                <div className="dashboard-fee-notice mt-16">
                  <div className="flex-between">
                    <div>
                      <span className="text-xs text-rose font-bold">FEES PENDING: ₹{(feeDetails?.dueAmount ?? 0).toLocaleString()}</span>
                      <p className="text-xs text-muted">Semester V tuition & lab dues</p>
                    </div>
                    <Link to="/fees" className="btn-primary-neon text-xs">
                      Pay Now
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* NOTICES & CAMPUS STREAM */}
          <section className="dashboard-bottom-grid">
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">BROADCASTS</span>
                  <h3 className="card-title">Campus Announcements & Notices</h3>
                </div>
                <Link to="/campus-life" className="view-all-link">
                  All Notices <ArrowRight size={14} />
                </Link>
              </div>

              <div className="notices-stream-list">
                {campusNotices.slice(0, 3).map((n) => (
                  <div key={n.id} className="notice-mini-row">
                    <span className="badge-pill-cyan text-xs">{n.category}</span>
                    <h4 className="notice-mini-title">{n.title}</h4>
                    <span className="notice-mini-date">{n.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="analytics-card">
              <span className="section-pill">QUICK SHORTCUTS</span>
              <h3 className="card-title">Academic Services</h3>

              <div className="quick-services-grid mt-14">
                <Link to="/academics" className="service-card-btn">
                  <BookOpen size={20} className="text-emerald" />
                  <span>Materials & Notes</span>
                </Link>
                <Link to="/ai-study" className="service-card-btn">
                  <Bot size={20} className="text-cyan" />
                  <span>AI Study Assistant</span>
                </Link>
                <Link to="/campus-life" className="service-card-btn">
                  <Users size={20} className="text-magenta" />
                  <span>Peer Study Groups</span>
                </Link>
                <Link to="/placements" className="service-card-btn">
                  <Award size={20} className="text-amber" />
                  <span>Placement Hub</span>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Add Student Modal */}
      <StudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addStudent}
      />
    </div>
  );
}
