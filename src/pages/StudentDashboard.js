import React, { useState } from 'react';
import { Menu } from 'lucide-react'; 
import StudentSidebar from '../components/student/StudentSidebar';
import LogEntryForm from '../components/student/LogEntryForm';
import LogbookHistory from '../components/student/LogbookHistory';
import LocationStatus from '../components/student/LocationStatus';
import StudentSettings from '../components/student/StudentSettings';
import FinalReport from '../components/student/FinalReport';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVerified, setIsVerified] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const companyLocation = { lat: 5.5545, lon: -0.1902, radius: 100 };
  const studentInfo = {
    name: "Agyei Haggla Mensah",
    indexNumber: "UEB3214522",
    completedWeeks: 6,
    totalWeeks: 6,
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  // Logic to handle sidebar navigation and auto-closing on mobile
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar when a link is clicked
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'final-report':
        return <FinalReport completedWeeks={studentInfo.completedWeeks} />;
      case 'daily-log':
        return (
          <>
            <LocationStatus 
              targetLat={companyLocation.lat} 
              targetLon={companyLocation.lon} 
              radius={companyLocation.radius} 
              onVerificationChange={(val) => setIsVerified(val)}
            />
            <LogEntryForm isLocationVerified={isVerified} />
          </>
        );
      case 'history':
        return <LogbookHistory />;
      case 'settings':
        return <StudentSettings />;
      case 'overview':
      default:
        return (
          <div className="bento-container fade-in">
            <div className="bento-row main-stats">
              <div className="bento-item welcome-box">
                <div className="badge-pill">Academic Year 2025/2026</div>
                <h1>Good morning, {studentInfo.name.split(' ')[1]}</h1>
                <p>You have completed <strong>{studentInfo.completedWeeks} weeks</strong> of your internship.</p>
                <div className="bento-actions">
                  <button className="btn-primary-lite" onClick={() => setActiveTab('daily-log')}>Log Today's Work</button>
                </div>
              </div>

              <div className="bento-item progress-box">
                <div className="box-header">
                  <label>Program Completion</label>
                  <span className="percentage-text">{Math.round((studentInfo.completedWeeks / studentInfo.totalWeeks) * 100)}%</span>
                </div>
                <div className="linear-progress-track">
                  <div 
                    className="linear-progress-bar" 
                    style={{ width: `${(studentInfo.completedWeeks / studentInfo.totalWeeks) * 100}%` }}
                  ></div>
                </div>
                <div className="progress-footer">
                  <span>Week {studentInfo.completedWeeks}</span>
                  <span>{studentInfo.totalWeeks} Weeks Total</span>
                </div>
              </div>
            </div>

            <div className="bento-grid-3">
              <div className="bento-item info-card">
                <label>Host Organization</label>
                <h4>Catholic University of Ghana</h4>
                <p>ICT Directorate</p>
              </div>
              <div className="bento-item info-card">
                <label>Industry Supervisor</label>
                <h4>Mr. Atta Sarpong Charmant</h4>
                <span className="status-indicator online">Online</span>
              </div>
              <div className="bento-item info-card">
                <label>Academic Supervisor</label>
                <h4>Dr. S.O Frimpong</h4>
                <p>ITDS</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-wrapper">
      {/* 1. DARK OVERLAY: Only visible when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* 2. SIDEBAR: receives the toggle state */}
      <StudentSidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        handleLogout={handleLogout}
        studentName={studentInfo.name}
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} // Pass this to handle the "X" button
      />

      <main className="main-area">
        <header className="top-nav">
          <div className="top-nav-left">
            {/* 3. HAMBURGER BUTTON: Only visible on mobile CSS */}
            <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="breadcrumb">Student / {activeTab.replace('-', ' ').toUpperCase()}</div>
          </div>
          <div className="top-nav-right">
            <div className="admin-profile-pill">
              <span>{studentInfo.name}</span>
              <div className="admin-avatar">{studentInfo.name.charAt(0)}</div>
            </div>
          </div>
        </header>
        <section className="page-content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default StudentDashboard;