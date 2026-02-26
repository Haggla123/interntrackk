import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import { 
  LayoutDashboard, Users, UserCheck, Building2, 
  Settings, LogOut, Bell, Search, PlusCircle, Link2, FileDown 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => navigate('/login');

  // Mock Data
  const supervisors = [
    { id: 1, name: "Dr. Robert Smith", role: "Academic", org: "Computer Science", students: 12 },
    { id: 2, name: "Mrs. Janet Osei", role: "Industrial", org: "Vodafone Ghana", students: 3 }
  ];

  const students = [
    { id: 1, index: "2201093", name: "Kwame Mensah", company: "Vodafone", supervisor: "Dr. Smith" },
    { id: 2, index: "2201095", name: "Abena Selorm", company: "MTN", supervisor: "Dr. Smith" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'supervisors':
        const filteredSups = supervisors.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return (
          <div className="content-card fade-in">
            <div className="card-header-actions">
              <div className="search-inline">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search supervisors..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="action-group">
                <button className="secondary-btn"><FileDown size={18}/> Import Excel</button>
                <button className="primary-btn"><PlusCircle size={18}/> New Supervisor</button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Role</th><th>Dept / Company</th><th>Interns</th></tr>
              </thead>
              <tbody>
                {filteredSups.map(s => (
                  <tr key={s.id}><td><strong>{s.name}</strong></td><td>{s.role}</td><td>{s.org}</td><td>{s.students}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'students':
        const filteredStudents = students.filter(s => 
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.index.includes(searchTerm)
        );
        return (
          <div className="content-card fade-in">
            <div className="card-header-actions">
              <div className="search-inline">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search Index or Name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="action-group">
                <button className="secondary-btn"><FileDown size={18}/> Import Excel</button>
                <button className="primary-btn"><PlusCircle size={18}/> New Student</button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Index</th><th>Student Name</th><th>Company</th><th>Supervisor</th></tr>
              </thead>
              <tbody>
                {filteredStudents.map(s => (
                  <tr key={s.id}><td>{s.index}</td><td><strong>{s.name}</strong></td><td>{s.company}</td><td>{s.supervisor}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'assignments':
        return (
          <div className="content-card fade-in">
            <h3>Placement & Supervision Assignments</h3>
            <div className="assignment-form-grid">
              <div className="form-section"><label>Student</label><select className="admin-input"><option>Select...</option></select></div>
             <div className="form-section"><label>Supervisor</label><select className="admin-input"><option>Select...</option></select></div>
              <div className="form-section"><label>Company</label><select className="admin-input"><option>Select...</option></select></div>
              <button className="primary-btn full-width"><Link2 size={18}/> Confirm Assignment</button>
            </div>
          </div>
        );

      case 'overview':
      default:
        return (
          <div className="overview-grid fade-in">
            <div className="stat-card"><h5>Total Students</h5><p>1,240</p></div>
            <div className="stat-card"><h5>Active Firms</h5><p>120</p></div>
            <div className="stat-card alert"><h5>Fraud Alerts</h5><p>5</p></div>
          </div>
        );



       case 'settings':
  return (
    <div className="content-card fade-in">
      <div className="settings-container">
        <div className="settings-section">
          <h4>🛰️ Geofence & Security</h4>
          <div className="setting-control">
            <div className="setting-info">
              <label>Geofence Radius (Meters)</label>
              <p>The maximum distance allowed from company coordinates.</p>
            </div>
            <input type="number" defaultValue="100" className="admin-input-small" />
          </div>
          <div className="setting-control">
            <div className="setting-info">
              <label>Strict Time Window</label>
              <p>Only allow check-ins between 07:00 and 10:00 GMT.</p>
            </div>
            <input type="checkbox" className="toggle-switch" defaultChecked />
          </div>
        </div>

        <div className="settings-section">
          <h4>📅 Internship Parameters</h4>
          <div className="setting-control">
            <div className="setting-info">
              <label>Requirement Duration</label>
              <p>Number of weeks required to fulfill internship.</p>
            </div>
            <select className="admin-input-small">
              <option>6 Weeks</option>
              <option>8 Weeks</option>
              <option>12 Weeks</option>
            </select>
          </div>
        </div>

        <div className="settings-section danger-zone">
          <h4>⚠️ Danger Zone</h4>
          <p>Actions here are permanent and affect the entire database.</p>
          <div className="action-group">
            <button className="secondary-btn">Archive Current Year</button>
            <button className="logout-btn" style={{margin: 0}}>Wipe All Mock Data</button>
          </div>
        </div>
        
        <button className="primary-btn" style={{marginTop: '20px', width: '200px'}}>Save All Changes</button>
      </div>
    </div>
  );
    }
  };

  return (
    <div className="admin-wrapper">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand"><span>InternTrack Admin</span></div>
          <nav className="sidebar-nav">
            <div className="nav-group">
              <label>MAIN</label>
              <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => {setActiveTab('overview'); setSearchTerm("");}}>
                <LayoutDashboard size={20} /> Overview
              </li>
              <li className={activeTab === 'assignments' ? 'active' : ''} onClick={() => {setActiveTab('assignments'); setSearchTerm("");}}>
                <Link2 size={20} /> Assignments
              </li>
              <li className={activeTab === 'supervisors' ? 'active' : ''} onClick={() => {setActiveTab('supervisors'); setSearchTerm("");}}>
                <UserCheck size={20} /> Supervisors
              </li>
              <li className={activeTab === 'students' ? 'active' : ''} onClick={() => {setActiveTab('students'); setSearchTerm("");}}>
                <Users size={20} /> Students
              </li>
              <li className={activeTab === 'companies' ? 'active' : ''} onClick={() => {setActiveTab('companies'); setSearchTerm("");}}>
                <Building2 size={20} /> Companies
              </li>
              <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => {setActiveTab('settings'); setSearchTerm("");}}>
            <Settings size={20} /> Settings
          </li>
          <button className="logout-btn" onClick={handleLogout}><LogOut size={20} /> Logout</button>
        
            </div>
          </nav>
        </div>
      
      </aside>

      <main className="main-area">
        <header className="top-nav">
          <div className="breadcrumb">Dashboard / {activeTab.toUpperCase()}</div>
          <div className="top-nav-right">
            <Bell size={20} />
            <div className="admin-avatar">AD</div>
          </div>
        </header>
        <section className="page-content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard; 