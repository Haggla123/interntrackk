import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import './LogbookViewer.css';

const LogbookViewer = ({ student, onBack }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Mock data representing entries from the Student Dashboard
  const logs = [
    { day: "Monday", date: "Feb 10", task: "Network Configuration", details: "Assisted in configuring Cisco routers for the new wing. Learned about subnetting and VLAN tagging.", status: "Verified" },
    { day: "Tuesday", date: "Feb 11", task: "Server Maintenance", details: "Monitored server uptime and performed routine backups of the database.", status: "Verified" },
    { day: "Wednesday", date: "Feb 12", task: "UI Design", details: "Worked with the dev team to refine the dashboard layout using Figma.", status: "Verified" },
    { day: "Thursday", date: "Feb 13", task: "Client Presentation", details: "Observed the project manager presenting the software update to stakeholders.", status: "Verified" },
    { day: "Friday", date: "Feb 14", task: "Bug Fixing", details: "Debugged the authentication flow in the staging environment.", status: "Pending" },
  ];

  return (
    <div className="logbook-viewer fade-in">
      <div className="viewer-header bento-item">
        <button className="back-link" onClick={onBack}><ChevronLeft size={16}/> Back to Grading</button>
        <div className="student-profile-mini">
          <h2>{student.name}'s Logbook</h2>
          <span className="index-sub">{student.index} • {student.company}</span>
        </div>
      </div>

      <div className="viewer-controls">
        <div className="week-selector">
          <button onClick={() => setSelectedWeek(w => Math.max(1, w - 1))}><ChevronLeft /></button>
          <span>Week {selectedWeek} of {student.weeks}</span>
          <button onClick={() => setSelectedWeek(w => Math.min(student.weeks, w + 1))}><ChevronRight /></button>
        </div>
        <div className="verification-stat">
          <CheckCircle size={16} color="#10b981" /> 80% Industrial Verification Rate
        </div>
      </div>

      <div className="logs-timeline">
        {logs.map((log, index) => (
          <div key={index} className="log-entry-card bento-item">
            <div className="log-date-side">
              <span className="day-name">{log.day}</span>
              <span className="date-val">{log.date}</span>
            </div>
            <div className="log-body">
              <div className="log-title">
                <h4>{log.task}</h4>
                <span className={`status-pill ${log.status.toLowerCase()}`}>{log.status}</span>
              </div>
              <p>{log.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogbookViewer;