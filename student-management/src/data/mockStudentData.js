export const LOGGED_IN_STUDENT = {
  id: 1,
  name: "Rahim Basha",
  rollNo: "CS-2024-001",
  department: "Computer Science & Engineering",
  year: "III Year",
  semester: "Semester V",
  section: "CS-A",
  avatar: "👨‍💻",
  cgpa: 8.92,
  email: "rahim.basha@college.edu",
  phone: "+91 98765 43210",
  parentName: "Farooq Basha",
  parentPhone: "+91 98401 55667",
  parentEmail: "farooq.b@gmail.com",
  bloodGroup: "O+",
  dob: "2004-03-14",
  address: "24 Park Avenue, Tech Quarter, Chennai",
  mentor: "Dr. K. Senthil Kumar (HOD - CSE)",
  xp: 1850,
  level: "Level 7 Scholar",
  streak: 18,
  badges: [
    { id: 1, name: "Attendance Hero", icon: "🔥", desc: "Maintained >90% attendance" },
    { id: 2, name: "Assignment Ace", icon: "⭐", desc: "Submitted 10 tasks before deadline" },
    { id: 3, name: "AI Explorer", icon: "🤖", desc: "Completed 15 AI practice quizzes" },
    { id: 4, name: "Peer Mentor", icon: "🤝", desc: "Hosted 3 study group sessions" },
  ],
};

export const TODAY_CLASSES = [
  { id: 1, code: "CS501", subject: "Data Structures & Algorithms", time: "09:00 AM - 10:00 AM", room: "Lab 3 (Ground Floor)", faculty: "Prof. Ananya Roy", status: "Ongoing" },
  { id: 2, code: "CS502", subject: "Operating Systems Internals", time: "10:15 AM - 11:15 AM", room: "Hall B-204", faculty: "Dr. K. Senthil", status: "Upcoming" },
  { id: 3, code: "CS503", subject: "Database Management Systems", time: "11:30 AM - 12:30 PM", room: "Hall B-201", faculty: "Prof. Rajesh V", status: "Upcoming" },
  { id: 4, code: "CS504", subject: "Computer Networks & Security", time: "01:30 PM - 02:30 PM", room: "Hall C-102", faculty: "Dr. Meenakshi", status: "Upcoming" },
  { id: 5, code: "CS505", subject: "Full Stack Web Development Lab", time: "02:45 PM - 04:30 PM", room: "Computer Center 2", faculty: "Prof. Vignesh M", status: "Upcoming" },
];

export const WEEKLY_TIMETABLE = {
  Monday: [
    { subject: "Data Structures & Algorithms", time: "09:00 - 10:00", room: "Lab 3", faculty: "Prof. Ananya" },
    { subject: "Operating Systems", time: "10:15 - 11:15", room: "Hall B-204", faculty: "Dr. Senthil" },
    { subject: "Database Systems", time: "11:30 - 12:30", room: "Hall B-201", faculty: "Prof. Rajesh" },
    { subject: "Web Development Lab", time: "14:00 - 16:30", room: "CC 2", faculty: "Prof. Vignesh" },
  ],
  Tuesday: [
    { subject: "Computer Networks", time: "09:00 - 10:00", room: "Hall C-102", faculty: "Dr. Meenakshi" },
    { subject: "Discrete Mathematics", time: "10:15 - 11:15", room: "Hall A-105", faculty: "Dr. Raman" },
    { subject: "Operating Systems Lab", time: "11:30 - 13:00", room: "Lab 2", faculty: "Dr. Senthil" },
    { subject: "Library / Study Hour", time: "14:00 - 15:30", room: "Central Library", faculty: "Staff" },
  ],
  Wednesday: [
    { subject: "Database Systems", time: "09:00 - 10:00", room: "Hall B-201", faculty: "Prof. Rajesh" },
    { subject: "Data Structures & Algorithms", time: "10:15 - 11:15", room: "Hall B-204", faculty: "Prof. Ananya" },
    { subject: "AI & Machine Learning Elective", time: "11:30 - 12:30", room: "Seminar Hall 1", faculty: "Dr. Swaminathan" },
    { subject: "Aptitude & Soft Skills", time: "14:00 - 15:30", room: "Placement Cell", faculty: "Placement Team" },
  ],
  Thursday: [
    { subject: "Computer Networks", time: "09:00 - 10:00", room: "Hall C-102", faculty: "Dr. Meenakshi" },
    { subject: "Operating Systems", time: "10:15 - 11:15", room: "Hall B-204", faculty: "Dr. Senthil" },
    { subject: "Database Lab", time: "11:30 - 13:00", room: "Lab 4", faculty: "Prof. Rajesh" },
    { subject: "Open Elective / Foreign Language", time: "14:00 - 15:30", room: "Audi B", faculty: "Language Dept" },
  ],
  Friday: [
    { subject: "Discrete Mathematics", time: "09:00 - 10:00", room: "Hall A-105", faculty: "Dr. Raman" },
    { subject: "Data Structures", time: "10:15 - 11:15", room: "Hall B-204", faculty: "Prof. Ananya" },
    { subject: "Mini Project Review", time: "11:30 - 13:00", room: "Project Lab", faculty: "Project Committee" },
    { subject: "Club & Extracurricular Activity", time: "14:00 - 16:00", room: "Student Activity Center", faculty: "Club Leads" },
  ],
};

export const EXAM_SCHEDULE = [
  { code: "CS501", name: "Data Structures & Algorithms", date: "2026-12-08", time: "10:00 AM - 01:00 PM", hall: "Exam Hall A", type: "Semester End Exam" },
  { code: "CS502", name: "Operating Systems Internals", date: "2026-12-11", time: "10:00 AM - 01:00 PM", hall: "Exam Hall B", type: "Semester End Exam" },
  { code: "CS503", name: "Database Management Systems", date: "2026-12-15", time: "10:00 AM - 01:00 PM", hall: "Exam Hall A", type: "Semester End Exam" },
  { code: "CS504", name: "Computer Networks & Security", date: "2026-12-18", time: "10:00 AM - 01:00 PM", hall: "Exam Hall C", type: "Semester End Exam" },
  { code: "CS505", name: "Web Technologies Lab Practical", date: "2026-12-22", time: "09:00 AM - 12:00 PM", hall: "Lab 3", type: "Lab Practical Viva" },
];

export const HOLIDAYS_LIST = [
  { date: "2026-12-25", name: "Christmas Day", days: "1 Day" },
  { date: "2027-01-01", name: "New Year Holiday", days: "1 Day" },
  { date: "2027-01-14", name: "Pongal / Makar Sankranti Harvest Festival", days: "4 Days (Jan 14-17)" },
  { date: "2027-01-26", name: "Republic Day", days: "1 Day" },
];

export const SUBJECT_ATTENDANCE = [
  { code: "CS501", name: "Data Structures & Algorithms", total: 42, attended: 39, faculty: "Prof. Ananya Roy" },
  { code: "CS502", name: "Operating Systems Internals", total: 40, attended: 28, faculty: "Dr. K. Senthil" }, // 70% -> Alert!
  { code: "CS503", name: "Database Management Systems", total: 38, attended: 35, faculty: "Prof. Rajesh V" },
  { code: "CS504", name: "Computer Networks & Security", total: 36, attended: 32, faculty: "Dr. Meenakshi" },
  { code: "MA501", name: "Discrete Mathematics", total: 35, attended: 25, faculty: "Dr. Raman N" }, // 71.4% -> Alert!
  { code: "CS505", name: "Full Stack Web Lab", total: 20, attended: 19, faculty: "Prof. Vignesh M" },
];

