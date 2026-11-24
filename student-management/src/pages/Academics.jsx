import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  Award,
  AlertTriangle,
  Download,
  CheckCircle,
  FileText,
  Video,
  Presentation,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Calculator,
  Printer,
  CalendarCheck,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function Academics() {
  const {
    t,
    currentStudent,
    subjectAttendance,
    weeklyTimetable,
    examSchedule,
    holidaysList,
    semesterResults,
    courseMaterials,
    addToast,
  } = useStudentContext();

  const safeCourseMaterials = courseMaterials || [];
  const safeSubjectAttendance = subjectAttendance || [];

  const [activeTab, setActiveTab] = useState("timetable"); // 'timetable' | 'attendance' | 'results' | 'materials'
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMaterialSubject, setSelectedMaterialSubject] = useState(safeCourseMaterials[0]?.subject || "");

  // Smart Attendance Predictor State
  const [predictorSubject, setPredictorSubject] = useState(safeSubjectAttendance[0]?.code || "CS501");
  const [targetPercentage, setTargetPercentage] = useState(75);

  // Grade Goal Planner State
  const [targetCgpa, setTargetCgpa] = useState("9.2");

  // Predictor calculation
  const currentSubj = safeSubjectAttendance.find((s) => s.code === predictorSubject) || safeSubjectAttendance[0] || { total: 40, attended: 35 };
  const totalClasses = currentSubj?.total || 40;
  const attendedClasses = currentSubj?.attended || 35;
  const currentPercent = Math.round((attendedClasses / Math.max(totalClasses, 1)) * 100);

  // Prediction math:
  // If currentPercent < targetPercentage:
  // Need to find 'x' consecutive classes attended so that: (attended + x) / (total + x) >= target/100
  // (attended + x) >= (target/100) * (total + x)
  // x * (1 - target/100) >= (target/100)*total - attended
  // x >= ((target/100)*total - attended) / (1 - target/100)
  const targetFraction = targetPercentage / 100;
  let classesNeededToAttend = 0;
  let classesAllowedToSkip = 0;

  if (currentPercent < targetPercentage) {
    if (targetFraction < 1) {
      classesNeededToAttend = Math.ceil(
        (targetFraction * totalClasses - attendedClasses) / (1 - targetFraction)
      );
      if (classesNeededToAttend < 0) classesNeededToAttend = 0;
    } else {
      classesNeededToAttend = 99;
    }
  } else {
    // How many can skip:
    // attended / (total + y) >= target/100
    // (total + y) <= attended / targetFraction
    // y <= (attended / targetFraction) - total
    classesAllowedToSkip = Math.floor(attendedClasses / targetFraction - totalClasses);
    if (classesAllowedToSkip < 0) classesAllowedToSkip = 0;
  }

  // Google Calendar Sync Simulation
  const handleGoogleCalendarSync = () => {
    addToast("Calendar Synced", "Schedule synchronized with your Google Calendar account!", "success");
  };

  // Download .ics Calendar File
  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EduFlow Academic System//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Semester V Exams Commencing
