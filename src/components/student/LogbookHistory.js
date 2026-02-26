import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, CheckCircle2, Tag, MapPin } from 'lucide-react';

const LogbookHistory = () => {
  const [openWeek, setOpenWeek] = useState(null);

  // Grouped Data: This will eventually be calculated from your MongoDB dates
  const weeklyLogs = [
    {
      week: 4,
      startDate: "Feb 23",
      endDate: "Feb 27",
      days: [
        { id: 101, day: "Monday", date: "Feb 23", activity: "MERN Stack Auth implementation.", skills: "JWT, Node.js", status: "Approved" },
        { id: 102, day: "Tuesday", date: "Feb 24", activity: "Database schema optimization for logs.", skills: "MongoDB", status: "Pending" },
      ]
    },
    {
      week: 3,
      startDate: "Feb 16",
      endDate: "Feb 20",
      days: [
        { id: 95, day: "Monday", date: "Feb 16", activity: "Frontend routing setup.", skills: "React Router", status: "Approved" },
      ]
    }
  ];

  const toggleWeek = (weekNum) => {
    setOpenWeek(openWeek === weekNum ? null : weekNum);
  };

  return (
    <div className="history-container fade-in">
      <div className="bento-item history-header">
         <h3>Logbook Archive</h3>
         <p>Click a week to review your daily submissions.</p>
      </div>

      <div className="weeks-list">
        {weeklyLogs.map((weekData) => (
          <div key={weekData.week} className="week-group">
            {/* WEEK HEADER */}
            <div 
              className={`bento-item week-header-btn ${openWeek === weekData.week ? 'active' : ''}`}
              onClick={() => toggleWeek(weekData.week)}
            >
              <div className="week-info">
                <div className="week-number">Week {weekData.week}</div>
                <div className="week-date-range">{weekData.startDate} — {weekData.endDate}</div>
              </div>
              <div className="week-meta">
                <span className="count-pill">{weekData.days.length} entries</span>
                {openWeek === weekData.week ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>

            {/* COLLAPSIBLE CONTENT */}
            {openWeek === weekData.week && (
              <div className="daily-logs-dropdown animated-fade-in">
                {weekData.days.map((day) => (
                  <div key={day.id} className="bento-item daily-item">
                    <div className="daily-header">
                      <strong>{day.day}, {day.date}</strong>
                      <span className={`status-pill-lite ${day.status.toLowerCase()}`}>{day.status}</span>
                    </div>
                    <p className="daily-text">{day.activity}</p>
                    <div className="daily-footer">
                      <Tag size={12} /> <span>{day.skills}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogbookHistory;