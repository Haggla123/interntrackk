import React, { useState } from 'react';
import IndustrialSidebar from '../components/industrial/IndustrialSidebar';
import PendingApprovals from '../components/industrial/PendingApprovals';
import MyInterns from '../components/industrial/MyInterns';
import SupervisorSettings from '../components/industrial/SupervisorSettings';
import InternEvaluation from '../components/industrial/InternEvaluation';
import { Clock, Calendar } from 'lucide-react'; 
import '../styles/IndustrialDashboard.css';

const IndustrialDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const companyInfo = { name: "Vodafone Ghana", supervisor: "Mrs. Janet Osei" };
  const academicPartner = { 
    name: "Dr. Robert Smith", 
    email: "r.smith@university.edu.gh",
    siteVisitDate: "March 15, 2026" 
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'interns':
        return <MyInterns />;
      case 'evaluate':
        return <InternEvaluation />;  
      case 'approvals':
        return <PendingApprovals />;
      case 'settings':
        return <SupervisorSettings />;
      case 'overview':
      default:
        return (
          <div className="bento-container fade-in">
            {/* Row 1: Key Management Stats */}
            <div className="bento-row main-stats">
              <div className="bento-item welcome-box hero-gradient">
                <div className="badge-pill">Industrial Portal</div>
                <h1>Welcome back, {companyInfo.supervisor.split(' ')[1]}</h1>
                <p>You have <strong>3 active interns</strong> under your supervision at {companyInfo.name}.</p>
                <div className="hero-actions">
                  <button className="btn-primary-lite">Export Monthly Report</button>
                </div>
              </div>

              {/* URGENT WARNING CARD */}
              <div className="bento-item status-box warning-alert">
                <div className="box-header">
                  <label>Action Required</label>
                  <div className="pulse-dot"></div>
                </div>
                <div className="big-stat urgent-count">04</div>
                <p>Pending Logbook Approvals</p>
                <button className="alert-action-btn" onClick={() => setActiveTab('approvals')}>
                  Review Queue Now →
                </button>
              </div>
            </div>

            {/* Row 2: Performance & Academic Liaison */}
            <div className="bento-grid-3">
              <div className="bento-item info-card">
                <div className="card-top">
                  <label>Average Attendance</label>
                </div>
                <h4>98.2%</h4>
                <div className="mini-progress-track">
                  <div className="mini-bar" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div className="bento-item info-card">
                <label>Top Skill This Week</label>
                <h4>Network Security</h4>
                <p className="sub-text">Applied by 2 interns</p>
              </div>

              {/* ENHANCED ACADEMIC LIAISON BENTO CARD */}
              <div className="bento-item info-card academic-liaison">
                <div className="progress-meta">
                  <label>Academic Partner</label>
                  <Clock size={14} />
                </div>
                <div className="liaison-identity">
                  <h4>{academicPartner.name}</h4>
                  <p>University Liaison</p>
                </div>

                <div className="site-visit-badge">
                  <div className="visit-header">
                    <Calendar size={12} />
                    <span className="visit-label">Next Site Visit</span>
                  </div>
                  <span className="visit-date">{academicPartner.siteVisitDate}</span>
                </div>

                <div className="liaison-footer">
                  <span>{academicPartner.email}</span>
                  <button className="text-link-btn" onClick={() => window.location.href=`mailto:${academicPartner.email}`}>
                    Contact Partner
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-wrapper">
      <IndustrialSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={() => window.location.href = '/login'}
        companyName={companyInfo.name}
      />
      <main className="main-area">
        <header className="top-nav">
          <div className="breadcrumb">
            Industrial / <span className="active-breadcrumb">{activeTab.toUpperCase()}</span>
          </div>
          <div className="top-nav-right">
             <div className="admin-profile-pill">
               <span>{companyInfo.supervisor}</span>
               <div className="admin-avatar">{companyInfo.supervisor.charAt(0)}</div>
             </div>
          </div>
        </header>
        <section className="page-content">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default IndustrialDashboard;