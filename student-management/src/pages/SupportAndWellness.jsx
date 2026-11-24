import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageSquare,
  ShieldCheck,
  Star,
  AlertCircle,
  Calendar,
  Clock,
  Sparkles,
  Smile,
  Frown,
  Meh,
  Activity,
  Send,
  CheckCircle,
  HelpCircle,
  Lock,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function SupportAndWellness() {
  const {
    grievances,
    submitGrievance,
    counselorBookings,
    bookCounselorSession,
    addToast,
  } = useStudentContext();

  const [activeTab, setActiveTab] = useState("feedback"); // 'feedback' | 'wellness'

  // Teacher Rating State
  const [ratedFaculty, setRatedFaculty] = useState("Prof. Ananya Roy (DSA)");
  const [stars, setStars] = useState(5);
  const [feedbackRemarks, setFeedbackRemarks] = useState("");

  // Grievance Form State
  const [grievanceCategory, setGrievanceCategory] = useState("Course & Academics");
  const [grievanceSubject, setGrievanceSubject] = useState("");
  const [grievanceDesc, setGrievanceDesc] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  // Counselor Booking State
  const [bookingDate, setBookingDate] = useState("2026-11-28");
  const [bookingTime, setBookingTime] = useState("02:30 PM");
  const [bookingMode, setBookingMode] = useState("Confidential Online Chat");

  // Mental Wellness Breathing Exercise State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Inhale (4s)");
  const [breathSeconds, setBreathSeconds] = useState(4);

  // Mood Tracker State
  const [selectedMood, setSelectedMood] = useState("Good");

  // Breathing 4-7-8 cycle
  useEffect(() => {
    let timer;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev <= 1) {
            if (breathPhase.startsWith("Inhale")) {
              setBreathPhase("Hold (7s)");
              return 7;
            } else if (breathPhase.startsWith("Hold")) {
              setBreathPhase("Exhale (8s)");
              return 8;
            } else {
              setBreathPhase("Inhale (4s)");
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  const handleTeacherRatingSubmit = (e) => {
    e.preventDefault();
    addToast("Feedback Recorded", `Anonymous rating of ${stars} stars submitted for ${ratedFaculty}. Thank you!`, "success");
    setFeedbackRemarks("");
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    if (!grievanceSubject.trim()) {
      addToast("Subject Required", "Please provide a subject for the feedback ticket.", "error");
      return;
    }
    submitGrievance({
      category: grievanceCategory,
      subject: grievanceSubject,
      desc: grievanceDesc,
      isAnonymous,
    });
    setGrievanceSubject("");
    setGrievanceDesc("");
  };

  const handleCounselorSubmit = (e) => {
    e.preventDefault();
    bookCounselorSession({
      date: bookingDate,
      time: bookingTime,
      mode: bookingMode,
    });
  };

  return (
    <div className="support-page-wrapper">
      {/* Top Banner */}
      <div className="page-header-card">
        <div>
          <div className="flex-center gap-8">
            <span className="section-pill">STUDENT ADVOCACY & CARE</span>
            <span className="badge-pill-emerald">100% Confidential</span>
          </div>
          <h1 className="page-main-heading">
            Anonymous Feedback & <span className="text-glow-emerald">Mental Wellness Corner</span>
          </h1>
          <p className="page-subtext">
            Submit anonymous faculty reviews, log grievances, book counselor sessions, and de-stress with guided wellness exercises.
          </p>
        </div>

        <div className="academics-nav-pills">
          <button
            className={`academic-pill-btn ${activeTab === "feedback" ? "active" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            <ShieldCheck size={16} /> Anonymous Feedback & Grievances
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "wellness" ? "active" : ""}`}
            onClick={() => setActiveTab("wellness")}
          >
            <Heart size={16} /> Mental Wellness Corner
          </button>
        </div>
      </div>

      {/* TAB 1: ANONYMOUS FEEDBACK & GRIEVANCES */}
      {activeTab === "feedback" && (
        <div className="feedback-layout mt-24">
          <div className="dashboard-analytics-grid">
            {/* Teacher Rating Box */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">TEACHING QUALITY</span>
                  <h3 className="card-title">Rate Faculty & Curriculum</h3>
                  <p className="text-xs text-muted">Zero identity traces stored. Strictly confidential.</p>
                </div>
                <Star size={18} className="text-amber" />
              </div>

              <form onSubmit={handleTeacherRatingSubmit} className="feedback-form">
                <div className="form-group mb-14">
                  <label className="form-label">Select Professor / Course</label>
                  <select
                    value={ratedFaculty}
                    onChange={(e) => setRatedFaculty(e.target.value)}
                  >
                    <option>Prof. Ananya Roy (DSA)</option>
                    <option>Dr. K. Senthil Kumar (OS)</option>
                    <option>Prof. Rajesh V (DBMS)</option>
                    <option>Dr. Meenakshi (Networks)</option>
                    <option>Dr. Raman N (Discrete Math)</option>
                  </select>
                </div>

                <div className="form-group mb-14">
                  <label className="form-label">Rating</label>
                  <div className="stars-row">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`star-btn ${s <= stars ? "active" : ""}`}
                        onClick={() => setStars(s)}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-sm font-bold text-amber ml-2">{stars} / 5 Stars</span>
                  </div>
                </div>

                <div className="form-group mb-16">
                  <label className="form-label">Constructive Remarks</label>
                  <textarea
                    rows={3}
                    placeholder="Share feedback on pacing, explanation clarity, lab assistance..."
                    value={feedbackRemarks}
                    onChange={(e) => setFeedbackRemarks(e.target.value)}
                    className="glass-textarea"
                  />
                </div>

                <button type="submit" className="btn-primary-neon">
                  Submit Anonymous Rating
                </button>
              </form>
            </div>

            {/* Lodge a Grievance Ticket */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">OFFICIAL PETITION</span>
                  <h3 className="card-title">Lodge Grievance or Concern</h3>
                  <p className="text-xs text-muted">Routed to Dean of Academics for resolution.</p>
                </div>
                <Lock size={18} className="text-emerald" />
              </div>

              <form onSubmit={handleGrievanceSubmit} className="grievance-form">
                <div className="form-group mb-12">
                  <label className="form-label">Grievance Category</label>
                  <select
                    value={grievanceCategory}
                    onChange={(e) => setGrievanceCategory(e.target.value)}
                  >
                    <option>Course & Academics</option>
                    <option>Campus Amenities & WiFi</option>
                    <option>Examination & Evaluation</option>
                    <option>Hostel & Dining Facilities</option>
                    <option>Anti-Ragging & Equal Opportunity</option>
                  </select>
                </div>

                <div className="form-group mb-12">
                  <label className="form-label">Summary Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Schedule clash between OS lab and elective"
                    value={grievanceSubject}
                    onChange={(e) => setGrievanceSubject(e.target.value)}
                  />
                </div>

                <div className="form-group mb-14">
                  <label className="form-label">Detailed Explanation</label>
                  <textarea
                    rows={3}
                    placeholder="Explain the issue clearly with relevant dates and locations..."
                    value={grievanceDesc}
                    onChange={(e) => setGrievanceDesc(e.target.value)}
                    className="glass-textarea"
                  />
                </div>

                <div className="flex-between items-center mb-16">
                  <label className="flex-center gap-8 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <span>Submit anonymously (hide name and roll number)</span>
                  </label>
                </div>

                <button type="submit" className="btn-primary-neon">
                  <Send size={15} /> File Grievance Ticket
                </button>
              </form>
            </div>
          </div>

          {/* Grievance Tracking Ledger */}
          <div className="analytics-card mt-24">
            <div className="card-top-controls">
              <div>
                <span className="section-pill">LIVE TRACKER</span>
                <h3 className="card-title">Submitted Feedback & Grievance Tickets</h3>
              </div>
              <ShieldCheck size={18} className="text-cyan" />
            </div>

            <div className="grievance-list">
              {(grievances || []).map((g) => (
                <div key={g.id} className="grievance-item-card">
                  <div className="flex-between items-start mb-8">
                    <div>
                      <span className="badge-pill-cyan text-xs">{g.category}</span>
                      <h4 className="grievance-title mt-4">{g.subject}</h4>
                      <p className="grievance-desc">{g.desc}</p>
                    </div>

                    <span
                      className={`badge-pill-${
                        g.status === "Resolved" ? "emerald" : "amber"
                      } text-xs font-bold`}
                    >
                      {g.status}
                    </span>
                  </div>

                  {g.response && (
                    <div className="admin-resolution-box">
                      <strong>Dean's Response:</strong>
                      <p className="text-xs text-muted">{g.response}</p>
                    </div>
                  )}

                  <div className="flex-between text-xs text-dim mt-8">
                    <span>Filed: {g.date}</span>
                    <span>{g.isAnonymous ? "🔒 Anonymous Identity" : "Public Log"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MENTAL WELLNESS CORNER */}
      {activeTab === "wellness" && (
        <div className="wellness-layout mt-24">
          {/* Top Mood Tracker Bar */}
          <div className="analytics-card mb-24">
            <span className="section-pill">DAILY CHECK-IN</span>
            <h3 className="card-title">How are you feeling today?</h3>
            <p className="text-xs text-muted mb-16">Taking a pause helps maintain focus and well-being during intense academic schedules.</p>

            <div className="mood-buttons-row">
              {[
                { label: "Great", emoji: "😄", color: "text-emerald" },
                { label: "Good", emoji: "🙂", color: "text-cyan" },
                { label: "Okay", emoji: "😐", color: "text-amber" },
                { label: "Stressed", emoji: "😰", color: "text-rose" },
                { label: "Overwhelmed", emoji: "😫", color: "text-rose" },
              ].map((m) => (
                <button
                  key={m.label}
                  className={`mood-card-btn ${selectedMood === m.label ? "active" : ""}`}
                  onClick={() => {
                    setSelectedMood(m.label);
                    addToast("Check-in Logged", `Logged mood: ${m.label}. Remember to take short breaks!`, "info");
                  }}
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <span className={`text-xs font-bold ${m.color}`}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="dashboard-analytics-grid">
            {/* Interactive 4-7-8 Breathing Exercise */}
            <div className="analytics-card breathing-card text-center">
              <span className="section-pill">STRESS RELIEF</span>
              <h3 className="card-title">4-7-8 Guided Breathing Relaxation</h3>
              <p className="text-xs text-muted mb-20">Inhale for 4s, hold for 7s, exhale for 8s to calm the nervous system.</p>

              <div className="breathing-circle-wrapper">
                <motion.div
                  className={`breathing-circle ${isBreathingActive ? "active" : ""}`}
                  animate={
                    isBreathingActive
                      ? breathPhase.startsWith("Inhale")
                        ? { scale: [1, 1.45], transition: { duration: 4, ease: "easeInOut" } }
                        : breathPhase.startsWith("Hold")
                        ? { scale: 1.45 }
                        : { scale: [1.45, 1], transition: { duration: 8, ease: "easeInOut" } }
                      : { scale: 1 }
                  }
                >
                  <div className="breathing-circle-inner">
                    <span className="phase-text">{isBreathingActive ? breathPhase : "Ready"}</span>
                    {isBreathingActive && <span className="seconds-text">{breathSeconds}s</span>}
                  </div>
                </motion.div>
              </div>

              <div className="mt-24">
                <button
                  className="btn-primary-neon"
                  onClick={() => setIsBreathingActive(!isBreathingActive)}
                >
                  {isBreathingActive ? "Pause Exercise" : "Start Guided Breathing"}
                </button>
              </div>
            </div>

            {/* Book Counselor Appointment */}
            <div className="analytics-card">
              <div className="card-top-controls">
                <div>
                  <span className="section-pill">CAMPUS COUNSELING</span>
                  <h3 className="card-title">Book Confidential Counselor</h3>
                  <p className="text-xs text-muted">Free, private 1-on-1 counseling support with qualified professionals.</p>
                </div>
                <Heart size={18} className="text-rose" />
              </div>

              <form onSubmit={handleCounselorSubmit} className="counselor-form">
                <div className="form-group mb-12">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>

                <div className="form-group mb-12">
                  <label className="form-label">Available Time Slot</label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  >
                    <option>10:00 AM - 10:45 AM</option>
                    <option>11:30 AM - 12:15 PM</option>
                    <option>02:30 PM - 03:15 PM</option>
                    <option>04:00 PM - 04:45 PM</option>
                  </select>
                </div>

                <div className="form-group mb-16">
                  <label className="form-label">Consultation Mode</label>
                  <select
                    value={bookingMode}
                    onChange={(e) => setBookingMode(e.target.value)}
                  >
                    <option>Confidential Online Chat</option>
                    <option>Secure Video Call</option>
                    <option>In-Person (Counseling Center, Hall A)</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary-neon w-full">
                  <Calendar size={15} /> Confirm Counselor Appointment
                </button>
              </form>

              {/* Booked Sessions List */}
              <div className="booked-sessions mt-20">
                <h4 className="text-xs font-bold text-muted mb-8">Confirmed Appointments:</h4>
                {(counselorBookings || []).map((b) => (
                  <div key={b.id} className="session-item-row">
                    <div>
                      <strong className="text-xs block">{b.counselor}</strong>
                      <span className="text-xs text-dim">{b.date} at {b.time} ({b.mode})</span>
                    </div>
                    <span className="badge-pill-emerald text-xs">{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
