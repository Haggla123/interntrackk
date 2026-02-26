import React, { useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const SupervisorSettings = () => {
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [error, setError] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setError("Passwords do not match!");
    } else if (passwords.new.length < 8) {
      setError("Corporate security policy requires at least 8 characters.");
    } else {
      setError('');
      alert("Supervisor password updated successfully!");
      setPasswords({ new: '', confirm: '' });
    }
  };

  return (
    <div className="bento-container fade-in">
      <div className="bento-item welcome-box">
        <div className="badge-pill">Security & Privacy</div>
        <h3>Account Settings</h3>
        <p>Manage your access credentials for the {new Date().getFullYear()} internship cycle.</p>
      </div>

      <div className="bento-item settings-form-box" style={{maxWidth: '500px'}}>
        <form onSubmit={handleUpdate}>
          <div className="form-section">
            <label className="input-label-sm">New Corporate Password</label>
            <input 
              type="password" 
              className="corporate-input-sm" 
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              placeholder="••••••••"
            />
          </div>
          <div className="form-section" style={{marginTop: '20px'}}>
            <label className="input-label-sm">Confirm Password</label>
            <input 
              type="password" 
              className="corporate-input-sm" 
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-danger" style={{fontSize: '12px', marginTop: '10px'}}>{error}</p>}
          
          <button type="submit" className="btn-primary-lite" style={{marginTop: '25px', width: '100%'}}>
            <Lock size={16} /> Update Supervisor Credentials
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupervisorSettings;