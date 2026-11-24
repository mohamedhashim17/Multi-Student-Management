import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UserPlus,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  IdCard,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Sparkles,
  RotateCcw,
  Eye,
  CalendarCheck,
  Check,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";
import StudentModal from "../components/StudentModal";
import ConfirmModal from "../components/ConfirmModal";
import IDCardModal from "../components/IDCardModal";

export default function Students() {
  const {
    students,
    role,
    setRole,
    searchQuery,
    setSearchQuery,
    addStudent,
    updateStudent,
    deleteStudent,
    markAttendance,
    addToast,
  } = useStudentContext();

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    const labels = {
      student: "Student Portal (Rahim Basha)",
      parent: "Parent Monitoring View (Farooq Basha)",
      faculty: "Faculty & Academic Admin Console (Dr. K. Senthil Kumar)",
    };
    if (addToast) {
      addToast("Portal Changed", `Switched to ${labels[newRole]}`, "success");
    }
  };

  // Filters
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [sortBy, setSortBy] = useState("name"); // 'name' | 'attendance' | 'cgpa' | 'roll'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentForID, setStudentForID] = useState(null);

  const safeStudents = students || [];

  // Departments list
  const departments = useMemo(() => {
    const set = new Set(safeStudents.map((s) => s?.department).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [safeStudents]);

  const years = ["All", "I Year", "II Year", "III Year", "IV Year"];

  // Filtering & Sorting
  const filteredStudents = useMemo(() => {
    return safeStudents
      .filter((student) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          student.name?.toLowerCase().includes(query) ||
          student.rollNo?.toLowerCase().includes(query) ||
          student.email?.toLowerCase().includes(query) ||
          student.department?.toLowerCase().includes(query);

        const matchesDept = selectedDept === "All" || student.department === selectedDept;
        const matchesYear = selectedYear === "All" || student.year === selectedYear;
        const matchesGender = selectedGender === "All" || student.gender === selectedGender;

        return matchesSearch && matchesDept && matchesYear && matchesGender;
      })
      .sort((a, b) => {
        if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
        if (sortBy === "attendance") return (b.attendance || 0) - (a.attendance || 0);
        if (sortBy === "cgpa") return (b.cgpa || 0) - (a.cgpa || 0);
        if (sortBy === "roll") return (a.rollNo || "").localeCompare(b.rollNo || "");
        return 0;
      });
  }, [students, searchQuery, selectedDept, selectedYear, selectedGender, sortBy]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage]);

  // Reset page when filter changes
  const handleFilterChange = (setter, val) => {
    setter(val);
    setCurrentPage(1);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (filteredStudents.length === 0) {
      addToast("Export Failed", "No student records to export.", "error");
      return;
    }

    const headers = [
      "ID",
      "Roll No",
      "Full Name",
      "Department",
      "Year",
      "Gender",
      "Email",
      "Phone",
      "CGPA",
      "Attendance %",
      "Status",
      "Blood Group",
      "Address",
    ];

    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.rollNo || ""}"`,
      `"${s.name || ""}"`,
      `"${s.department || ""}"`,
      `"${s.year || ""}"`,
      `"${s.gender || ""}"`,
      `"${s.email || ""}"`,
      `"${s.phone || ""}"`,
      s.cgpa || 0,
      s.attendance || 0,
      `"${s.status || "Active"}"`,
      `"${s.bloodGroup || ""}"`,
      `"${(s.address || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EduFlow_Students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast("Export Successful", `Exported ${filteredStudents.length} records to CSV!`, "success");
  };

  return (
    <motion.div
      className="students-page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Role Switcher Indicator Banner */}
      <div className="role-switcher-banner mb-16">
        <div className="flex-center gap-10">
          <span className="text-xs font-bold text-muted">VIEWING MODE:</span>
          <div className="role-pills-row">
            <button
              className={`role-pill-btn ${role === "student" ? "active" : ""}`}
              onClick={() => handleRoleSwitch("student")}
            >
              🎓 Student Portal
            </button>
            <button
              className={`role-pill-btn ${role === "parent" ? "active" : ""}`}
              onClick={() => handleRoleSwitch("parent")}
            >
              👨‍👩‍👦 Parent View
            </button>
            <button
              className={`role-pill-btn ${role === "faculty" ? "active" : ""}`}
              onClick={() => handleRoleSwitch("faculty")}
            >
              👨‍🏫 Faculty View
            </button>
          </div>
        </div>

        <div className="flex-center gap-10">
          <span className="text-xs text-emerald font-mono">
            {role === "parent"
              ? "👨‍👩‍👦 Parent Monitoring Mode (Read-Only)"
              : role === "faculty"
              ? "👨‍🏫 Faculty Administrator Mode (Full Access)"
              : "🎓 Student Directory Mode"}
          </span>
          {role === "parent" && (
            <Link to="/" className="btn-secondary text-xs py-1 px-3">
              Go to Parent Dashboard →
            </Link>
          )}
        </div>
      </div>

      {/* Top Header Banner */}
      <div className="page-header-card">
        <div className="header-text-col">
          <div className="flex-center gap-8">
            <span className="section-pill">DATABASE DIRECTORY</span>
            <span className="badge-pill-cyan">{filteredStudents.length} Records</span>
          </div>
          <h1 className="page-main-heading">
            Student Management <span className="text-glow-emerald">Hub</span>
          </h1>
          <p className="page-subtext">
            Search, filter, update credentials, preview ID cards, and record live attendance.
          </p>
        </div>

        <div className="header-action-group">
          <button className="btn-secondary" onClick={exportToCSV}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>

          <button
            className="btn-primary-neon"
            onClick={() => {
              setStudentToEdit(null);
              setIsAddModalOpen(true);
            }}
          >
            <UserPlus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="filter-toolbar-card">
        {/* Search Input */}
        <div className="toolbar-search-box">
          <Search size={18} className="search-icon-dim" />
          <input
            type="text"
            placeholder="Search by name, roll no, department, or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchQuery && (
            <button
              className="search-reset-btn"
              onClick={() => setSearchQuery("")}
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="toolbar-filters-row">
          {/* Department Filter */}
          <div className="filter-select-group">
            <span className="filter-label">Dept:</span>
            <select
              value={selectedDept}
              onChange={(e) => handleFilterChange(setSelectedDept, e.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="filter-select-group">
            <span className="filter-label">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => handleFilterChange(setSelectedYear, e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="filter-select-group">
            <span className="filter-label">Gender:</span>
            <select
              value={selectedGender}
              onChange={(e) => handleFilterChange(setSelectedGender, e.target.value)}
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-select-group">
            <span className="filter-label">Sort:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name (A-Z)</option>
              <option value="attendance">Highest Attendance</option>
              <option value="cgpa">Top CGPA</option>
              <option value="roll">Roll Number</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="view-toggle-group">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`view-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
              aria-label="Table View"
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Student List View */}
      {paginatedStudents.length === 0 ? (
        <div className="empty-results-card">
          <div className="empty-icon-wrap">🔍</div>
          <h3>No Student Records Found</h3>
          <p>
            No student matches your current filter criteria or search keyword "
            {searchQuery}".
          </p>
          <button
            className="btn-secondary mt-12"
            onClick={() => {
              setSearchQuery("");
              setSelectedDept("All");
              setSelectedYear("All");
              setSelectedGender("All");
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID CARDS VIEW */
        <div className="student-cards-grid">
          {paginatedStudents.map((student, index) => {
            const att = student.attendance || 0;
            const attColor =
              att >= 90 ? "text-emerald" : att >= 75 ? "text-amber" : "text-rose";
            const attBg =
              att >= 90
                ? "badge-pill-emerald"
                : att >= 75
                ? "badge-pill-amber"
                : "badge-pill-rose";

            return (
              <motion.div
                key={student.id}
                className="student-glass-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {/* Card Top Row */}
                <div className="student-card-header">
                  <div className="student-avatar-halo">
                    <span className="student-avatar-text">
                      {student.avatar || "👨‍🎓"}
                    </span>
                  </div>

                  <div className="student-header-meta">
                    <span className="student-roll-tag">{student.rollNo}</span>
                    <span className={`student-att-tag ${attBg}`}>
                      {att}% Att.
                    </span>
                  </div>
                </div>

                {/* Card Main Info */}
                <div className="student-card-body">
                  <h3 className="student-full-name">{student.name}</h3>
                  <p className="student-department-name">{student.department}</p>
                  <div className="student-academic-pills">
                    <span className="pill-year">{student.year}</span>
                    <span className="pill-cgpa">CGPA: {student.cgpa}</span>
                    <span className="pill-gender">{student.gender}</span>
                  </div>
                  <p className="student-email-row">{student.email}</p>
                </div>

                {/* Quick Attendance Tracker on Card */}
                <div className="card-quick-attendance">
                  <span className="quick-att-label">Today's Mark:</span>
                  <div className="quick-att-buttons">
                    <button
                      className="quick-mark-btn present"
                      onClick={() => markAttendance(student.id, "Present")}
                      title="Mark Present"
                    >
                      <Check size={13} /> Present
                    </button>
                    <button
                      className="quick-mark-btn absent"
                      onClick={() => markAttendance(student.id, "Absent")}
                      title="Mark Absent"
                    >
                      <XCircle size={13} /> Absent
                    </button>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="student-card-actions">
                  <Link
                    to={`/students/${student.id}`}
                    className="card-action-btn view-btn-neon"
                    title="View Profile Details"
                  >
                    <Eye size={15} />
                    <span>Profile</span>
                  </Link>

                  <button
                    className="card-action-btn"
                    onClick={() => setStudentForID(student)}
                    title="Preview ID Card"
                  >
                    <IdCard size={15} />
                  </button>

                  <button
                    className="card-action-btn"
                    onClick={() => {
                      setStudentToEdit(student);
                      setIsAddModalOpen(true);
                    }}
                    title="Edit Information"
                  >
                    <Edit size={15} />
                  </button>

                  <button
                    className="card-action-btn danger-hover"
                    onClick={() => setStudentToDelete(student)}
                    title="Delete Student"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="table-responsive-wrapper">
          <table className="student-glass-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Year</th>
                <th>CGPA</th>
                <th>Attendance</th>
                <th>Quick Attendance</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => {
                const att = student.attendance || 0;
                const attClass =
                  att >= 90 ? "text-emerald" : att >= 75 ? "text-amber" : "text-rose";

                return (
                  <tr key={student.id}>
                    <td>
                      <div className="table-student-cell">
                        <span className="table-avatar">{student.avatar || "👨‍🎓"}</span>
                        <div>
                          <div className="table-student-name">{student.name}</div>
                          <div className="table-student-email">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="table-roll">{student.rollNo}</span>
                    </td>
                    <td>{student.department}</td>
                    <td>
                      <span className="badge-year-sm">{student.year}</span>
                    </td>
                    <td>
                      <strong>{student.cgpa}</strong>
                    </td>
                    <td>
                      <span className={`font-semibold ${attClass}`}>{att}%</span>
                    </td>
                    <td>
                      <div className="table-att-actions">
                        <button
                          className="table-att-btn present"
                          onClick={() => markAttendance(student.id, "Present")}
                          title="Present"
                        >
                          P
                        </button>
                        <button
                          className="table-att-btn absent"
                          onClick={() => markAttendance(student.id, "Absent")}
                          title="Absent"
                        >
                          A
                        </button>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="table-action-row">
                        <Link
                          to={`/students/${student.id}`}
                          className="icon-action-btn"
                          title="View Profile"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          className="icon-action-btn"
                          onClick={() => setStudentForID(student)}
                          title="Preview ID Card"
                        >
                          <IdCard size={15} />
                        </button>
                        <button
                          className="icon-action-btn"
                          onClick={() => {
                            setStudentToEdit(student);
                            setIsAddModalOpen(true);
                          }}
                          title="Edit"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          className="icon-action-btn danger"
                          onClick={() => setStudentToDelete(student)}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredStudents.length > 0 && (
        <div className="pagination-bar">
          <div className="pagination-info">
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredStudents.length)}
            </strong>{" "}
            of <strong>{filteredStudents.length}</strong> students
          </div>

          <div className="pagination-buttons">
            <button
              className="page-nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-num-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="page-nav-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setStudentToEdit(null);
        }}
        onSave={(data) => {
          if (studentToEdit) {
            updateStudent(studentToEdit.id, data);
          } else {
            addStudent(data);
          }
        }}
        studentToEdit={studentToEdit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={() => {
          if (studentToDelete) {
            deleteStudent(studentToDelete.id);
            setStudentToDelete(null);
          }
        }}
        studentName={studentToDelete?.name}
      />

      {/* ID Card Preview Modal */}
      <IDCardModal
        isOpen={!!studentForID}
        onClose={() => setStudentForID(null)}
        student={studentForID}
      />
    </motion.div>
  );
}
