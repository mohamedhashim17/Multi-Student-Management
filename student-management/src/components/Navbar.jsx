import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sun,
  Moon,
  Bell,
  CheckCheck,
  Trash2,
  Clock,
  Calendar,
  Menu,
  X,
  User,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Globe,
  Sliders,
  Type,
  Eye,
  Lock,
  LogOut,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function Navbar({ onToggleMobileSidebar, isMobileSidebarOpen }) {
  const {
    theme,
    toggleTheme,
    role,
    setRole,
    language,
    setLanguage,
    t,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    searchQuery,
    setSearchQuery,
    notifications,
    markAllNotificationsRead,
    clearNotifications,
    resetDemoData,
    currentStudent,
    addToast,
    isAuthenticated,
    logout,
  } = useStudentContext();

  const navigate = useNavigate();
  const location = useLocation();

  // Role Switch Handler that immediately switches role, alerts the user, and navigates to the portal view
  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setShowProfileMenu(false);
    const labels = {
      student: "Student Portal (Rahim Basha)",
      parent: "Parent Monitoring View (Farooq Basha)",
      faculty: "Faculty & Academic Admin Console (Dr. K. Senthil Kumar)",
    };
    if (addToast) {
      addToast("Portal Changed", `Switched to ${labels[newRole]}`, "success");
    }
    navigate("/");
  };

  // Live Digital Clock state
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const langRef = useRef(null);
  const accessRef = useRef(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
      if (accessRef.current && !accessRef.current.contains(event.target)) {
        setShowAccessMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== "/students") {
      navigate("/students");
    }
  };

  const safeNotifications = notifications || [];
  const unreadCount = safeNotifications.filter((n) => !n.read).length;

  return (
    <motion.header
      className="navbar-glass"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Left: Mobile Toggle & Brand */}
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="brand-logo">
          <div className="brand-icon-box">
            <span className="brand-mortarboard">🎓</span>
            <div className="brand-glow-dot" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Edu<span className="brand-accent">Flow</span></span>
            <span className="brand-tag">PRO CAMPUS</span>
          </div>
        </Link>
      </div>

      {/* Center: Live Clock & Date display + Search */}
      <div className="navbar-center">
        <div className="live-clock-capsule">
          <div className="clock-digits-box">
            <Clock size={15} className="clock-icon animate-pulse" />
            <span className="clock-time">{formatTime(time)}</span>
          </div>
          <div className="clock-divider" />
          <div className="clock-date-box">
            <Calendar size={14} className="date-icon" />
            <span className="clock-date">{formatDate(time)}</span>
          </div>
        </div>

        {/* Global Search */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
            >
              <X size={14} />
            </button>
          )}
        </form>
      </div>

      {/* Right: Language, Accessibility, Theme, Notifications, Profile */}
      <div className="navbar-right">
        {/* Multilingual Selector */}
        <div className="nav-dropdown-wrapper" ref={langRef}>
          <button
            className="nav-icon-btn"
            onClick={() => setShowLangMenu(!showLangMenu)}
            title="Language / மொழி / भाषा"
          >
            <Globe size={18} />
          </button>

          <AnimatePresence>
            {showLangMenu && (
              <motion.div
                className="dropdown-panel lang-menu-panel"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
              >
                <div className="panel-title-sm">Select Language / மொழி</div>
                <div className="p-2 flex flex-col gap-1">
                  {[
                    { code: "en", label: "English (Default)", flag: "🇺🇸" },
                    { code: "ta", label: "தமிழ் (Tamil)", flag: "🇮🇳" },
                    { code: "hi", label: "हिन्दी (Hindi)", flag: "🇮🇳" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      className={`menu-item ${language === l.code ? "bg-emerald-dim font-bold" : ""}`}
                      onClick={() => {
                        setLanguage(l.code);
                        setShowLangMenu(false);
                      }}
                    >
                      <span className="text-base mr-2">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accessibility Settings */}
        <div className="nav-dropdown-wrapper" ref={accessRef}>
          <button
            className="nav-icon-btn"
            onClick={() => setShowAccessMenu(!showAccessMenu)}
            title="Accessibility Controls"
          >
            <Sliders size={18} />
          </button>

          <AnimatePresence>
            {showAccessMenu && (
              <motion.div
                className="dropdown-panel access-menu-panel"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
              >
                <div className="panel-title-sm">Accessibility Controls</div>
                <div className="p-3 flex flex-col gap-3">
                  <div>
                    <label className="text-xs text-muted block mb-1">Font Size Scale</label>
                    <div className="flex gap-2">
                      {["normal", "large", "xlarge"].map((sz) => (
                        <button
                          key={sz}
                          className={`btn-secondary text-xs flex-1 ${fontSize === sz ? "btn-primary-neon" : ""}`}
                          onClick={() => setFontSize(sz)}
                        >
                          {sz === "normal" ? "100%" : sz === "large" ? "115%" : "130%"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-between items-center py-2 border-t border-glass">
                    <span className="text-xs">High Contrast Mode</span>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="flex-between items-center py-2 border-t border-glass">
                    <span className="text-xs">Reduced Motion</span>
                    <input
                      type="checkbox"
                      checked={reducedMotion}
                      onChange={(e) => setReducedMotion(e.target.checked)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle Button */}
        <motion.button
          className="nav-icon-btn theme-toggle-btn"
          onClick={toggleTheme}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun size={19} className="theme-sun-icon" />
          ) : (
            <Moon size={19} className="theme-moon-icon" />
          )}
        </motion.button>

        {/* Notifications Bell */}
        <div className="nav-dropdown-wrapper" ref={notifRef}>
          <motion.button
            className={`nav-icon-btn notif-bell-btn ${unreadCount > 0 ? "has-unread" : ""}`}
            onClick={() => setShowNotifications(!showNotifications)}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            aria-label="View notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className="dropdown-panel notif-panel"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <div className="notif-panel-header">
                  <div className="flex-center gap-8">
                    <h4>Campus Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="badge-pill-magenta">{unreadCount} new</span>
                    )}
                  </div>
                  <div className="notif-header-actions">
                    <button
                      className="text-btn"
                      onClick={markAllNotificationsRead}
                      title="Mark all as read"
                    >
                      <CheckCheck size={14} /> Read all
                    </button>
                    <button
                      className="text-btn danger"
                      onClick={clearNotifications}
                      title="Clear notifications"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="notif-list">
                  {safeNotifications.length === 0 ? (
                    <div className="notif-empty">
                      <p>No new campus alerts 🎉</p>
                    </div>
                  ) : (
                    safeNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={`notif-item ${!n.read ? "unread" : ""}`}
                      >
                        <div className="notif-indicator" />
                        <div className="notif-body">
                          <div className="notif-title-row">
                            <span className="notif-title">{n.title}</span>
                            <span className="notif-time">{n.time}</span>
                          </div>
                          <p className="notif-text">{n.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="notif-panel-footer">
                  <span className="live-status-pill">
                    <span className="status-live-dot" /> Campus Notification Relay Active
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Card & Role Switcher */}
        <div className="nav-dropdown-wrapper" ref={profileRef}>
          <motion.button
            className="profile-pill-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            whileTap={{ scale: 0.96 }}
          >
            <div className="profile-avatar-glow">
              <span className="profile-avatar-emoji">
                {role === "parent" ? "👨‍👩‍👦" : role === "faculty" ? "👨‍🏫" : "👨‍💻"}
              </span>
              <span className="profile-online-ring" />
            </div>
            <div className="profile-details-hide-mobile">
              <span className="profile-name">
                {role === "parent"
                  ? (currentStudent?.parentName || "Farooq Basha")
                  : role === "faculty"
                  ? "Dr. K. Senthil Kumar"
                  : (currentStudent?.name || "Rahim Basha")}
              </span>
              <span className="profile-role capitalize">
                {role === "parent" ? "Parent View" : role === "faculty" ? "Faculty Admin" : "Student"}
              </span>
            </div>
          </motion.button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                className="dropdown-panel profile-menu-panel"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <div className="profile-menu-header">
                  <div className="menu-avatar-large">
                    {role === "parent" ? "👨‍👩‍👦" : role === "faculty" ? "👨‍🏫" : "👨‍💻"}
                  </div>
                  <div>
                    <h4 className="user-name">
                      {role === "parent"
                        ? (currentStudent?.parentName || "Farooq Basha")
                        : role === "faculty"
                        ? "Dr. K. Senthil Kumar"
                        : (currentStudent?.name || "Rahim Basha")}
                    </h4>
                    <p className="user-email">
                      {role === "parent"
                        ? "farooq.basha@parent.edu"
                        : role === "faculty"
                        ? "senthil.kumar@faculty.edu"
                        : (currentStudent?.email || "rahim.basha@college.edu")}
                    </p>
                    <span className="role-tag">
                      <ShieldCheck size={12} /> {role === "parent" ? "PARENT" : role === "faculty" ? "FACULTY HOD" : "STUDENT"}
                    </span>
                  </div>
                </div>

                <div className="profile-menu-divider" />

                <div className="profile-menu-items">
                  <div className="text-xs text-muted px-3 py-1 font-bold">SWITCH ROLE VIEW</div>
                  <button
                    className={`menu-item ${role === "student" ? "bg-emerald-dim font-bold" : ""}`}
                    onClick={() => handleRoleSwitch("student")}
                  >
                    🎓 Student Portal (Rahim Basha)
                  </button>
                  <button
                    className={`menu-item ${role === "parent" ? "bg-emerald-dim font-bold" : ""}`}
                    onClick={() => handleRoleSwitch("parent")}
                  >
                    👨‍👩‍👦 Parent View (Farooq Basha)
                  </button>
                  <button
                    className={`menu-item ${role === "faculty" ? "bg-emerald-dim font-bold" : ""}`}
                    onClick={() => handleRoleSwitch("faculty")}
                  >
                    👨‍🏫 Faculty / Admin Portal
                  </button>

                  <div className="profile-menu-divider my-2" />

                  <Link
                    to="/login"
                    className="menu-item"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Lock size={15} /> Switch Account / Portal Login
                  </Link>

                  <button
                    className="menu-item"
                    onClick={() => {
                      resetDemoData();
                      setShowProfileMenu(false);
                    }}
                  >
                    <Sparkles size={15} /> Reset All Demo Datasets
                  </button>

                  <button
                    className="menu-item text-rose font-bold"
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                      navigate("/login");
                    }}
                  >
                    <LogOut size={15} /> Log Out from Portal
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
