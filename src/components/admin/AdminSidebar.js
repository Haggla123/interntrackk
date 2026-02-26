import React from 'react';
import { 
  LayoutDashboard, Users, UserCheck, Building2, 
  Settings, LogOut, Link2 
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span>InternTrack</span>
          <small>Admin</small>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-group">
            <label>MAIN</label>
            <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
              <LayoutDashboard size={20} /> Overview
            </li>
            <li className={activeTab === 'assignments' ? 'active' : ''} onClick={() => setActiveTab('assignments')}>
              <Link2 size={20} /> Assignments
            </li>
            <li className={activeTab === 'supervisors' ? 'active' : ''} onClick={() => setActiveTab('supervisors')}>
              <UserCheck size={20} /> Supervisors
            </li>
            <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>
              <Users size={20} /> Students
            </li>
            <li className={activeTab === 'companies' ? 'active' : ''} onClick={() => setActiveTab('companies')}>
              <Building2 size={20} /> Companies
            </li>
          </div>
        </nav>
      </div>

      <div className="sidebar-footer">
        <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
          <Settings size={20} /> Settings
        </li>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;