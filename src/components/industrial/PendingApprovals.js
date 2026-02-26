import React from 'react';
import { Check, X, MapPin, Award, Clock, Calendar } from 'lucide-react';

const PendingApprovals = () => {
  // Mock data for the review queue
  const pendingLogs = [
    { 
      id: 1, 
      studentName: "Kwame Mensah", 
      index: "2201093",
      date: "Monday, Feb 23, 2026", 
      activity: "Implemented the authentication middleware using JWT and handled password hashing with Bcrypt. Successfully tested login routes via Postman.",
      skills: "Node.js, JWT, Backend Security",
      location: "Verified: Office HQ"
    }
  ];

  return (
    <div className="bento-container fade-in">
      <div className="bento-item welcome-box">
        <div className="badge-pill">Verification Queue</div>
        <h3>Pending Logbook Entries</h3>
        <p>Review and verify the daily activities and skills reported by your interns.</p>
      </div>

      <div className="approval-stack">
        {pendingLogs.map(log => (
          <div key={log.id} className="bento-item review-card-bento">
            {/* Column 1: Student & Status */}
            <div className="review-meta-sidebar">
              <div className="student-profile-mini">
                <div className="admin-avatar">{log.studentName.charAt(0)}</div>
                <div>
                  <strong>{log.studentName}</strong>
                  <p className="sub-text">{log.date}</p>
                </div>
              </div>
              <div className="meta-tag verified">
                <MapPin size={12} /> {log.locationStatus}
              </div>
            </div>

            {/* Column 2: Log Content */}
            <div className="review-content-main">
              <div className="content-label">Activity Description</div>
              <p className="activity-text">"{log.content}"</p>
              <div className="skills-row">
                <Award size={14} className="text-indigo" />
                <span className="skill-pill-lite">Technical Competency Verified</span>
              </div>
            </div>

            {/* Column 3: Actions */}
            <div className="review-actions-zone">
              <button className="btn-approve-full">
                <Check size={18} /> Approve
              </button>
              <button className="logout-action-btn" style={{marginTop: '0'}}>
                <X size={16} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApprovals;