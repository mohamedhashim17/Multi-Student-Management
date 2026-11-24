import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/translations";
import {
  LOGGED_IN_STUDENT,
  TODAY_CLASSES,
  WEEKLY_TIMETABLE,
  EXAM_SCHEDULE,
  HOLIDAYS_LIST,
  SUBJECT_ATTENDANCE,
  PENDING_ASSIGNMENTS,
  FEE_DETAILS,
  CAMPUS_NOTICES,
  COURSE_MATERIALS,
  STUDY_GROUPS,
  PLACEMENT_LISTINGS,
  SEMESTER_RESULTS,
} from "../data/mockStudentData";

const StudentContext = createContext();

export const INITIAL_STUDENTS = [
  {
    id: 1,
    rollNo: "CS-2024-001",
    name: "Rahim Basha",
    department: "Computer Science",
    year: "III Year",
    gender: "Male",
    email: "rahim.basha@college.edu",
    phone: "+91 98765 43210",
    dob: "2004-03-14",
    bloodGroup: "O+",
    cgpa: 8.92,
    attendance: 94,
    status: "Active",
    avatar: "👨‍💻",
    address: "24 Park Avenue, Tech Quarter, Chennai",
    attendanceHistory: [
      { date: "2026-11-23", status: "Present" },
      { date: "2026-11-22", status: "Present" },
      { date: "2026-11-21", status: "Present" },
      { date: "2026-11-20", status: "Absent" },
      { date: "2026-11-19", status: "Present" },
    ],
    courses: [
      { code: "CS501", name: "Data Structures & Algorithms", grade: "A+", credits: 4 },
      { code: "CS502", name: "Operating Systems", grade: "A", credits: 4 },
      { code: "CS503", name: "Database Management Systems", grade: "O", credits: 3 },
      { code: "CS504", name: "Computer Networks", grade: "A+", credits: 3 },
    ],
  },
  {
    id: 2,
    rollNo: "IT-2024-018",
    name: "Ayesha Siddiqua",
    department: "Information Technology",
    year: "II Year",
    gender: "Female",
    email: "ayesha.s@college.edu",
    phone: "+91 98451 23678",
    dob: "2005-07-22",
    bloodGroup: "B+",
    cgpa: 9.35,
    attendance: 98,
    status: "Active",
    avatar: "👩‍💻",
    address: "71 Green Valley Heights, Bangalore",
    attendanceHistory: [
      { date: "2026-11-23", status: "Present" },
      { date: "2026-11-22", status: "Present" },
      { date: "2026-11-21", status: "Present" },
      { date: "2026-11-20", status: "Present" },
      { date: "2026-11-19", status: "Present" },
    ],
    courses: [
      { code: "IT301", name: "Web Development & Cloud", grade: "O", credits: 4 },
      { code: "IT302", name: "Object Oriented Java", grade: "A+", credits: 4 },
    ],
  },
  {
    id: 3,
    rollNo: "AI-2024-007",
    name: "Arun Kumar",
    department: "AI & Data Science",
    year: "III Year",
    gender: "Male",
    email: "arun.kumar@college.edu",
    phone: "+91 97890 12345",
    dob: "2004-11-09",
    bloodGroup: "A+",
    cgpa: 8.65,
    attendance: 91,
    status: "Active",
    avatar: "🧠",
    address: "15 Cyber Hub Blvd, Hyderabad",
    attendanceHistory: [
      { date: "2026-11-23", status: "Present" },
      { date: "2026-11-22", status: "Late" },
    ],
  },
  {
    id: 4,
    rollNo: "CS-2024-042",
    name: "Priya Sharma",
    department: "Computer Science",
    year: "I Year",
    gender: "Female",
    email: "priya.sharma@college.edu",
    phone: "+91 99001 88776",
    dob: "2006-02-18",
    bloodGroup: "AB+",
    cgpa: 9.1,
    attendance: 96,
    status: "Active",
    avatar: "👩‍🎓",
    address: "88 Orchid Enclave, New Delhi",
  },
  {
    id: 5,
    rollNo: "EC-2024-023",
    name: "Mohamed Ahmed",
    department: "Electronics & Communication",
    year: "IV Year",
    gender: "Male",
    email: "ahmed.m@college.edu",
    phone: "+91 98888 77665",
    dob: "2003-08-30",
    bloodGroup: "O-",
    cgpa: 8.45,
    attendance: 88,
    status: "Active",
    avatar: "📡",
    address: "12 Marina Beach Road, Chennai",
  },
  {
    id: 6,
    rollNo: "ME-2024-012",
    name: "Sanjay Verma",
    department: "Mechanical Engineering",
    year: "II Year",
    gender: "Male",
    email: "sanjay.verma@college.edu",
    phone: "+91 97711 22334",
    dob: "2005-04-10",
    bloodGroup: "B-",
    cgpa: 7.95,
    attendance: 85,
    status: "Active",
    avatar: "⚙️",
    address: "33 Industrial Sector, Pune",
  },
];

