import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  IdCard,
  Building,
  GraduationCap,
  Users,
  Compass,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function Login() {
  const {
    role,
    setRole,
    login,
    registerAccount,
    recoverPassword,
    registeredAccounts,
    isAuthenticated,
    currentUser,
    logout,
    addToast,
  } = useStudentContext();

  const navigate = useNavigate();

  // Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState("signin");
  const [selectedRole, setSelectedRole] = useState(role || "student");

  // Sign In Form State
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    identifier: "",
    department: "Computer Science",
    password: "",
    confirmPassword: "",
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = login(loginId, loginPassword, selectedRole);
    if (res.success) {
      navigate("/");
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regData.password !== regData.confirmPassword) {
      addToast("Password Mismatch", "Passwords do not match. Please verify.", "error");
      return;
    }
    if (!agreeTerms) {
      addToast("Terms Agreement", "Please agree to the university honor policy.", "error");
      return;
    }

    const res = registerAccount({
      name: regData.name,
      email: regData.email,
      identifier: regData.identifier,
      department: regData.department,
      password: regData.password,
      role: selectedRole,
    });

    if (res.success) {
      navigate("/");
    }
  };

  // 1-Click Demo Login
  const handleQuickDemo = (demoRole) => {
    setSelectedRole(demoRole);
    const demoCredentials = {
      student: { id: "CS-2024-001", pass: "student123" },
      parent: { id: "farooq.basha@parent.edu", pass: "parent123" },
      faculty: { id: "FAC-CSE-004", pass: "faculty123" },
    };
    const cred = demoCredentials[demoRole];
    setLoginId(cred.id);
    setLoginPassword(cred.pass);
    const res = login(cred.id, cred.pass, demoRole);
    if (res.success) {
      navigate("/");
    }
  };

  // Forgot Password
  const handleForgotPassword = () => {
    const target = loginId || prompt("Enter your registered Email or Roll No / Staff ID for password recovery:");
    if (target) {
      recoverPassword(target);
    }
  };

  return (
    <div className="login-page-container">
      <motion.div
        className="login-glass-card"
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Top Header & Branding */}
        <div className="login-card-header">
          <div className="login-brand-icon">
            <span className="brand-mortarboard text-2xl">🎓</span>
            <div className="login-brand-glow" />
          </div>

          <div className="text-center">
            <span className="section-pill mb-4 inline-block">SECURE CAMPUS GATEWAY</span>
            <h1 className="login-title">
              Edu<span className="text-glow-emerald">Flow</span> Portal Access
            </h1>
            <p className="login-subtext">
              Unified authentication for Students, Parents, and Academic Faculty
            </p>
          </div>
        </div>

        {/* Portal Role Switcher Tabs */}
        <div className="login-role-tabs-container">
          <button
            type="button"
            className={`login-role-tab ${selectedRole === "student" ? "active" : ""}`}
            onClick={() => setSelectedRole("student")}
          >
            🎓 Student Portal
          </button>
          <button
            type="button"
            className={`login-role-tab ${selectedRole === "parent" ? "active" : ""}`}
            onClick={() => setSelectedRole("parent")}
          >
            👨‍👩‍👦 Parent View
          </button>
          <button
            type="button"
            className={`login-role-tab ${selectedRole === "faculty" ? "active" : ""}`}
            onClick={() => setSelectedRole("faculty")}
          >
            👨‍🏫 Faculty Admin
          </button>
        </div>

        {/* Mode Switcher: Sign In vs Create Account */}
        <div className="login-mode-switcher">
          <button
            type="button"
            className={`mode-btn ${authMode === "signin" ? "active" : ""}`}
            onClick={() => setAuthMode("signin")}
          >
            <Lock size={14} /> Sign In
          </button>
          <button
            type="button"
            className={`mode-btn ${authMode === "signup" ? "active" : ""}`}
            onClick={() => setAuthMode("signup")}
          >
            <Sparkles size={14} /> Create Account
          </button>
        </div>

        {/* =========================================================================
            SIGN IN FORM
           ========================================================================= */}
        {authMode === "signin" ? (
          <form onSubmit={handleLoginSubmit} className="login-form-body">
            <div className="form-group mb-16">
              <label className="form-label">
                {selectedRole === "student"
                  ? "Roll Number or Student Email"
                  : selectedRole === "parent"
                  ? "Parent Email or Ward's Roll Number"
                  : "Faculty Employee ID or College Email"}
              </label>
              <div className="input-with-icon">
                <IdCard size={18} className="input-field-icon" />
                <input
                  type="text"
                  placeholder={
                    selectedRole === "student"
                      ? "e.g. CS-2024-001 or rahim.basha@college.edu"
                      : selectedRole === "parent"
                      ? "e.g. farooq.basha@parent.edu or CS-2024-001"
                      : "e.g. FAC-CSE-004 or senthil.kumar@faculty.edu"
                  }
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  required
                />
              </div>
            </div>

            <div className="form-group mb-16">
              <div className="flex-between">
                <label className="form-label">Password</label>
                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-field-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your secret portal password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex-between items-center mb-20 text-xs">
              <label className="flex-center gap-8 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember this session</span>
              </label>
              <span className="text-dim">256-Bit Encrypted</span>
            </div>

            <button type="submit" className="btn-primary-neon w-full py-12">
              <span>Sign In to {selectedRole.toUpperCase()} Portal</span>
              <ArrowRight size={16} />
            </button>

            {/* 1-Click Demo Logins */}
            <div className="demo-accounts-box mt-20">
              <span className="text-xs text-muted block mb-8 font-bold">
                ⚡ 1-CLICK DEMO ACCESS:
              </span>
              <div className="demo-pills-row">
                <button
                  type="button"
                  className="demo-account-pill"
                  onClick={() => handleQuickDemo("student")}
                >
                  🎓 Student (Rahim)
                </button>
                <button
                  type="button"
                  className="demo-account-pill"
                  onClick={() => handleQuickDemo("parent")}
                >
                  👨‍👩‍👦 Parent (Farooq)
                </button>
                <button
                  type="button"
                  className="demo-account-pill"
                  onClick={() => handleQuickDemo("faculty")}
                >
                  👨‍🏫 Faculty (Dr. Senthil)
                </button>
              </div>
            </div>

            <div className="text-center mt-18 text-xs text-muted">
              Don't have an institutional password or account?{" "}
              <button
                type="button"
                className="text-emerald font-bold cursor-pointer underline"
                onClick={() => setAuthMode("signup")}
              >
                Create Account
              </button>
            </div>
          </form>
        ) : (
          /* =========================================================================
              CREATE ACCOUNT (REGISTRATION) FORM
             ========================================================================= */
          <form onSubmit={handleRegisterSubmit} className="login-form-body">
            <div className="form-group mb-12">
              <label className="form-label">Full Legal Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-field-icon" />
                <input
                  type="text"
                  placeholder="e.g. Ayesha Siddiqua or Dr. S. Raman"
                  value={regData.name}
                  onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-12">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-field-icon" />
                <input
                  type="email"
                  placeholder="e.g. name@college.edu or parent@gmail.com"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid-2-cols gap-12 mb-12">
              <div className="form-group">
                <label className="form-label">
                  {selectedRole === "student"
                    ? "Roll Number"
                    : selectedRole === "parent"
                    ? "Ward's Roll No"
                    : "Staff Employee ID"}
                </label>
                <input
                  type="text"
                  placeholder={
                    selectedRole === "student"
                      ? "e.g. CS-2026-088"
                      : selectedRole === "parent"
                      ? "e.g. CS-2024-001"
                      : "e.g. FAC-CSE-012"
                  }
                  value={regData.identifier}
                  onChange={(e) => setRegData({ ...regData, identifier: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  value={regData.department}
                  onChange={(e) => setRegData({ ...regData, department: e.target.value })}
                >
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>AI & Data Science</option>
                  <option>Electronics & Communication</option>
                  <option>Mechanical Engineering</option>
                  <option>Civil Engineering</option>
                </select>
              </div>
            </div>

            <div className="grid-2-cols gap-12 mb-16">
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-field-icon" />
                  <input
                    type={showRegPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-with-icon">
                  <KeyRound size={16} className="input-field-icon" />
                  <input
                    type={showRegPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={regData.confirmPassword}
                    onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                  >
                    {showRegPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-between items-center mb-16 text-xs">
              <label className="flex-center gap-8 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I confirm institutional eligibility and agree to campus portal policy</span>
              </label>
            </div>

            <button type="submit" className="btn-primary-neon w-full py-12">
              <Sparkles size={16} />
              <span>Create Account & Enter {selectedRole.toUpperCase()} Portal</span>
            </button>

            <div className="text-center mt-16 text-xs text-muted">
              Already registered?{" "}
              <button
                type="button"
                className="text-emerald font-bold cursor-pointer underline"
                onClick={() => setAuthMode("signin")}
              >
                Sign In to existing account
              </button>
            </div>
          </form>
        )}

        {/* Bottom Fast Return Button */}
        <div className="login-footer-row mt-20 pt-16 border-t border-glass text-center">
          <Link to="/" className="text-xs text-muted hover:text-white flex-center gap-6 justify-center">
            <Compass size={14} /> Continue Exploring Dashboard as Guest
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
