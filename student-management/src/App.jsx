import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import Academics from "./pages/Academics";
import Assignments from "./pages/Assignments";
import FeePayment from "./pages/FeePayment";
import AIStudyAssistant from "./pages/AIStudyAssistant";
import CampusLife from "./pages/CampusLife";
import Placements from "./pages/Placements";
import SupportAndWellness from "./pages/SupportAndWellness";
import Login from "./pages/Login";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            {/* Core Home / Personalized Dashboard */}
            <Route index element={<Home />} />

            {/* Portal Authentication & Registration */}
            <Route path="login" element={<Login />} />

            {/* Core & Unique Feature Hubs */}
            <Route path="academics" element={<Academics />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="fees" element={<FeePayment />} />
            <Route path="ai-study" element={<AIStudyAssistant />} />
            <Route path="campus-life" element={<CampusLife />} />
            <Route path="placements" element={<Placements />} />
            <Route path="support" element={<SupportAndWellness />} />

            {/* Existing Directory & Details */}
            <Route path="students" element={<Students />} />
            <Route path="students/:id" element={<StudentDetails />} />
            <Route path="about" element={<About />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