DTSTART:20261208T100000Z
DTEND:20261208T130000Z
DESCRIPTION:CS501 Data Structures and Algorithms Semester Final Exam
LOCATION:Exam Hall A
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "EduFlow_Timetable_2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Calendar Exported", "EduFlow_Timetable_2026.ics downloaded successfully.", "success");
  };

  // Download Marksheet
  const handlePrintMarksheet = () => {
    window.print();
  };

  return (
    <div className="academics-page-wrapper">
      {/* Top Banner */}
      <div className="page-header-card">
        <div>
          <div className="flex-center gap-8">
            <span className="section-pill">ACADEMIC HUB</span>
            <span className="badge-pill-emerald">{currentStudent.semester}</span>
          </div>
          <h1 className="page-main-heading">
            Curriculum, Timetable & <span className="text-glow-emerald">Analytics</span>
          </h1>
          <p className="page-subtext">
            Track subject attendance, predict attendance margins, plan target grades, and access university notes.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="academics-nav-pills">
          <button
            className={`academic-pill-btn ${activeTab === "timetable" ? "active" : ""}`}
            onClick={() => setActiveTab("timetable")}
          >
            <CalendarIcon size={16} /> Timetable
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "attendance" ? "active" : ""}`}
            onClick={() => setActiveTab("attendance")}
          >
            <TrendingUp size={16} /> Attendance & Predictor
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "results" ? "active" : ""}`}
            onClick={() => setActiveTab("results")}
          >
            <Award size={16} /> Results & GPA Planner
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "materials" ? "active" : ""}`}
            onClick={() => setActiveTab("materials")}
          >
            <BookOpen size={16} /> Course Materials
          </button>
        </div>
      </div>

      {/* TAB 1: TIMETABLE & CALENDAR */}
      {activeTab === "timetable" && (
        <motion.div
          className="tab-content-area"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Calendar Sync Action Bar */}
          <div className="flex-between items-center mb-16 flex-wrap gap-12">
            <div className="day-picker-pills">
              {Object.keys(weeklyTimetable || {}).map((day) => (
                <button
                  key={day}
                  className={`day-btn ${selectedDay === day ? "active" : ""}`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="flex-center gap-10">
              <button className="btn-secondary" onClick={handleDownloadICS}>
                <Download size={15} /> Export .ICS
              </button>
              <button className="btn-primary-neon" onClick={handleGoogleCalendarSync}>
                <CalendarCheck size={15} /> Sync Google Calendar
              </button>
            </div>
          </div>

          {/* Day Schedule Grid */}
          <div className="timetable-cards-grid">
            {(weeklyTimetable?.[selectedDay] || []).map((slot, idx) => (
              <div key={idx} className="timetable-period-card">
                <div className="period-time-badge">
                  <Clock size={13} className="text-emerald" />
                  <span>{slot.time}</span>
                </div>
                <h3 className="period-subject-name">{slot.subject}</h3>
                <div className="period-footer-meta">
                  <span className="period-room">{slot.room}</span>
                  <span className="period-faculty">{slot.faculty}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Exam Dates & Holidays Section */}
          <div className="timetable-split-row mt-24">
            {/* Exam Schedule */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">SEMESTER EXAMS</span>
                  <h3 className="card-title">Final Examination Timetable</h3>
                </div>
                <Award size={18} className="text-cyan" />
              </div>

              <div className="exam-items-list">
                {(examSchedule || []).map((exam) => (
                  <div key={exam.code} className="exam-schedule-item">
                    <div className="exam-date-box">
                      <span className="exam-day-num">{exam.date.split("-")[2]}</span>
                      <span className="exam-month-name">DEC</span>
                    </div>
                    <div className="exam-meta">
                      <span className="exam-code">{exam.code}</span>
                      <h4 className="exam-title">{exam.name}</h4>
                      <p className="exam-timing">{exam.time} • {exam.hall}</p>
                    </div>
                    <span className="badge-pill-cyan">{exam.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Holidays List */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">COLLEGE CALENDAR</span>
                  <h3 className="card-title">Upcoming Holidays</h3>
                </div>
                <CalendarIcon size={18} className="text-magenta" />
              </div>

              <div className="holidays-items-list">
                {(holidaysList || []).map((h, i) => (
                  <div key={i} className="holiday-row">
                    <div className="holiday-dot" />
                    <div className="holiday-info">
                      <h4 className="holiday-name">{h.name}</h4>
                      <span className="holiday-date">{h.date}</span>
                    </div>
                    <span className="badge-pill-magenta">{h.days}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: SUBJECT-WISE ATTENDANCE & SMART PREDICTOR */}
      {activeTab === "attendance" && (
        <motion.div
          className="tab-content-area"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Smart Attendance Predictor Card (Unique Feature) */}
          <div className="predictor-hero-card">
            <div className="predictor-header">
              <div className="flex-center gap-10">
                <div className="icon-badge-box bg-emerald-dim">
                  <Calculator size={22} className="text-emerald" />
                </div>
                <div>
                  <span className="section-pill">AI ALGORITHM</span>
                  <h2>Smart Attendance Predictor & Calculator</h2>
                  <p className="text-sm opacity-80">
                    Know exactly how many classes you can afford to miss, or must attend to hit minimum requirements.
                  </p>
                </div>
              </div>

              <div className="predictor-controls-row">
                <div className="control-group">
                  <label>Select Subject</label>
                  <select
                    value={predictorSubject}
                    onChange={(e) => setPredictorSubject(e.target.value)}
                  >
                    {(subjectAttendance || []).map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.code}: {s.name} ({Math.round((s.attended / s.total) * 100)}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="control-group">
                  <label>Target Threshold</label>
                  <select
                    value={targetPercentage}
                    onChange={(e) => setTargetPercentage(Number(e.target.value))}
                  >
                    <option value={75}>75% (University Mandate)</option>
                    <option value={80}>80% (Exam Eligibility Bonus)</option>
                    <option value={85}>85% (Distinction)</option>
                    <option value={90}>90% (Scholarship Tier)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="predictor-result-banner">
              <div className="result-metric-box">
                <span className="metric-label">CURRENT ATTENDANCE</span>
                <span className={`metric-big ${currentPercent >= 75 ? "text-emerald" : "text-rose"}`}>
                  {currentPercent}%
                </span>
                <span className="metric-sub">{attendedClasses} / {totalClasses} classes attended</span>
              </div>

              <div className="result-advice-box">
                {currentPercent < targetPercentage ? (
                  <div className="advice-danger">
                    <AlertTriangle size={28} className="text-rose flex-shrink-0" />
                    <div>
                      <h4 className="advice-title text-rose">
                        Needs Immediate Attention!
                      </h4>
                      <p className="advice-desc">
                        You need to attend <strong>{classesNeededToAttend} straight classes</strong> without absence to reach your target of <strong>{targetPercentage}%</strong>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="advice-safe">
                    <CheckCircle size={28} className="text-emerald flex-shrink-0" />
                    <div>
                      <h4 className="advice-title text-emerald">
                        Safe Margin Available!
                      </h4>
                      <p className="advice-desc">
                        You can safely skip <strong>{classesAllowedToSkip} more classes</strong> this month and still comfortably remain above <strong>{targetPercentage}%</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subject-wise Cards Grid */}
          <div className="subject-attendance-grid mt-24">
            {subjectAttendance.map((subj) => {
              const pct = Math.round((subj.attended / Math.max(subj.total, 1)) * 100);
              const isBelow = pct < 75;

              return (
                <div key={subj.code} className={`subject-att-card ${isBelow ? "border-rose" : ""}`}>
                  <div className="flex-between items-start mb-10">
                    <div>
                      <span className="font-mono text-xs text-emerald">{subj.code}</span>
                      <h4 className="subj-title">{subj.name}</h4>
                      <span className="subj-faculty">{subj.faculty}</span>
                    </div>

                    <div className="subj-percent-badge">
                      <span className={`percent-num ${isBelow ? "text-rose" : "text-emerald"}`}>
                        {pct}%
                      </span>
                    </div>
                  </div>

                  <div className="subj-progress-track">
                    <div
                      className={`subj-progress-fill ${isBelow ? "bg-rose" : "bg-emerald"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex-between text-xs text-muted mt-8">
                    <span>Attended: {subj.attended} / {subj.total}</span>
                    {isBelow && (
                      <span className="text-rose font-bold flex-center gap-4">
                        <AlertTriangle size={12} /> Low Attendance!
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* TAB 3: RESULTS & GRADE GOAL PLANNER */}
      {activeTab === "results" && (
        <motion.div
          className="tab-content-area"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Grade Goal Planner (Unique Feature) */}
          <div className="planner-glass-card mb-24">
            <div className="flex-between items-center flex-wrap gap-16">
              <div>
                <span className="section-pill">GOAL SETTING</span>
                <h2>CGPA Target & Exam Requirement Planner</h2>
                <p className="text-sm opacity-80">
                  Current Cumulative CGPA: <strong>{currentStudent.cgpa}</strong> • Total Earned Credits: <strong>93</strong>
                </p>
              </div>

              <div className="flex-center gap-12">
                <div className="target-input-box">
                  <span className="text-xs text-muted">Enter Target CGPA:</span>
                  <input
                    type="number"
                    step="0.05"
                    min="6"
                    max="10"
                    value={targetCgpa}
                    onChange={(e) => setTargetCgpa(e.target.value)}
                  />
                </div>

                <button className="btn-primary-neon" onClick={handlePrintMarksheet}>
                  <Printer size={15} /> Print Official Marksheet
                </button>
              </div>
            </div>

            <div className="planner-calc-result mt-16">
              <div className="calc-pill">
                <span>Required Semester V SGPA:</span>
                <strong className="text-emerald">
                  {Math.min(10, Math.max(7.5, (parseFloat(targetCgpa) * 5 - currentStudent.cgpa * 4))).toFixed(2)}
                </strong>
              </div>
              <div className="calc-pill">
                <span>Average Exam Mark Needed:</span>
                <strong className="text-cyan">88+ in All 5 Subjects (A+ / O Grade)</strong>
              </div>
            </div>
          </div>

          {/* Semesters Marksheet Tables */}
          <div className="semesters-accordion-grid">
            {(semesterResults || []).map((sem) => (
              <div key={sem.semester} className="analytics-card mb-20">
                <div className="flex-between items-center mb-16 pb-10 border-b border-glass">
                  <div>
                    <h3 className="card-title">{sem.semester} Consolidated Marksheet</h3>
                    <p className="text-xs text-muted">{sem.status} • Total Credits: {sem.credits}</p>
                  </div>
                  <div className="flex-center gap-12">
                    <span className="badge-pill-emerald text-sm font-bold">SGPA: {sem.sgpa}</span>
                  </div>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="student-glass-table">
                    <thead>
                      <tr>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Credits</th>
                        <th>Marks</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(sem?.subjects || []).map((s) => (
                        <tr key={s.code}>
                          <td className="font-mono text-emerald">{s.code}</td>
                          <td className="font-bold">{s.name}</td>
                          <td>{s.credits}</td>
                          <td>{s.marks} / 100</td>
                          <td>
                            <span className="badge-pill-cyan font-bold">{s.grade}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 4: COURSE MATERIALS LIBRARY */}
      {activeTab === "materials" && (
        <motion.div
          className="tab-content-area"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="materials-header-row mb-16 flex-between items-center flex-wrap gap-12">
            <div className="subject-filter-pills">
              {(courseMaterials || []).map((cm) => (
                <button
                  key={cm.subject}
                  className={`sub-pill ${selectedMaterialSubject === cm.subject ? "active" : ""}`}
                  onClick={() => setSelectedMaterialSubject(cm.subject)}
                >
                  {cm.subject}
                </button>
              ))}
            </div>

            <span className="text-xs text-muted">
              Organized by Department of Computer Science & Engineering
            </span>
          </div>

          {/* Materials List */}
          <div className="materials-list-container">
            {((courseMaterials || []).find((cm) => cm.subject === selectedMaterialSubject)?.materials || []).map((mat) => (
                <div key={mat.id} className="material-item-row">
                  <div className="material-type-icon">
                    {mat.type.includes("PDF") && <FileText size={20} className="text-rose" />}
                    {mat.type.includes("PPT") && <Presentation size={20} className="text-amber" />}
                    {mat.type.includes("Video") && <Video size={20} className="text-cyan" />}
                    {mat.type.includes("PYQ") && <Award size={20} className="text-emerald" />}
                  </div>

                  <div className="material-details">
                    <h4 className="material-title">{mat.title}</h4>
                    <div className="material-meta">
                      <span className="badge-pill-cyan text-xs">{mat.type}</span>
                      <span className="text-xs text-muted">{mat.size || mat.duration}</span>
                      {mat.downloads && (
                        <span className="text-xs text-dim">⬇ {mat.downloads} downloads</span>
                      )}
                    </div>
                  </div>

                  <button
                    className="btn-secondary"
                    onClick={() => addToast("Downloading Material", `Downloading ${mat.title}`, "info")}
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
