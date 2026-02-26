import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, Mail, Building, User, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import './StudentDetailView.css';

const StudentDetailView = () => {
  const navigate = useNavigate();
  // In a real app, we'd use useParams() to fetch this specific student from the DB
  const student = {
    name: "Kwame Mensah",
    index: "2201093",
    email: "k.mensah@university.edu.gh",
    phone: "+233 24 123 4567",
    company: "Vodafone Ghana HQ",
    location: "Airport City, Accra",
    supervisor: "Mr. Robert Azu",
    startDate: "Jan 12, 2026",
    weeksCompleted: 5
  };

  return (
    <div className="detail-page-container">
      <button className="back-link-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back to Student List
      </button>

      <div className="student-profile-layout">
        {/* Left Column: Essential Info */}
        <div className="info-main-card">
          <div className="profile-badge">
            <div className="avatar-large">{student.name.charAt(0)}</div>
            <h2>{student.name}</h2>
            <span className="index-tag">Index: {student.index}</span>
          </div>

          <div className="contact-grid">
            <div className="contact-item">
              <Mail size={18} />
              <div>
                <label>Email Address</label>
                <p>{student.email}</p>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <div>
                <label>Phone Number</label>
                <p>{student.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <a href={`mailto:${student.email}`} className="action-btn email">Send Email</a>
            <a href={`tel:${student.phone}`} className="action-btn call">Call Student</a>
          </div>
        </div>

        {/* Right Column: Internship Placement Info */}
        <div className="placement-card">
          <h3>Internship Placement</h3>
          <div className="detail-row">
            <Building className="icon-dim" size={20} />
            <div>
              <label>Company</label>
              <p>{student.company}</p>
            </div>
          </div>
          <div className="detail-row">
            <MapPin className="icon-dim" size={20} />
            <div>
              <label>Office Location</label>
              <p>{student.location}</p>
            </div>
          </div>
          <div className="detail-row">
            <User className="icon-dim" size={20} />
            <div>
              <label>Industrial Supervisor</label>
              <p>{student.supervisor}</p>
            </div>
          </div>
          <div className="detail-row">
            <Calendar className="icon-dim" size={20} />
            <div>
              <label>Commencement Date</label>
              <p>{student.startDate}</p>
            </div>
          </div>
          
          <div className="progress-footer">
            <span>Current Progress: <strong>{student.weeksCompleted}/6 Weeks</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailView;