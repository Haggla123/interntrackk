import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterCompany.css';

const RegisterCompany = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    sector: '',
    hqAddress: '',
    officeLat: '',
    officeLng: '',
    hrContact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Company Registered:", formData);
    alert(`${formData.companyName} has been added to the verified list.`);
    navigate('/admin');
  };

  return (
    <div className="admin-subpage">
      <div className="form-container">
        <button className="back-btn" onClick={() => navigate('/admin')}>← Back to Admin</button>
        
        <div className="form-card">
          <h2>Register Verified Company</h2>
          <p className="subtitle">Enter official company details to allow internship placements.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company Name</label>
              <input 
                type="text" 
                placeholder="e.g., Vodafone Ghana HQ" 
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Industry Sector</label>
                <select onChange={(e) => setFormData({...formData, sector: e.target.value})} required>
                  <option value="">Select...</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Banking">Banking</option>
                  <option value="Energy">Energy</option>
                  <option value="IT Services">IT Services</option>
                </select>
              </div>
              <div className="form-group">
                <label>HR Contact Email</label>
                <input 
                  type="email" 
                  placeholder="hr@company.com" 
                  onChange={(e) => setFormData({...formData, hrContact: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="geo-verification-box">
              <h3>📍 Workplace Geofence</h3>
              <p>Set the coordinates students must be within to log their activities.</p>
              <div className="form-row">
                <div className="form-group">
                  <label>Latitude</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5.6037" 
                    onChange={(e) => setFormData({...formData, officeLat: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Longitude</label>
                  <input 
                    type="text" 
                    placeholder="e.g. -0.1870" 
                    onChange={(e) => setFormData({...formData, officeLng: e.target.value})}
                    required 
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="register-btn">Register Company</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;