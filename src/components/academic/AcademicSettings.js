import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff, LogOut, Info, RefreshCcw } from 'lucide-react';

const AcademicSettings = ({ handleLogout }) => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      return setStatus({ type: 'error', msg: 'New passwords do not match.' });
    }
    
    setIsUpdating(true);
    setStatus({ type: '', msg: '' });

    try {
      // BACKEND SYNC LOGIC:
      // const response = await fetch('/api/auth/update-password', {
      //   method: 'POST',
      //   body: JSON.stringify({ current: passwords.current, new: passwords.new })
      // });
      
      // Simulate Database Update
      setTimeout(() => {
        setStatus({ type: 'success', msg: 'Password updated in database successfully!' });
        setPasswords({ current: '', new: '', confirm: '' });
        setIsUpdating(false);
      }, 1500);

    } catch (err) {
      setStatus({ type: 'error', msg: 'Database connection failed.' });
      setIsUpdating(false);
    }
  };

  return (
    <div className="bento-container fade-in">
      {/* 🏛️ HEADER BANNER */}
      <div className="bento-item welcome-box academic-banner">
        <div className="badge-pill">Faculty Security</div>
        <h2>Settings & Privacy</h2>
        <p>Manage your university credentials and active supervisor session.</p>
      </div>

      <div className="settings-layout">
        {/* 🔒 LEFT: PASSWORD FORM */}
        <div className="bento-item security-card">
          <div className="card-header-flex">
            <h3><ShieldCheck size={20} color="#1e1b4b" /> Update Authentication</h3>
          </div>
          
          <form onSubmit={handleUpdate} className="settings-form">
            <div className="form-group">
              <label>Current Faculty Password</label>
              <input 
                type={showPass ? "text" : "password"} 
                className="bento-input"
                placeholder="Enter current password"
                value={passwords.current}
                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>New Password</label>
                <input 
                  type={showPass ? "text" : "password"} 
                  className="bento-input"
                  placeholder="At least 8 characters"
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  type={showPass ? "text" : "password"} 
                  className="bento-input"
                  placeholder="Re-type new password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="settings-actions-row">
              <div className="show-password-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                <span>{showPass ? "Hide" : "Show"} Passwords</span>
              </div>
              
              {status.msg && (
                <div className={`status-pill-small ${status.type}`}>
                  {status.msg}
                </div>
              )}
            </div>

            <button type="submit" className="univ-btn save-btn" disabled={isUpdating}>
              {isUpdating ? <RefreshCcw size={18} className="spin" /> : <Lock size={18} />}
              {isUpdating ? "Updating Database..." : "Update Faculty Credentials"}
            </button>
          </form>
        </div>

        {/* 💡 RIGHT: SECURITY NOTICE */}
        <div className="bento-item info-card notice-card">
          <div className="card-header-flex">
            <h3><Info size={18} color="#1768ac" /> Faculty Guidelines</h3>
          </div>
          <p>Ensuring your supervisor account is protected is vital for data integrity.</p>
          <ul className="guideline-list">
            <li>Passwords are encrypted via <strong>bcrypt</strong> before storage.</li>
            <li>Changing your password will log you out of all other active sessions.</li>
            <li>Use a mix of uppercase, numbers, and symbols.</li>
          </ul>
          
        </div>
      </div>
    </div>
  );
};

export default AcademicSettings;