export const PENDING_ASSIGNMENTS = [
  {
    id: 1,
    code: "CS501",
    subject: "Data Structures",
    title: "AVL Tree & Red-Black Tree Implementation",
    dueDate: "2026-11-26",
    daysLeft: 3,
    status: "Pending",
    maxMarks: 20,
    submissionFile: null,
    feedback: null,
    grade: null,
    instructions: "Implement insertion, deletion, and rotation routines in C++ or Java with benchmark runtime analysis.",
  },
  {
    id: 2,
    code: "CS502",
    subject: "Operating Systems",
    title: "Process Synchronization & Bankers Algorithm",
    dueDate: "2026-11-28",
    daysLeft: 5,
    status: "Pending",
    maxMarks: 25,
    submissionFile: null,
    feedback: null,
    grade: null,
    instructions: "Simulate resource allocation and deadlock avoidance using Banker's Algorithm with multi-threaded processes.",
  },
  {
    id: 3,
    code: "CS503",
    subject: "Database Systems",
    title: "Hospital Management Schema & 3NF Normalization",
    dueDate: "2026-11-21",
    daysLeft: 0,
    status: "Graded",
    maxMarks: 20,
    submissionFile: "Hospital_DB_Schema_Rahim.pdf",
    feedback: "Excellent ER diagram and BCNF normalization proofs. Well documented SQL constraints.",
    grade: "19 / 20 (Grade O)",
    instructions: "Design relational database schema with functional dependency diagrams and SQL triggers.",
  },
  {
    id: 4,
    code: "CS504",
    subject: "Computer Networks",
    title: "Wireshark Packet Analysis of TCP 3-Way Handshake",
    dueDate: "2026-11-24",
    daysLeft: 1,
    status: "Submitted",
    maxMarks: 20,
    submissionFile: "Wireshark_Lab_CS001.pcapng",
    feedback: "Submission received. Teacher evaluation pending.",
    grade: "Under Review",
    instructions: "Capture and annotate HTTP, DNS, and TCP handshake packets using Wireshark CLI or GUI.",
  },
];

export const FEE_DETAILS = {
  academicYear: "2026 - 2027",
  semester: "Odd Semester (V)",
  totalAnnualFee: 85000,
  paidAmount: 65000,
  dueAmount: 20000,
  dueDate: "2026-12-15",
  status: "Partially Paid",
  breakdown: [
    { item: "Tuition & Academic Training Fee", amount: 48000, paid: 48000, due: 0 },
    { item: "Computing & Specialized AI Lab Fee", amount: 15000, paid: 15000, due: 0 },
    { item: "Central Library & Digital IEEE Access", amount: 4000, paid: 2000, due: 2000 },
    { item: "Semester Examination & Assessment Fee", amount: 6000, paid: 0, due: 6000 },
    { item: "Campus Amenities & High-Speed WiFi", amount: 6000, paid: 0, due: 6000 },
    { item: "Placement Training & Career Guidance", amount: 6000, paid: 0, due: 6000 },
  ],
  transactions: [
    { id: "TXN-8849102", date: "2026-08-10", amount: 45000, mode: "UPI (Google Pay)", ref: "UPI-GPay-983141", status: "Successful", receiptNo: "REC-2026-0810" },
    { id: "TXN-8991204", date: "2026-09-22", amount: 20000, mode: "Debit Card (HDFC)", ref: "CARD-AUTH-6612", status: "Successful", receiptNo: "REC-2026-0922" },
  ],
};

export const CAMPUS_NOTICES = [
  { id: 1, title: "Semester V Model Examination Schedule Announced", category: "Exam", date: "Today, 09:30 AM", urgent: true, body: "Model examinations for 3rd year CSE & IT commence from 1st December. Hall tickets available for download.", target: "Department of CSE" },
  { id: 2, title: "Google Cloud Career Fair & Hackathon Registration", category: "Placements", date: "Yesterday", urgent: false, body: "Registrations are open for the annual Google Cloud Student Symposium. Top 10 teams win pre-placement interviews.", target: "All Departments" },
  { id: 3, title: "Library Digital IEEE Xplore Access Upgraded", category: "Academic", date: "21 Nov 2026", urgent: false, body: "Students can now download unlimited IEEE & ACM research publications using their @college.edu credentials.", target: "Central Library" },
  { id: 4, title: "Campus Coding Club Weekly Algorithmic Sprint", category: "Club", date: "20 Nov 2026", urgent: false, body: "Join the Saturday 2-hour algorithmic sprint on Codeforces. Cash prizes and points for leaderboard toppers.", target: "Coding Club" },
];

export const COURSE_MATERIALS = [
  {
    subject: "Data Structures & Algorithms",
    code: "CS501",
    materials: [
      { id: 101, title: "Unit I: Asymptotic Notations & Master Theorem", type: "PDF Notes", size: "3.4 MB", downloads: 412 },
      { id: 102, title: "Unit II: Balanced Search Trees (AVL, B+ Trees)", type: "PPT Slides", size: "8.1 MB", downloads: 350 },
      { id: 103, title: "Graph Algorithms - Dijkstra & Kruskal Video Lecture", type: "Video", duration: "48 mins", link: "#" },
      { id: 104, title: "University Question Paper (Nov 2025)", type: "PYQ", size: "1.2 MB", downloads: 590 },
      { id: 105, title: "University Question Paper (Apr 2025)", type: "PYQ", size: "1.1 MB", downloads: 480 },
    ],
  },
  {
    subject: "Operating Systems Internals",
    code: "CS502",
    materials: [
      { id: 201, title: "Unit I: OS Structures & System Calls Architecture", type: "PDF Notes", size: "4.2 MB", downloads: 380 },
      { id: 202, title: "Unit II: CPU Scheduling & Multithreading Slides", type: "PPT Slides", size: "6.5 MB", downloads: 290 },
      { id: 203, title: "Memory Virtualization & Paging Deep Dive", type: "Video", duration: "54 mins", link: "#" },
      { id: 204, title: "University Question Paper (Nov 2025)", type: "PYQ", size: "1.4 MB", downloads: 420 },
    ],
  },
  {
    subject: "Database Management Systems",
    code: "CS503",
    materials: [
      { id: 301, title: "Unit I: Relational Algebra & Calculus Notes", type: "PDF Notes", size: "2.9 MB", downloads: 320 },
      { id: 302, title: "Unit III: Transaction ACID Properties & Concurrency", type: "PPT Slides", size: "5.4 MB", downloads: 280 },
      { id: 303, title: "University Question Paper (Apr 2025)", type: "PYQ", size: "1.3 MB", downloads: 390 },
    ],
  },
  {
    subject: "Computer Networks & Security",
    code: "CS504",
    materials: [
      { id: 401, title: "Unit I: OSI 7-Layer & TCP/IP Model Summary", type: "PDF Notes", size: "3.1 MB", downloads: 440 },
      { id: 402, title: "Unit IV: Cryptography, RSA & TLS Handshake", type: "PPT Slides", size: "7.2 MB", downloads: 310 },
      { id: 403, title: "University Question Paper (Nov 2025)", type: "PYQ", size: "1.5 MB", downloads: 510 },
    ],
  },
];

export const STUDY_GROUPS = [
  {
    id: 1,
    name: "LeetCode & DSA Elite Grinders",
    subject: "Algorithms",
    membersCount: 8,
    lead: "Rahim Basha",
    nextSession: "Today at 05:00 PM (Google Meet)",
    description: "Daily solving of medium/hard LeetCode problems, dynamic programming patterns, and mock interviews.",
    sharedNotesCount: 14,
    chat: [
      { sender: "Ayesha", time: "10:14 AM", text: "Has anyone solved today's Daily Question on Graph BFS?" },
      { sender: "Rahim (Lead)", time: "10:18 AM", text: "Yes! Use topological sort with Kahn's algorithm. I uploaded my handwritten notes in the group folder." },
      { sender: "Arun", time: "10:25 AM", text: "Thanks Rahim! Let's review it in our 5 PM call today." },
    ],
  },
  {
    id: 2,
    name: "Operating Systems Kernel Hackers",
    subject: "OS Internals",
    membersCount: 6,
    lead: "Farhan Khan",
    nextSession: "Tomorrow at 04:30 PM (Lab 2)",
    description: "Focusing on xv6 kernel modifications, custom scheduler algorithms, and preparation for Sem V exams.",
    sharedNotesCount: 9,
    chat: [
      { sender: "Farhan", time: "Yesterday", text: "Don't forget to review Banker's algorithm before tomorrow's lab." },
    ],
  },
  {
    id: 3,
    name: "Full Stack MERN & Next.js Builders",
    subject: "Web Development",
    membersCount: 12,
    lead: "Priya Sharma",
    nextSession: "Thursday at 06:00 PM (Discord)",
    description: "Building production-grade React & Node.js capstone applications and contributing to campus open-source.",
    sharedNotesCount: 22,
    chat: [
      { sender: "Priya", time: "09:00 AM", text: "EduFlow project is live! Review the new PR on GitHub." },
    ],
  },
];

export const PLACEMENT_LISTINGS = [
  {
    id: 1,
    company: "Google Cloud India",
    role: "Software Engineering Intern (Summer 2027)",
    location: "Bangalore / Hyderabad",
    package: "₹1,25,000 / month Stipend (PPO: 34 LPA)",
    eligibility: "B.Tech CSE/IT, CGPA >= 8.0, 0 active backlogs",
    deadline: "2026-12-05",
    applied: false,
    tags: ["Product", "C++ / Python", "Distributed Systems"],
  },
  {
    id: 2,
    company: "Microsoft IDC",
    role: "Graduate Software Engineer (FTE)",
    location: "Hyderabad",
    package: "₹28.5 LPA",
    eligibility: "B.Tech CSE/IT/ECE, CGPA >= 7.5",
    deadline: "2026-12-10",
    applied: true,
    status: "Shortlisted for Online Assessment (28 Nov)",
    tags: ["Full-Time", "Azure", "Cloud"],
  },
  {
    id: 3,
    company: "Zoho Corporation",
    role: "Member Technical Staff (Core Backend)",
    location: "Chennai / Tenkasi",
    package: "₹9.5 - ₹14.0 LPA",
    eligibility: "All Engineering Streams, No CGPA cutoff",
    deadline: "2026-11-30",
    applied: true,
    status: "Round 2 Technical Interview Scheduled (Tomorrow)",
    tags: ["Java", "Distributed DB", "Chennai"],
  },
  {
    id: 4,
    company: "Amazon AWS",
    role: "Cloud Support Associate",
    location: "Chennai",
    package: "₹16.0 LPA",
    eligibility: "B.Tech All Branches, Strong Linux & Networking",
    deadline: "2026-12-18",
    applied: false,
    tags: ["Linux", "Networking", "DevOps"],
  },
];

export const MOCK_TESTS = [
  { id: 1, title: "Cognitive Aptitude & Logical Reasoning (TCS NQT Pattern)", questions: 25, duration: "30 mins", score: "88% (Completed)" },
  { id: 2, title: "Data Structures & Algorithms Technical Sprint", questions: 20, duration: "45 mins", score: "Unattempted" },
  { id: 3, title: "Database & SQL Query Proficiency Mock", questions: 15, duration: "25 mins", score: "Unattempted" },
];

export const SEMESTER_RESULTS = [
  {
    semester: "Semester I",
    sgpa: 8.8,
    credits: 22,
    status: "Passed (First Class Distinction)",
    subjects: [
      { code: "MA101", name: "Calculus & Linear Algebra", credits: 4, grade: "A+", marks: 89 },
      { code: "PH101", name: "Engineering Physics", credits: 4, grade: "A", marks: 82 },
      { code: "CS101", name: "Problem Solving in C", credits: 4, grade: "O", marks: 95 },
      { code: "EE101", name: "Basic Electrical & Electronics", credits: 3, grade: "A+", marks: 87 },
      { code: "CS102", name: "C Programming Laboratory", credits: 2, grade: "O", marks: 98 },
    ],
  },
  {
    semester: "Semester II",
    sgpa: 9.1,
    credits: 24,
    status: "Passed (First Class Distinction)",
    subjects: [
      { code: "MA201", name: "Probability & Statistics", credits: 4, grade: "A+", marks: 91 },
      { code: "CS201", name: "Object Oriented Java", credits: 4, grade: "O", marks: 96 },
      { code: "CS202", name: "Digital Logic & Computer Design", credits: 4, grade: "A+", marks: 88 },
      { code: "CS203", name: "Java Programming Laboratory", credits: 2, grade: "O", marks: 99 },
    ],
  },
  {
    semester: "Semester III",
    sgpa: 8.95,
    credits: 23,
    status: "Passed (First Class Distinction)",
    subjects: [
      { code: "CS301", name: "Design & Analysis of Algorithms", credits: 4, grade: "A+", marks: 92 },
      { code: "CS302", name: "Computer Architecture", credits: 4, grade: "A", marks: 84 },
      { code: "CS303", name: "Software Engineering & Agile", credits: 3, grade: "A+", marks: 89 },
    ],
  },
  {
    semester: "Semester IV",
    sgpa: 8.85,
    credits: 24,
    status: "Passed (First Class Distinction)",
    subjects: [
      { code: "CS401", name: "Theory of Computation & Automata", credits: 4, grade: "A", marks: 85 },
      { code: "CS402", name: "Microprocessors & Interfacing", credits: 4, grade: "A+", marks: 90 },
      { code: "CS403", name: "Python for Data Science Lab", credits: 2, grade: "O", marks: 96 },
    ],
  },
];
