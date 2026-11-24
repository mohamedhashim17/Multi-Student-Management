import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Zap,
  Database,
  Layers,
  Code2,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function About() {
  const features = [
    {
      title: "Real-time Biometrics & Attendance",
      desc: "Instant live attendance tracking with history calendars, automatic percentage recalculations, and daily presence markers.",
      icon: "⚡",
    },
    {
      title: "Dark Glassmorphism Architecture",
      desc: "Engineered with deep emerald gradients, glowing neon accents, and smooth backdrop-filter effects inspired by modern UI benchmarks.",
      icon: "💎",
    },
    {
      title: "Smart ID Card Generator",
      desc: "Generates realistic, print-ready campus identity cards complete with NFC chip styling, barcode simulation, and QR verification codes.",
      icon: "🪪",
    },
    {
      title: "Live Analytical Dashboards",
      desc: "Interactive SVG department distribution charts, monthly attendance trend graphs, and gender diversity metrics.",
      icon: "📊",
    },
    {
      title: "Full LocalStorage Persistence",
      desc: "All registrations, modifications, attendance status, and user settings persist across browser sessions with zero data loss.",
      icon: "💾",
    },
    {
      title: "Instant CSV Data Export",
      desc: "Download institutional student rosters into standard CSV spreadsheets in one click for academic auditing.",
      icon: "📁",
    },
  ];

  const techStack = [
    { name: "React 19", role: "Component Architecture", badge: "Core Engine" },
    { name: "React Router v7", role: "Dynamic SPA Routing", badge: "Navigation" },
    { name: "Framer Motion", role: "Physics & Micro-interactions", badge: "Animation" },
    { name: "Lucide React", role: "Vector Icon System", badge: "Icons" },
    { name: "Vite 8", role: "Lightning Build Tooling", badge: "Bundler" },
    { name: "CSS3 Variables", role: "Glassmorphism & Theming", badge: "Styling" },
  ];

  return (
    <motion.div
      className="about-page-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Showcase Card */}
      <div className="about-hero-card">
        <div className="hero-pill-badge">
          <span className="pill-dot" />
          <span>INSTITUTIONAL PROJECT DEMO</span>
        </div>

        <h1 className="about-title">
          About <span className="text-glow-emerald">EduFlow</span> Academic Platform
        </h1>

        <p className="about-description">
          EduFlow is a state-of-the-art Student Management System engineered for modern colleges
          and universities. Combining real-time academic analytics with luxury dark glassmorphism
          aesthetics, it streamlines enrollment, credentials, attendance tracking, and reporting.
        </p>

        <div className="about-stats-row">
          <div className="about-stat-box">
            <h3>100%</h3>
            <p>Client-Side Reactive</p>
          </div>
          <div className="about-stat-box">
            <h3>25+</h3>
            <p>Engineered Features</p>
          </div>
          <div className="about-stat-box">
            <h3>0.0s</h3>
            <p>Sync Latency</p>
          </div>
          <div className="about-stat-box">
            <h3>A++</h3>
            <p>Design Standard</p>
          </div>
        </div>
      </div>

      {/* Feature Capabilities Grid */}
      <section className="about-section">
        <div className="section-header-centered">
          <span className="section-pill">CAPABILITIES</span>
          <h2>Platform Highlights & Features</h2>
          <p>Designed for excellence in college project demonstrations</p>
        </div>

        <div className="about-features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="about-feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="feature-emoji-box">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technology Stack Badges */}
      <section className="about-section">
        <div className="section-header-centered">
          <span className="section-pill">SYSTEM ARCHITECTURE</span>
          <h2>Modern Technology Stack</h2>
          <p>Powered by cutting-edge web technologies</p>
        </div>

        <div className="tech-stack-grid">
          {techStack.map((tech) => (
            <div key={tech.name} className="tech-stack-card">
              <div className="flex-between items-center">
                <span className="tech-badge">{tech.badge}</span>
                <Cpu size={16} className="text-emerald" />
              </div>
              <h4 className="tech-name">{tech.name}</h4>
              <p className="tech-role">{tech.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Credits & College Demo Card */}
      <div className="about-credits-card">
        <div className="credits-left">
          <div className="flex-center gap-10">
            <span className="text-2xl">🎓</span>
            <div>
              <h3>College Capstone Project Demonstration</h3>
              <p>Department of Computer Science & Engineering</p>
            </div>
          </div>
          <p className="credits-text">
            Developed with dedication for academic management and software engineering excellence.
            Ready for live evaluation and viva demonstration.
          </p>
        </div>

        <div className="credits-right">
          <Link to="/" className="btn-primary-neon">
            <span>Explore Dashboard</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
