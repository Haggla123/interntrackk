import React from 'react';
import { LayoutDashboard, FileText, BookOpen, History, Settings, LogOut, X } from 'lucide-react';

const StudentSidebar = ({ activeTab, setActiveTab, handleLogout, studentName, isSidebarOpen, setIsSidebarOpen }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'daily-log', label: 'Daily Log', icon: <BookOpen size={20} /> },
    { id: 'history', label: 'Logbook History', icon: <History size={20} /> },
    { id: 'final-report', label: 'Final Report', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-top">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span>InternTrack</span>
          </div>
          
          {/* FIXED: This button now explicitly closes the sidebar */}
          <button className="mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <label>MAIN MENU</label>
            {menuItems.map(item => (
              <li 
                key={item.id}
                className={activeTab === item.id ? 'active' : ''} 
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false); // Auto-close when a menu item is clicked
                }}
              >
                {item.icon} {item.label}
              </li>
            ))}
          </div>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-info-sidebar">
          <div className="user-avatar-small">{studentName ? studentName.charAt(0) : 'U'}</div>
          <div className="user-details-small">
            <span className="user-name-small">{studentName}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;