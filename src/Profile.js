import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ userRole }) => {
  const navigate = useNavigate();

  // Mock data - In the future, this will come from your .NET Backend
  const userData = {
    name: "Kwame Mensah",
    id: "2201093",
    email: "k.mensah@university.edu.gh",
    role: userRole || "Student",
    department: "ITDS",
    joinedDate: "January 2026",
    status: "Verified"
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <button className="close-btn" onClick={() => navigate(-1)}>✕</button>
        
        <div className="profile-header">
          <div className="avatar">{userData.name.charAt(0)}</div>
          <h2>{userData.name}</h2>
          <span className="role-tag">{userData.role}</span>
        </div>

        <div className="profile-body">
          <div className="info-row">
            <label>Identification No.</label>
            <p>{userData.id}</p>
          </div>
          <div className="info-row">
            <label>Official Email</label>
            <p>{userData.email}</p>
          </div>
          <div className="info-row">
            <label>Department</label>
            <p>{userData.department}</p>
          </div>
          <div className="info-row">
            <label>Account Status</label>
            <p className="status-verified">● {userData.status}</p>
          </div>
        </div>

        <div className="profile-footer">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;