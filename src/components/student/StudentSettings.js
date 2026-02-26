import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const StudentSettings = () => {
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [error, setError] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setError("Passwords do not match!");
    } else if (passwords.new.length < 6) {
      setError("Password must be at least 6 characters.");
    } else {
      setError('');
      alert("Password updated successfully!");
      setPasswords({ new: '', confirm: '' });
    }
  };

  return (
    <div className="content-card fade-in">
      <h3>Security Settings</h3>
      <p>Change your account password below.</p>
      
      <form className="settings-form" onSubmit={handleUpdate}>
        <div className="form-section">
          <label>New Password</label>
          <input 
            type="password" 
            className="admin-input" 
            value={passwords.new}
            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
            placeholder="Enter new password"
          />
        </div>
        <div className="form-section" style={{marginTop: '15px'}}>
          <label>Confirm New Password</label>
          <input 
            type="password" 
            className="admin-input" 
            value={passwords.confirm}
            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
            placeholder="Type password again"
          />
        </div>
        
        {error && <p style={{color: '#ef4444', fontSize: '0.8rem', marginTop: '10px'}}>{error}</p>}
        
        <button type="submit" className="primary-btn" style={{marginTop: '20px'}}>
          <ShieldCheck size={18} /> Update Password
        </button>
      </form>
    </div>
  );
};

export default StudentSettings;