export const DEFAULT_ACCOUNTS = [
  {
    id: "usr_student",
    name: "Rahim Basha",
    email: "rahim.basha@college.edu",
    identifier: "CS-2024-001",
    password: "student123",
    role: "student",
    department: "Computer Science",
    year: "III Year",
    avatar: "👨‍💻",
  },
  {
    id: "usr_parent",
    name: "Farooq Basha",
    email: "farooq.basha@parent.edu",
    identifier: "CS-2024-001",
    altIdentifier: "PAR-2024-001",
    password: "parent123",
    role: "parent",
    department: "Computer Science",
    wardName: "Rahim Basha",
    avatar: "👨‍👩‍👦",
  },
  {
    id: "usr_faculty",
    name: "Dr. K. Senthil Kumar",
    email: "senthil.kumar@faculty.edu",
    identifier: "FAC-CSE-004",
    password: "faculty123",
    role: "faculty",
    department: "Computer Science",
    designation: "HOD & Professor",
    avatar: "👨‍🏫",
  },
];

export function StudentProvider({ children }) {
  // Registered Accounts (persisted in LocalStorage, always merging defaults)
  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_accounts");
      const parsed = s ? JSON.parse(s) : null;
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure standard demo accounts always exist
        const missing = DEFAULT_ACCOUNTS.filter(
          (d) =>
            !parsed.some(
              (p) =>
                p.role === d.role &&
                (p.email?.toLowerCase() === d.email.toLowerCase() ||
                  p.identifier?.toLowerCase() === d.identifier.toLowerCase())
            )
        );
        return [...parsed, ...missing];
      }
      return DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  });

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_is_authenticated");
      return s !== "false";
    } catch {
      return true;
    }
  });

  // Current Logged-in Account
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_current_user");
      const parsed = s ? JSON.parse(s) : null;
      return parsed || DEFAULT_ACCOUNTS[0];
    } catch {
      return DEFAULT_ACCOUNTS[0];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Students master state
  const [students, setStudents] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_students");
      const parsed = s ? JSON.parse(s) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  // Current Logged-in Student
  const [currentStudent, setCurrentStudent] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_logged_in_student");
      const parsed = s ? JSON.parse(s) : null;
      return parsed && typeof parsed === "object" ? { ...LOGGED_IN_STUDENT, ...parsed } : LOGGED_IN_STUDENT;
    } catch {
      return LOGGED_IN_STUDENT;
    }
  });

  // Role: 'student' (default), 'parent', 'faculty'
  const [role, setRole] = useState(() => {
    try {
      const r = localStorage.getItem("eduflow_role");
      return r && ["student", "parent", "faculty"].includes(r) ? r : "student";
    } catch {
      return "student";
    }
  });

  // Language: 'en' (default), 'ta' (Tamil), 'hi' (Hindi)
  const [language, setLanguage] = useState(() => {
    try {
      const l = localStorage.getItem("eduflow_lang");
      return l && ["en", "ta", "hi"].includes(l) ? l : "en";
    } catch {
      return "en";
    }
  });

  // Accessibility options
  const [fontSize, setFontSize] = useState(() => {
    try {
      return localStorage.getItem("eduflow_font_size") || "normal";
    } catch {
      return "normal";
    }
  });
  const [highContrast, setHighContrast] = useState(() => {
    try {
      return localStorage.getItem("eduflow_high_contrast") === "true";
    } catch {
      return false;
    }
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    try {
      return localStorage.getItem("eduflow_reduced_motion") === "true";
    } catch {
      return false;
    }
  });

  // Theme
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("eduflow_theme") || "dark";
    } catch {
      return "dark";
    }
  });

  // Assignments
  const [assignments, setAssignments] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_assignments");
      const parsed = s ? JSON.parse(s) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : PENDING_ASSIGNMENTS;
    } catch {
      return PENDING_ASSIGNMENTS;
    }
  });

  // Fee Details
  const [feeDetails, setFeeDetails] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_fees");
      const parsed = s ? JSON.parse(s) : null;
      return parsed && typeof parsed === "object" && parsed.breakdown
        ? { ...FEE_DETAILS, ...parsed }
        : FEE_DETAILS;
    } catch {
      return FEE_DETAILS;
    }
  });

  // Subject-wise Attendance
  const [subjectAttendance, setSubjectAttendance] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_subject_attendance");
      const parsed = s ? JSON.parse(s) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : SUBJECT_ATTENDANCE;
    } catch {
      return SUBJECT_ATTENDANCE;
    }
  });

  // Study Groups
  const [studyGroups, setStudyGroups] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_study_groups");
      const parsed = s ? JSON.parse(s) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : STUDY_GROUPS;
    } catch {
      return STUDY_GROUPS;
    }
  });

  // Placement listings
  const [placements, setPlacements] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_placements");
      const parsed = s ? JSON.parse(s) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : PLACEMENT_LISTINGS;
    } catch {
      return PLACEMENT_LISTINGS;
    }
  });

  // Grievances & Anonymous feedback
  const [grievances, setGrievances] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_grievances");
      return s
        ? JSON.parse(s)
        : [
            {
              id: 1,
              category: "Course & Academics",
              subject: "Need extra practical lab sessions for OS",
              desc: "Requesting additional lab hours on Saturday for Linux kernel compilation practice.",
              status: "Under Review by HOD",
              isAnonymous: true,
              date: "2026-11-20",
              response: "Lab coordinator scheduled Saturday 10 AM - 1 PM slot.",
            },
            {
              id: 2,
              category: "Campus Amenities",
              subject: "Hostel Block A WiFi signal booster request",
              desc: "Weak WiFi connection on 3rd floor wing during evening study hours.",
              status: "Resolved",
              isAnonymous: false,
              date: "2026-11-18",
              response: "IT Admin installed dual-band Aruba access point on 19 Nov.",
            },
          ];
    } catch {
      return [];
    }
  });

  // Counselor bookings
  const [counselorBookings, setCounselorBookings] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_counselor_bookings");
      return s
        ? JSON.parse(s)
        : [
            { id: 1, date: "2026-11-25", time: "03:00 PM", mode: "Confidential Online Chat", counselor: "Dr. Radhika Sen (Lead Counselor)", status: "Confirmed" },
          ];
    } catch {
      return [];
    }
  });

  // QR Check-in history
  const [qrCheckinLogs, setQrCheckinLogs] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_checkin_logs");
      return s
        ? JSON.parse(s)
        : [
            { id: 1, location: "Central Library Access Gate", time: "Today, 08:45 AM", status: "Verified" },
            { id: 2, location: "Computer Center 2 Entrance", time: "Yesterday, 02:15 PM", status: "Verified" },
          ];
    } catch {
      return [];
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_notifications");
      return s
        ? JSON.parse(s)
        : [
            { id: 1, title: "Low Attendance Warning: Operating Systems (70%)", message: "Your attendance in CS502 has fallen below the mandatory 75% threshold. Please attend next 5 classes.", time: "10m ago", read: false, type: "alert" },
            { id: 2, title: "Assignment Due in 3 Days: AVL Trees", message: "Data Structures assignment 2 deadline is 26th Nov at 11:59 PM.", time: "1h ago", read: false, type: "announcement" },
            { id: 3, title: "Fee Payment Reminder", message: "Semester V tuition balance of ₹20,000 due by 15 Dec 2026.", time: "4h ago", read: false, type: "alert" },
            { id: 4, title: "Zoho Campus Interview Scheduled", message: "Your Round 2 Technical interview is scheduled for tomorrow at 10 AM.", time: "1d ago", read: true, type: "event" },
          ];
    } catch {
      return [];
    }
  });

  // Activities
  const [activities, setActivities] = useState(() => {
    try {
      const s = localStorage.getItem("eduflow_activities");
      return s
        ? JSON.parse(s)
        : [
            { id: 1, text: "Submitted assignment: Wireshark Packet Analysis", type: "assignment", time: "20 mins ago" },
            { id: 2, text: "Earned badge: Attendance Hero 🔥", type: "badge", time: "2 hours ago" },
            { id: 3, text: "Joined peer study group: LeetCode & DSA Elite", type: "group", time: "5 hours ago" },
            { id: 4, text: "Completed AI Quiz on Balanced Search Trees (Score: 100%)", type: "quiz", time: "1 day ago" },
          ];
    } catch {
      return [];
    }
  });

  // Global search & toasts
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState([]);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("eduflow_students", JSON.stringify(students));
      localStorage.setItem("eduflow_assignments", JSON.stringify(assignments));
      localStorage.setItem("eduflow_fees", JSON.stringify(feeDetails));
      localStorage.setItem("eduflow_subject_attendance", JSON.stringify(subjectAttendance));
      localStorage.setItem("eduflow_study_groups", JSON.stringify(studyGroups));
      localStorage.setItem("eduflow_placements", JSON.stringify(placements));
      localStorage.setItem("eduflow_grievances", JSON.stringify(grievances));
      localStorage.setItem("eduflow_counselor_bookings", JSON.stringify(counselorBookings));
      localStorage.setItem("eduflow_checkin_logs", JSON.stringify(qrCheckinLogs));
      localStorage.setItem("eduflow_notifications", JSON.stringify(notifications));
      localStorage.setItem("eduflow_activities", JSON.stringify(activities));
      localStorage.setItem("eduflow_role", role);
      localStorage.setItem("eduflow_lang", language);
      localStorage.setItem("eduflow_font_size", fontSize);
      localStorage.setItem("eduflow_high_contrast", String(highContrast));
      localStorage.setItem("eduflow_reduced_motion", String(reducedMotion));
    } catch (e) {
      console.error("LocalStorage write error:", e);
    }
  }, [
    students,
    assignments,
    feeDetails,
    subjectAttendance,
    studyGroups,
    placements,
    grievances,
    counselorBookings,
    qrCheckinLogs,
    notifications,
    activities,
    role,
    language,
    fontSize,
    highContrast,
    reducedMotion,
  ]);

  // Apply Theme & Accessibility attributes to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-role", role);
    document.documentElement.setAttribute("data-font-size", fontSize);
    if (highContrast) {
      document.documentElement.setAttribute("data-high-contrast", "true");
    } else {
      document.documentElement.removeAttribute("data-high-contrast");
    }
    if (reducedMotion) {
      document.documentElement.setAttribute("data-reduced-motion", "true");
    } else {
      document.documentElement.removeAttribute("data-reduced-motion");
    }
    try {
      localStorage.setItem("eduflow_theme", theme);
    } catch {}
  }, [theme, role, fontSize, highContrast, reducedMotion]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const addToast = (title, message, type = "success", duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addActivity = (text, type = "general") => {
    setActivities((prev) => [{ id: Date.now(), text, type, time: "Just now" }, ...prev.slice(0, 19)]);
  };

  // Translation helper
  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  // Submit Assignment
  const submitAssignment = (id, fileName = "Assignment_Solution_CS001.pdf") => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            status: "Submitted",
            submissionFile: fileName,
            feedback: "Submitted on time. Awaiting teacher grading.",
            grade: "Under Review",
          };
        }
        return a;
      })
    );
    // Award XP
    setCurrentStudent((prev) => ({
      ...prev,
      xp: (prev.xp || 1000) + 50,
      streak: (prev.streak || 1) + 1,
    }));
    addActivity(`Uploaded submission for ${assignments.find((a) => a.id === id)?.title || "Assignment"} (+50 XP)`, "assignment");
    addToast("Assignment Submitted", "Your work was uploaded to the academic portal and sent to faculty.", "success");
  };

  // Online Fee Payment
  const payFee = (amount, mode = "UPI (Google Pay)", ref = `UPI-PAY-${Math.floor(100000 + Math.random() * 900000)}`) => {
    const numAmount = Number(amount);
    if (numAmount <= 0) return;

    const receiptNo = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTxn = {
      id: `TXN-${Date.now().toString().slice(-7)}`,
      date: new Date().toISOString().slice(0, 10),
      amount: numAmount,
      mode,
      ref,
      status: "Successful",
      receiptNo,
    };

    setFeeDetails((prev) => {
      const newPaid = prev.paidAmount + numAmount;
      const newDue = Math.max(0, prev.dueAmount - numAmount);
      return {
        ...prev,
        paidAmount: newPaid,
        dueAmount: newDue,
        status: newDue === 0 ? "Fully Paid" : "Partially Paid",
        transactions: [newTxn, ...prev.transactions],
      };
    });

    addActivity(`Paid fee of ₹${numAmount.toLocaleString()} via ${mode} (Receipt: ${receiptNo})`, "fee");
    addToast("Payment Successful", `₹${numAmount.toLocaleString()} received! Receipt #${receiptNo} ready to download.`, "success");
    return receiptNo;
  };

  // Subject Attendance increment / decrement
  const updateSubjectAttendance = (code, incrementAttended = true) => {
    setSubjectAttendance((prev) =>
      prev.map((subj) => {
        if (subj.code === code) {
          const newAtt = incrementAttended ? subj.attended + 1 : subj.attended;
          const newTot = subj.total + 1;
          return { ...subj, attended: newAtt, total: newTot };
        }
        return subj;
      })
    );
    addToast("Attendance Recorded", `Updated attendance records for ${code}`, "success");
  };

  // Grievance submission
  const submitGrievance = ({ category, subject, desc, isAnonymous }) => {
    const newTicket = {
      id: Date.now(),
      category: category || "Academics",
      subject: subject || "Campus Feedback",
      desc: desc || "",
      status: "Submitted to Dean",
      isAnonymous: Boolean(isAnonymous),
      date: new Date().toISOString().slice(0, 10),
      response: "Ticket acknowledged. Academic council will review within 48 hours.",
    };
    setGrievances((prev) => [newTicket, ...prev]);
    addActivity(`Submitted feedback ticket: ${subject}`, "support");
    addToast("Grievance Logged", "Your feedback was filed securely. Tracking ID has been generated.", "success");
  };

  // Book Counselor Session
  const bookCounselorSession = ({ date, time, mode }) => {
    const newBooking = {
      id: Date.now(),
      date,
      time,
      mode,
      counselor: "Dr. Radhika Sen (Student Wellness Dean)",
      status: "Confirmed",
    };
    setCounselorBookings((prev) => [newBooking, ...prev]);
    addActivity(`Booked confidential wellness counseling for ${date}`, "wellness");
    addToast("Session Booked", "Confidential wellness counseling appointment confirmed.", "success");
  };

  // Join Study Group / Send Message
  const joinGroup = (groupId) => {
    setStudyGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          return { ...g, membersCount: g.membersCount + 1 };
        }
        return g;
      })
    );
    addToast("Joined Study Group", "You are now a member of this peer collaboration group!", "success");
  };

  const sendGroupChat = (groupId, messageText) => {
    if (!messageText.trim()) return;
    setStudyGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const newChat = [
            ...(g.chat || []),
            { sender: currentStudent.name, time: "Just now", text: messageText.trim() },
          ];
          return { ...g, chat: newChat };
        }
        return g;
      })
    );
  };

  // Apply to Job
  const applyToJob = (jobId) => {
    setPlacements((prev) =>
      prev.map((p) => {
        if (p.id === jobId) {
          return {
            ...p,
            applied: true,
            status: "Application Submitted • Resume Sent",
          };
        }
        return p;
      })
    );
    addActivity(`Applied to ${placements.find((p) => p.id === jobId)?.company || "Company"}`, "placement");
    addToast("Application Sent", "Your profile and portfolio were forwarded to the placement cell.", "success");
  };

  // QR Check-in
  const recordQRCheckin = (locationName) => {
    const newLog = {
      id: Date.now(),
      location: locationName,
      time: `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      status: "Verified & Logged",
    };
    setQrCheckinLogs((prev) => [newLog, ...prev]);
    setCurrentStudent((prev) => ({
      ...prev,
      xp: (prev.xp || 1000) + 15,
    }));
    addActivity(`Scanned QR Check-in at ${locationName} (+15 XP)`, "checkin");
    addToast("Check-in Verified", `Welcome! Access granted at ${locationName}.`, "success");
  };

  // Student CRUD (for Directory)
  const addStudent = (studentData) => {
    const newId = students.length > 0 ? Math.max(...students.map((s) => Number(s.id) || 0)) + 1 : 1;
    const defaultRoll = `${studentData.department?.substring(0, 2).toUpperCase() || "CS"}-2024-${String(newId).padStart(3, "0")}`;
    const newStudent = {
      id: newId,
      rollNo: studentData.rollNo?.trim() || defaultRoll,
      name: studentData.name?.trim(),
      department: studentData.department || "Computer Science",
      year: studentData.year || "I Year",
      gender: studentData.gender || "Male",
      email: studentData.email?.trim(),
      phone: studentData.phone?.trim() || "+91 98765 00000",
      dob: studentData.dob || "2005-01-01",
      bloodGroup: studentData.bloodGroup || "O+",
      cgpa: Number(studentData.cgpa) || 8.0,
      attendance: Number(studentData.attendance) || 90,
      status: studentData.status || "Active",
      avatar: studentData.avatar || (studentData.gender === "Female" ? "👩‍🎓" : "👨‍🎓"),
      address: studentData.address?.trim() || "Hostel Block A, Campus",
    };
    setStudents((prev) => [newStudent, ...prev]);
    addActivity(`New student enrolled: ${newStudent.name}`, "add");
    addToast("Student Added", `${newStudent.name} registered successfully!`, "success");
    return newStudent;
  };

  const updateStudent = (id, updatedFields) => {
    setStudents((prev) => prev.map((s) => (s.id === Number(id) ? { ...s, ...updatedFields } : s)));
    const updated = students.find((s) => s.id === Number(id));
    const name = updatedFields.name || updated?.name || "Student";
    addActivity(`Updated student details for ${name}`, "edit");
    addToast("Student Updated", `${name}'s profile updated.`, "success");
  };

  const deleteStudent = (id) => {
    const toDelete = students.find((s) => s.id === Number(id));
    const name = toDelete?.name || "Student";
    setStudents((prev) => prev.filter((s) => s.id !== Number(id)));
    addActivity(`Deleted record for ${name}`, "delete");
    addToast("Student Removed", `${name} was removed from database.`, "info");
  };

  const markAttendance = (id, status) => {
    const today = "2026-11-23";
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== Number(id)) return s;
        const history = s.attendanceHistory || [];
        const existingIdx = history.findIndex((h) => h.date === today);
        let newHistory = [...history];
        if (existingIdx >= 0) {
          newHistory[existingIdx] = { date: today, status };
        } else {
          newHistory = [{ date: today, status }, ...newHistory];
        }
        const presentCount = newHistory.filter((h) => h.status === "Present").length;
        const total = newHistory.length;
        const newAtt = Math.round((presentCount / Math.max(total, 1)) * 100);
        return {
          ...s,
          attendance: Math.min(100, Math.max(60, newAtt)),
          attendanceHistory: newHistory,
        };
      })
    );
    const s = students.find((st) => st.id === Number(id));
    addActivity(`Marked ${s?.name || "Student"} as ${status} for today`, "attendance");
    addToast("Attendance Marked", `${s?.name || "Student"} marked as ${status}.`, "success");
  };

  const resetDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setCurrentStudent(LOGGED_IN_STUDENT);
    setAssignments(PENDING_ASSIGNMENTS);
    setFeeDetails(FEE_DETAILS);
    setSubjectAttendance(SUBJECT_ATTENDANCE);
    setStudyGroups(STUDY_GROUPS);
    setPlacements(PLACEMENT_LISTINGS);
    localStorage.clear();
    addToast("Demo Data Restored", "All college modules restored to original demo defaults.", "info");
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("Notifications", "All notifications marked as read.", "info");
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Login with ID / Email and Password for any portal role
  const login = (loginId, password, targetRole = null) => {
    const idTrim = (loginId || "").trim().toLowerCase();
    const passTrim = (password || "").trim();

    if (!idTrim || !passTrim) {
      addToast("Missing Fields", "Please enter your ID/Email and password.", "error");
      return { success: false, message: "Missing fields" };
    }

    // 1. Try matching credentials for targetRole first
    let match = registeredAccounts.find((acc) => {
      const emailMatch = acc.email?.toLowerCase() === idTrim;
      const idMatch =
        acc.identifier?.toLowerCase() === idTrim || acc.altIdentifier?.toLowerCase() === idTrim;
      const passMatch =
        acc.password === passTrim || acc.password?.toLowerCase() === passTrim.toLowerCase();
      const roleMatch = targetRole ? acc.role === targetRole : true;
      return (emailMatch || idMatch) && passMatch && roleMatch;
    });

    // 2. If not found in targetRole, try matching credentials across ANY role
    if (!match) {
      match = registeredAccounts.find((acc) => {
        const emailMatch = acc.email?.toLowerCase() === idTrim;
        const idMatch =
          acc.identifier?.toLowerCase() === idTrim || acc.altIdentifier?.toLowerCase() === idTrim;
        const passMatch =
          acc.password === passTrim || acc.password?.toLowerCase() === passTrim.toLowerCase();
        return (emailMatch || idMatch) && passMatch;
      });
    }

    if (match) {
      setCurrentUser(match);
      setRole(match.role);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);

      if (match.role === "student") {
        setCurrentStudent((prev) => {
          const updated = {
            ...prev,
            name: match.name,
            email: match.email,
            rollNo: match.identifier,
            department: match.department || prev.department,
          };
          try {
            localStorage.setItem("eduflow_logged_in_student", JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }

      try {
        localStorage.setItem("eduflow_current_user", JSON.stringify(match));
        localStorage.setItem("eduflow_is_authenticated", "true");
        localStorage.setItem("eduflow_role", match.role);
      } catch {}
      addToast(
        "Login Successful",
        `Welcome to ${match.role.toUpperCase()} Portal, ${match.name}!`,
        "success"
      );
      return { success: true, user: match };
    }

    addToast(
      "Authentication Failed",
      "Invalid login ID or password. If you don't have an account, click 'Create Account'.",
      "error"
    );
    return { success: false, message: "Invalid credentials" };
  };

  // Register New Account
  const registerAccount = ({ name, email, identifier, password, role: newRole, department }) => {
    const nameTrim = (name || "").trim();
    const emailTrim = (email || "").trim().toLowerCase();
    const idTrim = (identifier || "").trim().toUpperCase();
    const passTrim = (password || "").trim();
    const roleChoice = newRole || "student";
    const deptChoice = department || "Computer Science";

    if (!nameTrim || !emailTrim || !idTrim || !passTrim) {
      addToast("Required Fields", "Please fill in all registration fields.", "error");
      return { success: false, message: "Missing required fields" };
    }

    // Check if duplicate email or id exists for same role
    const exists = registeredAccounts.some(
      (acc) =>
        acc.role === roleChoice &&
        (acc.email?.toLowerCase() === emailTrim || acc.identifier?.toUpperCase() === idTrim)
    );

    if (exists) {
      addToast("Account Exists", `An account with this ID or Email already exists for ${roleChoice} portal.`, "error");
      return { success: false, message: "Account already exists" };
    }

    const newAccount = {
      id: `usr_${Date.now()}`,
      name: nameTrim,
      email: emailTrim,
      identifier: idTrim,
      password: passTrim,
      role: roleChoice,
      department: deptChoice,
      year: roleChoice === "student" ? "I Year" : undefined,
      avatar: roleChoice === "parent" ? "👨‍👩‍👦" : roleChoice === "faculty" ? "👨‍🏫" : "👨‍💻",
      wardName: roleChoice === "parent" ? "Registered Ward" : undefined,
    };

    const updated = [...registeredAccounts, newAccount];
    setRegisteredAccounts(updated);
    setCurrentUser(newAccount);
    setRole(newAccount.role);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);

    if (newAccount.role === "student") {
      setCurrentStudent((prev) => {
        const studentObj = {
          ...prev,
          name: newAccount.name,
          email: newAccount.email,
          rollNo: newAccount.identifier,
          department: newAccount.department || prev.department,
        };
        try {
          localStorage.setItem("eduflow_logged_in_student", JSON.stringify(studentObj));
        } catch {}
        return studentObj;
      });
    }

    try {
      localStorage.setItem("eduflow_accounts", JSON.stringify(updated));
      localStorage.setItem("eduflow_current_user", JSON.stringify(newAccount));
      localStorage.setItem("eduflow_is_authenticated", "true");
      localStorage.setItem("eduflow_role", newAccount.role);
    } catch {}

    addToast(
      "Account Created",
      `New ${roleChoice} account created successfully! Welcome to EduFlow, ${nameTrim}.`,
      "success"
    );
    return { success: true, user: newAccount };
  };

  // Logout from Portal
  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem("eduflow_is_authenticated", "false");
    } catch {}
    addToast("Logged Out", "You have securely logged out from the portal.", "info");
  };

  // Reset / Forgot Password Helper
  const recoverPassword = (identifierOrEmail) => {
    const q = (identifierOrEmail || "").trim().toLowerCase();
    const found = registeredAccounts.find(
      (a) => a.email?.toLowerCase() === q || a.identifier?.toLowerCase() === q
    );
    if (found) {
      addToast(
        "Password Reminder",
        `Credentials located for ${found.name}: Password is "${found.password}"`,
        "info",
        6000
      );
      return { success: true, password: found.password };
    }
    addToast("Account Not Found", "No registered profile found matching that email or ID.", "error");
    return { success: false };
  };

  return (
    <StudentContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        registeredAccounts,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        registerAccount,
        logout,
        recoverPassword,
        students,
        currentStudent,
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
        theme,
        toggleTheme,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
        activities,
        notifications,
        markAllNotificationsRead,
        clearNotifications,
        assignments,
        pendingAssignments: assignments,
        submitAssignment,
        feeDetails,
        payFee,
        subjectAttendance,
        updateSubjectAttendance,
        studyGroups,
        joinGroup,
        sendGroupChat,
        placements,
        applyToJob,
        grievances,
        submitGrievance,
        counselorBookings,
        bookCounselorSession,
        qrCheckinLogs,
        recordQRCheckin,
        semesterResults: SEMESTER_RESULTS,
        todayClasses: TODAY_CLASSES,
        weeklyTimetable: WEEKLY_TIMETABLE,
        examSchedule: EXAM_SCHEDULE,
        holidaysList: HOLIDAYS_LIST,
        campusNotices: CAMPUS_NOTICES,
        courseMaterials: COURSE_MATERIALS,
        addStudent,
        updateStudent,
        deleteStudent,
        markAttendance,
        resetDemoData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
}
