import React, { useState } from 'react';
import { Phone, Activity, Mail, Building, User, MapPin, X, Info, Search, Calendar, Award } from 'lucide-react';
import './AssignedStudents.css';

const AssignedStudents = ({ students = [] }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.index.toString().includes(searchTerm)
  );

  return (
    <div className="assigned-wrapper-fixed fade-in">
      <div className="list-section">
        <div className="bento-item welcome-box academic-banner">
          <div className="badge-pill">Student Management</div>
          <h2>Assigned Interns</h2>
          <p>Review placement locations and real-time internship progress for your {students.length} students.</p>
        </div>
        
        <div className="list-header-flex">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Name or Index..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bento-item table-card">
          <div className="table-responsive">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Internship Progress</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(s => (
                    <tr key={s.id} className={selectedStudent?.id === s.id ? 'active-row' : ''}>
                      <td>
                        <div className="name-cell">
                          <strong>{s.name}</strong>
                          <span>{s.index}</span>
                        </div>
                      </td>
                      <td>{s.company}</td>
                      <td>
                        <span className="location-pill">
                          <MapPin size={12} /> {s.location}
                        </span>
                      </td>
                      <td>
                        <div className="table-progress-container">
                          <div className="table-progress-bar">
                            <div 
                              className="table-progress-fill" 
                              style={{ width: `${s.progress}%` }}
                            ></div>
                          </div>
                          <span className="table-progress-text">{s.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <button className="details-btn" onClick={() => setSelectedStudent(s)}>
                          <Info size={14} /> Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">No results found for "{searchTerm}"</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- SLIDING PROFILE DRAWER --- */}
      {selectedStudent && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedStudent(null)}></div>
          <div className="info-drawer open">
            <button className="close-btn" onClick={() => setSelectedStudent(null)}><X size={24}/></button>
            <div className="drawer-header-color"></div>
            
            <div className="drawer-profile">
              <div className="drawer-avatar">{selectedStudent.name.charAt(0)}</div>
              <h3>{selectedStudent.name}</h3>
              <p className="drawer-sub">{selectedStudent.index}</p>
              <span className={`status-pill-small ${selectedStudent.status.toLowerCase().replace(' ', '-')}`}>
                {selectedStudent.status}
              </span>
            </div>

            <div className="drawer-content">
              <div className="content-group">
                <label><User size={14}/> Student Profile</label>
                <div className="data-card">
                  <p><Mail size={16} color="#64748b" /> {selectedStudent.email}</p>
                  <p><Phone size={16} color="#64748b" /> {selectedStudent.phone}</p>
                </div>
              </div>

              <div className="content-group">
                <label><Building size={14}/> Placement Details</label>
                <div className="data-card">
                  <p><strong>Company:</strong> {selectedStudent.company}</p>
                  <p><MapPin size={16} color="#64748b" /> {selectedStudent.location}</p>
                  <p><strong>Industry Sup:</strong> {selectedStudent.supervisor}</p>
                </div>
              </div>

              <div className="content-group">
                <label><Activity size={14}/> Internship Stats</label>
                <div className="stats-mini-grid">
                  <div className="mini-stat">
                    <span>Weeks</span>
                    <strong>{selectedStudent.weeks}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>Score</span>
                    <strong>{selectedStudent.indusScore}/10</strong>
                  </div>
                  <div className="mini-stat">
                    <span>Grade</span>
                    <strong>{selectedStudent.finalGrade}</strong>
                  </div>
                </div>
              </div>

              <div className="drawer-footer">
                <button className="msg-btn">Contact Student</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignedStudents;