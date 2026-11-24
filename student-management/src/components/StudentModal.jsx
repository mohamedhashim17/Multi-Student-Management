import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, BookOpen, Calendar, Award, MapPin, Sparkles } from "lucide-react";

const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "AI & Data Science",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
];

const YEARS = ["I Year", "II Year", "III Year", "IV Year"];
const GENDERS = ["Male", "Female", "Other"];
const BLOOD_GROUPS = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"];
const AVATAR_OPTIONS = ["👨‍💻", "👩‍💻", "👨‍🎓", "👩‍🎓", "🧠", "🤖", "⚙️", "🔬", "🚀", "📡", "🏗️", "💡"];

export default function StudentModal({ isOpen, onClose, onSave, studentToEdit = null }) {
  const isEditing = !!studentToEdit;

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: DEPARTMENTS[0],
    year: YEARS[0],
    gender: "Male",
    email: "",
    phone: "",
    dob: "2005-01-01",
    bloodGroup: "O+",
    cgpa: "8.5",
    attendance: "92",
    status: "Active",
    avatar: "👨‍💻",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || "",
        rollNo: studentToEdit.rollNo || "",
        department: studentToEdit.department || DEPARTMENTS[0],
        year: studentToEdit.year || YEARS[0],
        gender: studentToEdit.gender || "Male",
        email: studentToEdit.email || "",
        phone: studentToEdit.phone || "",
        dob: studentToEdit.dob || "2005-01-01",
        bloodGroup: studentToEdit.bloodGroup || "O+",
        cgpa: String(studentToEdit.cgpa ?? "8.5"),
        attendance: String(studentToEdit.attendance ?? "90"),
        status: studentToEdit.status || "Active",
        avatar: studentToEdit.avatar || "👨‍🎓",
        address: studentToEdit.address || "",
      });
      setErrors({});
      setTouched({});
    } else {
      setFormData({
        name: "",
        rollNo: "",
        department: DEPARTMENTS[0],
        year: YEARS[0],
        gender: "Male",
        email: "",
        phone: "",
        dob: "2005-01-01",
        bloodGroup: "O+",
        cgpa: "8.5",
        attendance: "92",
        status: "Active",
        avatar: "👨‍💻",
        address: "",
      });
      setErrors({});
      setTouched({});
    }
  }, [studentToEdit, isOpen]);

  const validate = (data) => {
    const errs = {};

    if (!data.name.trim()) {
      errs.name = "Full name is required";
    } else if (data.name.trim().length < 3) {
      errs.name = "Name must be at least 3 characters";
    }

    if (!data.rollNo.trim()) {
      errs.rollNo = "Roll / Student ID is required";
    }

    if (!data.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!data.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (data.phone.replace(/[^0-9]/g, "").length < 10) {
      errs.phone = "Enter a valid 10-digit phone number";
    }

    const numCgpa = parseFloat(data.cgpa);
    if (isNaN(numCgpa) || numCgpa < 0 || numCgpa > 10) {
      errs.cgpa = "CGPA must be between 0.0 and 10.0";
    }

    const numAtt = parseInt(data.attendance, 10);
    if (isNaN(numAtt) || numAtt < 0 || numAtt > 100) {
      errs.attendance = "Attendance must be between 0 and 100%";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      rollNo: true,
      email: true,
      phone: true,
      cgpa: true,
      attendance: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      onSave({
        ...formData,
        cgpa: parseFloat(formData.cgpa),
        attendance: parseInt(formData.attendance, 10),
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-glass-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div className="modal-title-box">
              <span className="modal-badge-chip">
                {isEditing ? "EDIT RECORD" : "NEW REGISTRATION"}
              </span>
              <h2>{isEditing ? "Edit Student Information" : "Register New Student"}</h2>
              <p className="modal-subtitle">
                {isEditing
                  ? "Update academic and contact credentials"
                  : "Fill out the required academic profile details"}
              </p>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <div className="form-scrollable-body">
              {/* Avatar Selector */}
              <div className="form-group">
                <label className="form-label">Choose Avatar Icon</label>
                <div className="avatar-picker-grid">
                  {AVATAR_OPTIONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`avatar-option-btn ${formData.avatar === icon ? "selected" : ""}`}
                      onClick={() => setFormData((prev) => ({ ...prev, avatar: icon }))}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 1: Name and Roll */}
              <div className="form-row two-cols">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="text-rose">*</span>
                  </label>
                  <div className={`input-wrapper ${errors.name && touched.name ? "has-error" : ""}`}>
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.name && touched.name && (
                    <span className="field-error-text">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Roll No / Student ID <span className="text-rose">*</span>
                  </label>
                  <div className={`input-wrapper ${errors.rollNo && touched.rollNo ? "has-error" : ""}`}>
                    <Award size={16} className="input-icon" />
                    <input
                      type="text"
                      name="rollNo"
                      placeholder="e.g. CS-2024-089"
                      value={formData.rollNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.rollNo && touched.rollNo && (
                    <span className="field-error-text">{errors.rollNo}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Department and Year */}
              <div className="form-row two-cols">
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <div className="select-wrapper">
                    <BookOpen size={16} className="input-icon" />
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Academic Year</label>
                  <div className="select-wrapper">
                    <Calendar size={16} className="input-icon" />
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                    >
                      {YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Email and Phone */}
              <div className="form-row two-cols">
                <div className="form-group">
                  <label className="form-label">
                    Email Address <span className="text-rose">*</span>
                  </label>
                  <div className={`input-wrapper ${errors.email && touched.email ? "has-error" : ""}`}>
                    <Mail size={16} className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <span className="field-error-text">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="text-rose">*</span>
                  </label>
                  <div className={`input-wrapper ${errors.phone && touched.phone ? "has-error" : ""}`}>
                    <Phone size={16} className="input-icon" />
                    <input
                      type="text"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <span className="field-error-text">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Row 4: Gender, Blood Group, CGPA, Attendance */}
              <div className="form-row four-cols">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">CGPA (0-10)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cgpa"
                    placeholder="8.5"
                    value={formData.cgpa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.cgpa && touched.cgpa ? "input-err" : ""}
                  />
                  {errors.cgpa && touched.cgpa && (
                    <span className="field-error-text">{errors.cgpa}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Attendance %</label>
                  <input
                    type="number"
                    name="attendance"
                    placeholder="92"
                    min="0"
                    max="100"
                    value={formData.attendance}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.attendance && touched.attendance ? "input-err" : ""}
                  />
                  {errors.attendance && touched.attendance && (
                    <span className="field-error-text">{errors.attendance}</span>
                  )}
                </div>
              </div>

              {/* Row 5: Address */}
              <div className="form-group">
                <label className="form-label">Campus or Residential Address</label>
                <div className="input-wrapper">
                  <MapPin size={16} className="input-icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Hostel Block, City, State"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary-neon">
                <Sparkles size={16} />
                {isEditing ? "Save Changes" : "Register Student"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
