import React, { useState } from 'react';
import { Menu } from 'lucide-react'; // Ensure Menu icon is imported
import AcademicSidebar from '../components/academic/AcademicSidebar';
import AcademicOverview from '../components/academic/AcademicOverview';
import AssignedStudents from '../components/academic/AssignedStudents'; 
import GradingSection from '../components/academic/GradingSection';
import AcademicSettings from '../components/academic/AcademicSettings'; 
import VisitScheduler from '../components/academic/VisitScheduler';
import LogbookViewer from '../components/academic/LogbookViewer';
import ReportReviewer from '../components/academic/ReportReviewer';
import '../styles/AcademicDashboard.css';

const AcademicDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile state
  const [nextVisit, setNextVisit] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [students, setStudents] = useState([
    { id: 1, name: "Amponsah Peter", index: "UEB3211322", company: "Vodafone Ghana HQ", phone: "+233 24 123 4567", email: "p.amponsah@univ.edu.gh", supervisor: "Mr. Robert Azu", location: "Airport City", progress: 85, indusScore: 9.2, status: "Graded", finalGrade: "A", weeks: 8, lastVisit: "2026-02-10" },
    { id: 2, name: "Shaibu Karim Mustapha", index: "UEB3205122", company: "MTN Ghana", phone: "+233 55 987 6543", email: "k.shaibu@univ.edu.gh", supervisor: "Mrs. Janet Osei", location: "Ridge", progress: 40, indusScore: 7.5, status: "Pending Grading", finalGrade: "-", weeks: 5, lastVisit: "None" },
    { id: 3, name: "Anane Benedicta Ohenewaa", index: "UEB3204122", company: "Bank of Ghana", phone: "+233 20 554 3210", email: "b.anane@univ.edu.gh", supervisor: "Samuel Bekoe", location: "Central Accra", progress: 90, indusScore: 8.8, status: "Pending Grading", finalGrade: "-", weeks: 7, lastVisit: "None" },
    { id: 4, name: "Kyeremaa Helina", index: "UEB3209322", company: "ECG", phone: "+233 20 555 4321", email: "h.kyer@univ.edu.gh", supervisor: "Samuel Bekoe", location: "Makola", progress: 10, indusScore: 5.5, status: "Pending Grading", finalGrade: "-", weeks: 2, lastVisit: "None" },
    { id: 5, name: "Agyei Mensah Haggla", index: "UEB3214522", company: "Newmont Gold", phone: "+233 20 555 1234", email: "h.agyei@univ.edu.gh", supervisor: "Samuel Bekoe", location: "Ahafo", progress: 49, indusScore: 6.8, status: "Pending Grading", finalGrade: "-", weeks: 4, lastVisit: "None" },
  ]);

  // Navigation Helpers with auto-close for mobile
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const openLogbook = (student) => {
    setSelectedStudent(student);
    handleTabChange('view-logbook');
  };

  const openReport = (student) => {
    setSelectedStudent(student);
    handleTabChange('view-report');
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'view-logbook':
        return <LogbookViewer student={selectedStudent} onBack={() => setActiveTab('grading')} />;
      case 'view-report':
        return <ReportReviewer student={selectedStudent} onBack={() => setActiveTab('grading')} />;
      case 'assigned': 
        return <AssignedStudents students={students} />;
      case 'grading': 
        return (
          <GradingSection 
            students={students} 
            setStudents={setStudents} 
            setActiveTab={handleTabChange} 
            onViewLogbook={openLogbook}
            onViewReport={openReport} 
          />
        );
      case 'visits': 
        return <VisitScheduler students={students} setNextVisit={setNextVisit} />;
      case 'settings': 
        return <AcademicSettings handleLogout={() => window.location.href = '/login'} />;
      case 'overview':
      default:
        return (
          <AcademicOverview 
            students={students} 
            nextVisit={nextVisit} 
            setActiveTab={handleTabChange} 
          />
        );
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Background Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <AcademicSidebar 
        activeTab={['view-logbook', 'view-report'].includes(activeTab) ? 'grading' : activeTab} 
        setActiveTab={handleTabChange} 
        handleLogout={() => window.location.href = '/login'}
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="main-area">
        <header className="top-nav">
          <div className="top-nav-left">
            {/* Hamburger Button visible only on mobile via CSS */}
            <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="breadcrumb">
              University / <span className="active-breadcrumb">
                {activeTab === 'view-logbook' && 'LOGBOOK REVIEW'}
                {activeTab === 'view-report' && 'FINAL REPORT REVIEW'}
                {!['view-logbook', 'view-report'].includes(activeTab) && activeTab.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="admin-profile-pill">
              <span>Dr. S.O Frimpong</span>
              <div className="admin-avatar academic">S</div>
          </div>
        </header>
        <section className="page-content">{renderMainContent()}</section>
      </main>
    </div>
  );
};

export default AcademicDashboard;