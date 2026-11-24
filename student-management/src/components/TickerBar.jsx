import React from "react";
import { useStudentContext } from "../context/StudentContext";

export default function TickerBar() {
  const { students } = useStudentContext();

  const safeStudents = students || [];
  const total = safeStudents.length;
  const avgAtt = total > 0
    ? Math.round(safeStudents.reduce((acc, s) => acc + (s?.attendance || 0), 0) / total)
    : 92;

  const tickerItems = [
    `🎓 TOTAL ENROLLED: ${total} STUDENTS`,
    `⚡ CAMPUS ATTENDANCE: ${avgAtt}%`,
    `🏛️ ACTIVE DEPARTMENTS: 6 MAJORS`,
    `🌟 AVERAGE CGPA: 8.84 / 10.0`,
    `🚀 CAMPUS PLACEMENTS: 98.4% RECORD`,
    `🔬 RESEARCH PAPERS: 142 PUBLISHED`,
    `🏆 NAAC ACCREDITED GRADE A++`,
    `📡 SMART CAMPUS IOT ONLINE`,
  ];

  return (
    <div className="ticker-capsule-wrapper" aria-hidden="true">
      <div className="ticker-track">
        {/* Double array for infinite marquee */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="ticker-item">
            <span className="ticker-slash">//</span>
            <span className="ticker-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
