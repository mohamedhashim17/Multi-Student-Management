import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Award,
  FileText,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
  Download,
  Printer,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";
import { MOCK_TESTS } from "../data/mockStudentData";

export default function Placements() {
  const { currentStudent, placements, applyToJob, addToast } = useStudentContext();

  const safePlacements = placements || [];
  const [activeTab, setActiveTab] = useState("jobs"); // 'jobs' | 'portfolio' | 'mocktests'
  const [jobFilter, setJobFilter] = useState("All");

  const filteredJobs = safePlacements.filter((p) => {
    if (jobFilter === "All") return true;
    if (jobFilter === "Internship") return p.role?.includes("Intern");
    if (jobFilter === "Full-Time") return !p.role?.includes("Intern");
    return true;
  });

  return (
    <div className="placements-page-wrapper">
      {/* Top Banner */}
      <div className="page-header-card">
        <div>
          <div className="flex-center gap-8">
            <span className="section-pill">CAREER & RECRUITMENT CELL</span>
            <span className="badge-pill-cyan">98.4% Placement Record</span>
          </div>
          <h1 className="page-main-heading">
            Placement Hub & <span className="text-glow-emerald">Skill Portfolio</span>
          </h1>
          <p className="page-subtext">
            Explore tier-1 campus job openings, 1-click apply, build your exportable resume, and practice recruitment mock assessments.
          </p>
        </div>

        <div className="academics-nav-pills">
          <button
            className={`academic-pill-btn ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase size={16} /> Job & Internships
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            <FileText size={16} /> Resume & Portfolio
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "mocktests" ? "active" : ""}`}
            onClick={() => setActiveTab("mocktests")}
          >
            <Award size={16} /> Mock Tests
          </button>
        </div>
      </div>

      {/* TAB 1: JOB & INTERNSHIP OPENINGS */}
      {activeTab === "jobs" && (
        <div className="jobs-container mt-24">
          <div className="flex-between items-center mb-16 flex-wrap gap-12">
            <div className="job-filter-pills">
              {["All", "Internship", "Full-Time"].map((type) => (
                <button
                  key={type}
                  className={`sub-pill ${jobFilter === type ? "active" : ""}`}
                  onClick={() => setJobFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <span className="text-xs text-muted">
              Official campus drives authorized by Dean of Placements
            </span>
          </div>

          <div className="jobs-cards-grid">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-glass-card">
                <div className="flex-between items-start mb-10">
                  <div>
                    <h3 className="job-company-name">{job.company}</h3>
                    <p className="job-role-title">{job.role}</p>
                  </div>
                  <span className="job-package-tag">{job.package}</span>
                </div>

                <div className="job-meta-row">
                  <span className="flex-center gap-4 text-xs text-muted">
                    <MapPin size={13} className="text-emerald" /> {job.location}
                  </span>
                  <span className="flex-center gap-4 text-xs text-muted">
                    <Calendar size={13} className="text-cyan" /> Deadline: {job.deadline}
                  </span>
                </div>

                <p className="job-eligibility">
                  <strong>Eligibility:</strong> {job.eligibility}
                </p>

                <div className="job-tags-row">
                  {job.tags.map((t) => (
                    <span key={t} className="job-tag-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {job.status && (
                  <div className="job-status-banner">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>{job.status}</span>
                  </div>
                )}

                <div className="job-card-footer mt-14">
                  {job.applied ? (
                    <button className="btn-secondary w-full" disabled>
                      ✓ Applied with EduFlow Portfolio
                    </button>
                  ) : (
                    <button
                      className="btn-primary-neon w-full"
                      onClick={() => applyToJob(job.id)}
                    >
                      1-Click Apply Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SKILL & ACHIEVEMENT PORTFOLIO / RESUME BUILDER */}
      {activeTab === "portfolio" && (
        <div className="portfolio-container mt-24">
          <div className="flex-between items-center mb-16 flex-wrap gap-12">
            <div>
              <span className="section-pill">LIVE AUTO-GENERATED CV</span>
              <h2>Professional Student Resume</h2>
            </div>

            <button className="btn-primary-neon" onClick={() => window.print()}>
              <Printer size={15} /> Export as PDF Resume
            </button>
          </div>

          <div className="resume-paper-preview">
            <div className="resume-header">
              <div>
                <h1 className="resume-name">{currentStudent?.name || "Rahim Basha"}</h1>
                <p className="resume-sub">
                  Bachelor of Technology in {currentStudent?.department || "Computer Science"} • CGPA: {currentStudent?.cgpa || 8.92} / 10.0
                </p>
                <div className="resume-contacts">
                  <span>✉ {currentStudent?.email || "rahim.basha@college.edu"}</span>
                  <span>📞 {currentStudent?.phone || "+91 98765 43210"}</span>
                  <span>📍 {currentStudent?.address || "24 Park Avenue, Tech Quarter, Chennai"}</span>
                </div>
              </div>
              <div className="resume-avatar-box">{currentStudent?.avatar || "👨‍💻"}</div>
            </div>

            {/* Education */}
            <div className="resume-section">
              <h3 className="resume-heading">EDUCATION & ACADEMICS</h3>
              <div className="resume-row">
                <div className="flex-between">
                  <strong>EduFlow Institute of Technology, Chennai</strong>
                  <span className="text-xs text-muted">2024 - 2028 (Expected)</span>
                </div>
                <p className="text-xs">
                  B.Tech Computer Science & Engineering | Cumulative CGPA: <strong>{currentStudent?.cgpa || 8.92} / 10.0</strong>
                </p>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="resume-section">
              <h3 className="resume-heading">TECHNICAL COMPETENCIES</h3>
              <p className="text-xs leading-relaxed">
                <strong>Languages:</strong> C++, Java, Python, JavaScript (ES6+), TypeScript, SQL, HTML5/CSS3<br />
                <strong>Frameworks & Libraries:</strong> React 19, Node.js, Express, Tailwind CSS, Framer Motion, Next.js<br />
                <strong>Tools & Platforms:</strong> Git, GitHub, Docker, Linux, AWS Cloud, Vite, Wireshark, VS Code
              </p>
            </div>

            {/* Projects */}
            <div className="resume-section">
              <h3 className="resume-heading">KEY ENGINEERING PROJECTS</h3>
              <div className="resume-item">
                <div className="flex-between">
                  <strong>EduFlow - Multi-tenant Student Management & AI Portal</strong>
                  <span className="text-xs text-muted">Nov 2026</span>
                </div>
                <p className="text-xs">
                  • Engineered responsive dark glassmorphism academic dashboard with React 19 and Framer Motion.<br />
                  • Integrated subject-wise attendance predictor, automated GPA goal planners, and client-side persistence.
                </p>
              </div>
              <div className="resume-item mt-8">
                <div className="flex-between">
                  <strong>Distributed File Sync & Banker's Deadlock Simulator</strong>
                  <span className="text-xs text-muted">Oct 2026</span>
                </div>
                <p className="text-xs">
                  • Implemented Dijkstra's Banker's Algorithm in C++ with multi-threaded safe state detection.<br />
                  • Benchmark analysis demonstrating zero deadlocks across 1,000 concurrent resource requests.
                </p>
              </div>
            </div>

            {/* Certifications & Badges */}
            <div className="resume-section">
              <h3 className="resume-heading">CERTIFICATIONS & HONORS</h3>
              <p className="text-xs leading-relaxed">
                • AWS Certified Cloud Practitioner (Score: 890 / 1000)<br />
                • LeetCode Problem Solver (250+ Algorithmic Challenges Solved)<br />
                • Smart India Hackathon Regional Finalist (Top 10 Team)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MOCK TESTS */}
      {activeTab === "mocktests" && (
        <div className="mocktests-container mt-24">
          <div className="analytics-card">
            <div className="card-top-controls">
              <div>
                <span className="section-pill">PRACTICE ASSESSMENTS</span>
                <h3 className="card-title">Placement Aptitude & Technical Mocks</h3>
              </div>
              <Award size={18} className="text-amber" />
            </div>

            <div className="mock-tests-list">
              {MOCK_TESTS.map((test) => (
                <div key={test.id} className="mock-test-row">
                  <div>
                    <h4 className="font-bold text-sm">{test.title}</h4>
                    <span className="text-xs text-muted">
                      {test.questions} Questions • Duration: {test.duration}
                    </span>
                  </div>

                  <div className="flex-center gap-12">
                    <span className="badge-pill-cyan text-xs">{test.score}</span>
                    <button
                      className="btn-primary-neon text-xs"
                      onClick={() => addToast("Starting Test", `Loading assessment: ${test.title}`, "info")}
                    >
                      Start Mock Exam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
