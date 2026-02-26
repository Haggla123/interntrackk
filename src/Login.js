import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, GraduationCap, Building2, ShieldCheck, Briefcase, ChevronRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('student'); 
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', password: '' });

  // FIXED: Dynamic Placeholders based on Role
  const getPlaceholder = () => {
    switch(role) {
      case 'student': return "e.g. UEB1234522";
      case 'academic': return "e.g. STF-442";
      case 'industry': return "Work Email Address";
      case 'admin': return "Admin ID";
      default: return "Enter your ID";
    }
  };

  const getLabel = () => {
    switch(role) {
      case 'student': return "Index Number";
      case 'academic': return "Staff ID";
      case 'industry': return "Corporate Email";
      case 'admin': return "Administrator ID";
      default: return "Identification";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Authenticating ${role}:`, credentials);
  };

  return (
    <div className="login-page-container">
      {/* 🌌 DYNAMIC GRADIENT BACKGROUND */}
      <div className="bg-gradient-mesh"></div>

      <div className="login-content-box fade-in">
        <div className="login-card-glass">
          
          <div className="login-brand">
            <div className="brand-icon-circle">
              <GraduationCap size={32} color="#06bee1" />
            </div>
            <h1>InternTrack</h1>
            <p>Unified Internship Management System</p>
          </div>

          {/* 🔘 ROLE SELECTOR */}
          <div className="role-selector-tabs">
            <button className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>
              <User size={14} /> Student
            </button>
            <button className={role === 'academic' ? 'active' : ''} onClick={() => setRole('academic')}>
              <GraduationCap size={14} /> Faculty
            </button>
            <button className={role === 'industry' ? 'active' : ''} onClick={() => setRole('industry')}>
              <Briefcase size={14} /> Industry
            </button>
            <button className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>
              <ShieldCheck size={14} /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form-fields">
            <div className="form-group-custom">
              <label>{getLabel()}</label>
              <div className="input-wrapper-glass">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder={getPlaceholder()}
                  value={credentials.id}
                  onChange={(e) => setCredentials({...credentials, id: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group-custom">
              <label>Password</label>
              <div className="input-wrapper-glass">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                />
                {/* FIXED: View/Hide Toggle */}
                <button 
                  type="button" 
                  className="password-toggle-btn" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="login-options-flex">
              <label className="checkbox-custom">
                <input type="checkbox" /> <span>Remember me</span>
              </label>
              <a href="#reset" className="link-text">Forgot Access?</a>
            </div>

            <button type="submit" className="btn-login-submit">
              Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Portal 
              <ChevronRight size={18} />
            </button>
          </form>

          <footer className="login-card-footer">
            <p>Need assistance? <a href="mailto:it@university.edu.gh">University IT Support</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;