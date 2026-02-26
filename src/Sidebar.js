import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ roles, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight the active link based on the current URL
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="side-nav">
      <div className="nav-brand">
        <div className="brand-logo">U</div>
        <span>UIMS Portal</span>
      </div>

      <div className="nav-user">
        <p className="user-welcome">Welcome,</p>
        <p className="user-name">{userName}</p>
      </div>

      <ul className="nav-links">
        {roles.map((item, index) => (
          <li 
            key={index} 
            className={isActive(item.path)} 
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </li>
        ))}
        <li className="nav-logout" onClick={() => navigate('/')}>
          <span className="nav-icon">🚪</span> Logout
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;