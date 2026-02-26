import React from 'react';
import { 
  Calendar, CheckCircle, BellRing, Users, 
  Activity, MapPin, ChevronRight, ClipboardCheck, Clock 
} from 'lucide-react';

const AcademicOverview = ({ students, setActiveTab, nextVisit }) => {
  // Sync logic: Only show students whose status is "Pending Grading"
  const pendingGradingStudents = students.filter(s => s.status === "Pending Grading");
  
  const totalStudents = students.length;
  const avgProgress = totalStudents > 0 
    ? Math.round(students.reduce((acc, s) => acc + s.progress, 0) / totalStudents) 
    : 0;

  return (
    <div className="bento-container fade-in">
      
      {/* 🔔 ROW 1: PROFESSIONAL VISIT ALERT HERO */}
      <div className="bento-row">
        {nextVisit ? (
          <div className="bento-item visit-alert-hero academic-theme">
            <div className="alert-content-left">
              <div className="pulse-container">
                <BellRing size={24} className="bell-pulse" />
              </div>
              <div className="alert-details">
                <span className="alert-badge">Upcoming Site Visit</span>
                <h2>{nextVisit.student}</h2>
                <div className="alert-meta">
                  <span className="meta-item"><Calendar size={14} /> {nextVisit.date}</span>
                  <span className="meta-item"><Clock size={14} /> {nextVisit.time}</span>
                  <span className="meta-item"><MapPin size={14} /> {nextVisit.company} ({nextVisit.location})</span>
                </div>
              </div>
            </div>
            <button className="alert-action-btn" onClick={() => setActiveTab('visits')}>
              View Schedule <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          /* Empty State: Visible with dashed border via the 'empty' class */
          <div className="bento-item visit-alert-hero empty">
             <div className="alert-details">
                <span className="alert-badge gray">Schedule Status</span>
                <h2>No Site Visits Scheduled</h2>
                <p>Use the <strong>Site Visits</strong> tab to coordinate your next industrial assessment.</p>
                <button className="alert-action-btn secondary" onClick={() => setActiveTab('visits')}>
                  Go to Scheduler <ChevronRight size={16} />
                </button>
             </div>
          </div>
        )}
      </div>

      {/* 📊 ROW 2: ANALYTICS CARDS */}
      <div className="bento-grid-3">
        <div className="bento-item stat-card">
          <div className="stat-icon-box blue"><Users size={20} /></div>
          <div className="stat-info">
            <label>Total Interns</label>
            <h3>{totalStudents.toString().padStart(2, '0')}</h3>
          </div>
        </div>

        <div className="bento-item stat-card">
          <div className="stat-icon-box purple"><ClipboardCheck size={20} /></div>
          <div className="stat-info">
            <label>Pending Grading</label>
            <h3>{pendingGradingStudents.length.toString().padStart(2, '0')}</h3>
          </div>
        </div>

        <div className="bento-item stat-card">
          <div className="stat-icon-box green"><Activity size={20} /></div>
          <div className="stat-info">
            <label>Avg. Completion</label>
            <h3>{avgProgress}%</h3>
          </div>
        </div>
      </div>

      {/* 📋 ROW 3: PRIORITY ASSESSMENT QUEUE */}
      <div className="bento-item student-activity-card">
        <div className="card-header-flex">
          <div className="title-stack">
            <h3>Priority Assessment Queue</h3>
            <p className="sub-text">Only displaying students awaiting final faculty grading</p>
          </div>
          <button className="text-btn" onClick={() => setActiveTab('grading')}>
            Go to Grading Center <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="overview-table-wrapper">
          <table className="overview-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Placement</th>
                <th>Progress</th>
                <th>Action Required</th>
              </tr>
            </thead>
            <tbody>
              {pendingGradingStudents.length > 0 ? (
                pendingGradingStudents.map(s => (
                  <tr key={s.id} onClick={() => setActiveTab('grading')}>
                    <td>
                      <div className="name-stack">
                        <strong>{s.name}</strong>
                        <span className="index-sub">{s.index}</span>
                      </div>
                    </td>
                    <td>{s.company}</td>
                    <td>
                      <div className="mini-progress-container">
                        <div className="mini-progress">
                          <div className="fill" style={{width: `${s.progress}%`}}></div>
                        </div>
                        <span className="prog-text">{s.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="pill pending-grading">
                        Pending Grading
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-table-msg">
                    <CheckCircle size={18} color="#10b981" /> 
                    All student assessments are currently up to date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademicOverview;