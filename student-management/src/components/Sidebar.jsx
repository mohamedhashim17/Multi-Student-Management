import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Info,
  GraduationCap,
  Sparkles,
  TrendingUp,
  X,
  BookOpen,
  FileText,
  CreditCard,
  Bot,
  Trophy,
  Briefcase,
  Heart,
  CalendarCheck,
  Lock,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function Sidebar({ isOpen, onClose }) {
  const { students, role, t } = useStudentContext();

  const totalStudents = (students || []).length;

  const navLinks = [
    {
      to: "/",
      label: t("dashboard"),
      icon: LayoutDashboard,
      badge: "Live",
    },
    {
      to: "/academics",
      label: t("academics"),
      icon: BookOpen,
      badge: "Smart",
    },
    {
      to: "/assignments",
      label: t("assignments"),
      icon: FileText,
      badge: "2 Due",
    },
    {
      to: "/fees",
      label: t("fees"),
      icon: CreditCard,
      badge: null,
    },
    {
      to: "/ai-study",
      label: t("aiStudy"),
      icon: Bot,
      badge: "AI",
    },
    {
      to: "/campus-life",
      label: t("studyGroups"),
      icon: Trophy,
      badge: "XP",
    },
    {
      to: "/placements",
      label: t("placements"),
      icon: Briefcase,
      badge: "Hiring",
    },
    {
      to: "/support",
      label: t("wellness"),
      icon: Heart,
      badge: null,
    },
    {
      to: "/students",
      label: t("students"),
      icon: Users,
      badge: totalStudents,
    },
    {
      to: "/login",
      label: "Portal Login",
      icon: Lock,
      badge: "Auth",
    },
    {
      to: "/about",
      label: t("about"),
      icon: Info,
      badge: null,
    },
  ];

  const sidebarContent = (
    <div className="sidebar-inner">
      {/* Mobile Header with close button */}
      <div className="sidebar-mobile-header">
        <div className="flex-center gap-10">
          <span className="brand-mortarboard text-xl">🎓</span>
          <span className="font-bold tracking-wide">EduFlow Portal</span>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close Sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="sidebar-section-label">MAIN CAMPUS NAVIGATION</div>

      <nav className="sidebar-nav">
        {navLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeSidebarIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="nav-item-icon-box">
                    <Icon size={18} className="nav-item-icon" />
                  </div>
                  <span className="nav-item-text">{item.label}</span>
                  {item.badge !== null && (
                    <span
                      className={`nav-item-badge ${
                        item.badge === "Live"
                          ? "badge-live"
                          : item.badge === "AI"
                          ? "badge-pill-cyan"
                          : item.badge === "XP"
                          ? "badge-pill-magenta"
                          : "badge-count"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Role Badge in Sidebar */}
      <div className="sidebar-role-indicator">
        <div className="flex-between items-center mb-4">
          <span className="text-xs text-dim">Active Portal:</span>
          <NavLink to="/login" className="text-xs text-blue-neon hover:underline font-bold" onClick={onClose}>
            Switch / Sign In →
          </NavLink>
        </div>
        <strong className="text-xs text-emerald capitalize block">
          {role === "parent" ? "👨‍👩‍👦 Parent View" : role === "faculty" ? "👨‍🏫 Faculty Admin" : "🎓 Student Portal"}
        </strong>
      </div>

      {/* System Status Footer */}
      <div className="sidebar-footer">
        <div className="system-status-chip">
          <span className="pulse-dot-emerald" />
          <div className="status-meta">
            <span className="status-label">EDUSYS CORE v2.8</span>
            <span className="status-desc">AI Engine & All Modules Online</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="sidebar-desktop">{sidebarContent}</aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="sidebar-mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
