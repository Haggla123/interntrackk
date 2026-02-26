import React, { useState } from 'react';
import './CreateStudent.css';

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    indexNumber: '',
    fullName: '',
    email: '',
    assignedCompany: '',
    academicSupervisor: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Account Created:", formData);
    alert(`Account created for ${formData.fullName}. Login credentials sent to email.`);
  };

  return (
    <div className="admin-subpage">
      <div className="form-card">
        <h2>Register New Student</h2>
        <p className="form-instruction">Enter student details to generate their internship portal access.</p>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="input-group">
              <label>Index Number</label>
              <input 
                type="text" 
                placeholder="e.g. 2201093" 
                onChange={(e) => setFormData({...formData, indexNumber: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="First & Last Name" 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>University Email</label>
            <input 
              type="email" 
              placeholder="student@university.edu.gh" 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Assign Company</label>
              <select onChange={(e) => setFormData({...formData, assignedCompany: e.target.value})} required>
                <option value="">Select Company...</option>
                <option value="Vodafone">Vodafone Ghana</option>
                <option value="MTN">MTN Business</option>
                <option value="ECG">ECG</option>
              </select>
            </div>
            <div className="input-group">
              <label>Assign Academic Supervisor</label>
              <select onChange={(e) => setFormData({...formData, academicSupervisor: e.target.value})} required>
                <option value="">Select Lecturer...</option>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Prof. Mensah">Prof. Mensah</option>
              </select>
            </div>
          </div>

          <button type="submit" className="create-btn">Generate Student Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;