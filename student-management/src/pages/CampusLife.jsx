import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Trophy,
  Bell,
  QrCode,
  Flame,
  Award,
  Sparkles,
  Send,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Plus,
  MessageCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

export default function CampusLife() {
  const {
    currentStudent,
    studyGroups,
    joinGroup,
    sendGroupChat,
    campusNotices,
    qrCheckinLogs,
    recordQRCheckin,
    addToast,
  } = useStudentContext();

  const safeGroups = studyGroups || [];
  const [activeTab, setActiveTab] = useState("groups"); // 'groups' | 'gamification' | 'notices' | 'checkin'
  const [selectedGroup, setSelectedGroup] = useState(safeGroups[0] || null);
  const currentGroup = selectedGroup || safeGroups[0] || {
    id: 1,
    name: "General Study Circle",
    description: "Collaborative learning space for students",
    sharedNotesCount: 0,
    chat: [],
  };
  const [chatInput, setChatInput] = useState("");
  const [noticeFilter, setNoticeFilter] = useState("All");
  const [isLeaderboardPrivate, setIsLeaderboardPrivate] = useState(false);

  // Send group chat
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentGroup?.id) return;
    sendGroupChat(currentGroup.id, chatInput);
    setChatInput("");
  };

  // QR Checkin Simulation
  const handleSimulateScan = (loc) => {
    recordQRCheckin(loc);
  };

  const filteredNotices = (campusNotices || []).filter((n) => {
    if (noticeFilter === "All") return true;
    return n.category === noticeFilter;
  });

  // Mock Leaderboard
  const leaderboardList = [
    { rank: 1, name: "Sneha Nair", roll: "AI-2024-031", xp: 2150, streak: 24, badge: "Grand Scholar 👑" },
    { rank: 2, name: "Ayesha Siddiqua", roll: "IT-2024-018", xp: 1980, streak: 22, badge: "Code Virtuoso ⚡" },
    { rank: 3, name: currentStudent.name, roll: currentStudent.rollNo, xp: currentStudent.xp, streak: currentStudent.streak, badge: "Master Peer 🤝", isCurrentUser: true },
    { rank: 4, name: "Farhan Khan", roll: "CS-2024-055", xp: 1720, streak: 16, badge: "Security Ace 🛡️" },
    { rank: 5, name: "Priya Sharma", roll: "CS-2024-042", xp: 1650, streak: 15, badge: "Full Stack Star 🌟" },
  ];

  return (
    <div className="campus-life-page-wrapper">
      {/* Top Banner */}
      <div className="page-header-card">
        <div>
          <div className="flex-center gap-8">
            <span className="section-pill">PEER ECOSYSTEM & REWARDS</span>
            <span className="badge-pill-magenta">{currentStudent.level}</span>
          </div>
          <h1 className="page-main-heading">
            Peer Groups, Gamification & <span className="text-glow-emerald">Campus Life</span>
          </h1>
          <p className="page-subtext">
            Collaborate in subject study circles, earn badges and streaks, check noticeboards, and scan digital QR access passes.
          </p>
        </div>

        <div className="academics-nav-pills">
          <button
            className={`academic-pill-btn ${activeTab === "groups" ? "active" : ""}`}
            onClick={() => setActiveTab("groups")}
          >
            <Users size={16} /> Study Groups
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "gamification" ? "active" : ""}`}
            onClick={() => setActiveTab("gamification")}
          >
            <Trophy size={16} /> Gamification & XP
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "notices" ? "active" : ""}`}
            onClick={() => setActiveTab("notices")}
          >
            <Bell size={16} /> Notice Board
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "checkin" ? "active" : ""}`}
            onClick={() => setActiveTab("checkin")}
          >
            <QrCode size={16} /> QR Check-in Pass
          </button>
        </div>
      </div>

      {/* TAB 1: PEER STUDY GROUPS */}
      {activeTab === "groups" && (
        <div className="study-groups-layout mt-24">
          {/* Groups Directory */}
          <div className="groups-sidebar-col">
            <div className="flex-between items-center mb-14">
              <h3 className="font-bold text-sm">Active Circles</h3>
              <button
                className="btn-secondary text-xs"
                onClick={() => addToast("Create Group", "Create new study group modal coming soon!", "info")}
              >
                <Plus size={13} /> New Group
              </button>
            </div>

            <div className="groups-list">
              {studyGroups.map((group) => (
                <div
                  key={group.id}
                  className={`group-item-card ${selectedGroup?.id === group.id ? "active" : ""}`}
                  onClick={() => setSelectedGroup(group)}
                >
                  <div className="flex-between">
                    <span className="group-subj-tag">{group.subject}</span>
                    <span className="text-xs text-muted">👥 {group.membersCount} members</span>
                  </div>
                  <h4 className="group-name">{group.name}</h4>
                  <p className="group-next-session">
                    <Calendar size={12} className="inline mr-1 text-emerald" />
                    {group.nextSession}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group Chat & Resource Center */}
          <div className="group-active-col analytics-card">
            <div className="card-top-controls pb-12 border-b border-glass">
              <div>
                <span className="section-pill">LIVE STUDY ROOM</span>
                <h3 className="card-title">{currentGroup.name}</h3>
                <p className="text-xs text-muted">{currentGroup.description}</p>
              </div>

              <div className="flex-center gap-10">
                <span className="badge-pill-cyan text-xs">
                  {currentGroup.sharedNotesCount} Shared Notes
                </span>
                <button
                  className="btn-primary-neon text-xs"
                  onClick={() => joinGroup(currentGroup.id)}
                >
                  Join Circle
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="group-chat-stream">
              {(currentGroup.chat || []).map((msg, i) => (
                <div key={i} className="group-chat-msg">
                  <div className="msg-avatar">{msg?.sender?.charAt(0) || "👤"}</div>
                  <div className="msg-body">
                    <div className="flex-between">
                      <strong className="msg-sender">{msg?.sender || "Peer"}</strong>
                      <span className="msg-time">{msg?.time || "Recently"}</span>
                    </div>
                    <p className="msg-text">{msg?.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="group-chat-input-bar">
              <input
                type="text"
                placeholder={`Message ${currentGroup.name}...`}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn-primary-neon">
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: GAMIFICATION & LEADERBOARD */}
      {activeTab === "gamification" && (
        <div className="gamification-layout mt-24">
          {/* Top XP and Streaks Bar */}
          <div className="gamification-stats-banner">
            <div className="xp-card">
              <div className="flex-center gap-10">
                <Sparkles size={24} className="text-emerald" />
                <div>
                  <span className="text-xs text-muted">TOTAL ACADEMIC XP</span>
                  <h2 className="text-2xl font-black text-emerald">{currentStudent.xp} XP</h2>
                </div>
              </div>
              <span className="badge-pill-emerald">{currentStudent.level}</span>
            </div>

            <div className="streak-card">
              <div className="flex-center gap-10">
                <Flame size={24} className="text-rose" />
                <div>
                  <span className="text-xs text-muted">ATTENDANCE STREAK</span>
                  <h2 className="text-2xl font-black text-rose">{currentStudent.streak} Days 🔥</h2>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald">Keep it going!</span>
            </div>
          </div>

          {/* Earned Badges Showcase */}
          <div className="analytics-card mt-24">
            <div className="card-top-controls">
              <div>
                <span className="section-pill">ACHIEVEMENTS</span>
                <h3 className="card-title">Unlocked Academic Badges</h3>
              </div>
              <Award size={18} className="text-amber" />
            </div>

            <div className="badges-showcase-grid">
              {currentStudent.badges.map((b) => (
                <div key={b.id} className="badge-card-item">
                  <span className="badge-emoji-lg">{b.icon}</span>
                  <h4 className="badge-title">{b.name}</h4>
                  <p className="badge-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Class Leaderboard */}
          <div className="analytics-card mt-24">
            <div className="flex-between items-center mb-16">
              <div>
                <span className="section-pill">DEPARTMENT STANDINGS</span>
                <h3 className="card-title">Semester V Class Leaderboard</h3>
              </div>

              <button
                className="btn-secondary text-xs"
                onClick={() => setIsLeaderboardPrivate(!isLeaderboardPrivate)}
              >
                {isLeaderboardPrivate ? <EyeOff size={14} /> : <Eye size={14} />}
                {isLeaderboardPrivate ? "Private Mode Active" : "Public View"}
              </button>
            </div>

            <div className="table-responsive-wrapper">
              <table className="student-glass-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>Streak</th>
                    <th>Academic XP</th>
                    <th>Badge Honor</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardList.map((st) => (
                    <tr key={st.rank} className={st.isCurrentUser ? "bg-emerald-dim" : ""}>
                      <td className="font-bold font-mono">#{st.rank}</td>
                      <td>
                        <strong>{isLeaderboardPrivate && !st.isCurrentUser ? "Anonymous Scholar" : st.name}</strong>
                        {st.isCurrentUser && <span className="ml-2 badge-pill-emerald text-xs">YOU</span>}
                      </td>
                      <td className="font-mono text-xs">{isLeaderboardPrivate && !st.isCurrentUser ? "CS-••••-•••" : st.roll}</td>
                      <td>
                        <span className="text-rose font-bold">🔥 {st.streak}d</span>
                      </td>
                      <td className="font-bold text-emerald">{st.xp} XP</td>
                      <td>
                        <span className="badge-pill-cyan text-xs">{st.badge}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTICE BOARD */}
      {activeTab === "notices" && (
        <div className="notices-container mt-24">
          <div className="flex-between items-center mb-16 flex-wrap gap-12">
            <div className="notice-filter-pills">
              {["All", "Exam", "Placements", "Academic", "Club"].map((cat) => (
                <button
                  key={cat}
                  className={`sub-pill ${noticeFilter === cat ? "active" : ""}`}
                  onClick={() => setNoticeFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-muted">
              Notifications pushed via Institutional Broadcast System
            </span>
          </div>

          <div className="notices-grid">
            {filteredNotices.map((n) => (
              <div key={n.id} className="notice-glass-card">
                <div className="flex-between items-start mb-10">
                  <span className="badge-pill-cyan text-xs">{n.category}</span>
                  <span className="text-xs text-dim">{n.date}</span>
                </div>
                <h3 className="notice-heading">{n.title}</h3>
                <p className="notice-body">{n.body}</p>
                <div className="notice-footer-meta">
                  <span className="target-chip">Audience: {n.target}</span>
                  {n.urgent && <span className="badge-pill-rose text-xs">URGENT</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DIGITAL ID & QR CHECK-IN PASS */}
      {activeTab === "checkin" && (
        <div className="checkin-container mt-24">
          <div className="qr-pass-hero-card">
            <div className="qr-pass-left">
              <span className="section-pill">NFC & QR SMART ACCESS</span>
              <h2>Instant Campus Check-in Pass</h2>
              <p className="text-sm opacity-80 mb-20">
                Hold your digital QR code to smart campus turnstiles for automatic attendance verification.
              </p>

              <div className="qr-interactive-scanner-box">
                <h4>Simulate Live Terminal Scan:</h4>
                <div className="scanner-buttons-row mt-10">
                  {[
                    "Central Library Turnstile Gate",
                    "Semester Examination Hall A",
                    "Computer Center 2 Entrance",
                    "Hostel Mess Dining Hall",
                  ].map((loc) => (
                    <button
                      key={loc}
                      className="btn-secondary text-xs"
                      onClick={() => handleSimulateScan(loc)}
                    >
                      <QrCode size={14} /> Scan at {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="qr-pass-right">
              <div className="qr-badge-token">
                <QrCode size={160} className="text-dark" />
                <div className="qr-token-info">
                  <strong>{currentStudent.name}</strong>
                  <p className="font-mono text-xs">{currentStudent.rollNo}</p>
                  <span className="token-validity">VALID FOR 2026-27</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Access Logs */}
          <div className="analytics-card mt-24">
            <div className="card-top-controls">
              <div>
                <span className="section-pill">BIOMETRIC AUDIT TRAIL</span>
                <h3 className="card-title">Recent QR Terminal Access Logs</h3>
              </div>
              <ShieldCheck size={18} className="text-emerald" />
            </div>

            <div className="access-logs-list">
              {qrCheckinLogs.map((log) => (
                <div key={log.id} className="log-row">
                  <div className="flex-center gap-10">
                    <CheckCircle size={16} className="text-emerald" />
                    <div>
                      <strong className="text-sm">{log.location}</strong>
                      <span className="text-xs text-muted block">{log.time}</span>
                    </div>
                  </div>
                  <span className="badge-pill-emerald text-xs">{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
