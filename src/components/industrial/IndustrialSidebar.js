import React from 'react';
import { LayoutDashboard, Star, Users, CheckSquare, Settings, LogOut } from 'lucide-react';

const IndustrialSidebar = ({ activeTab, setActiveTab, handleLogout, companyName }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'interns', label: 'My Interns', icon: <Users size={20} /> },
    { id: 'approvals', label: 'Pending Approvals', icon: <CheckSquare size={20} /> },
    { id: 'evaluate', label: 'Evaluate', icon: <Star size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <div className="logo-icon-box">V</div>
          <div className="brand-text">
            <span>InternTrack</span>
            <small>Industrial Portal</small>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-group">
            <label>{companyName}</label>
            <ul>
              {menuItems.map((item) => (
                <li 
                  key={item.id}
                  className={activeTab === item.id ? 'active' : ''} 
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon} 
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="logout-action-btn" onClick={handleLogout}>
          <LogOut size={18} /> 
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default IndustrialSidebar;