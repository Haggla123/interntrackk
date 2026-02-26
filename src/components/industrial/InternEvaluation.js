import React, { useState } from 'react';
import { Send, Star, Target, Shield } from 'lucide-react';

const InternEvaluation = () => {
  const [evaluation, setEvaluation] = useState({
    studentId: '',
    technicalSkills: 5,
    punctuality: 5,
    teamwork: 5,
    comments: ''
  });

  const students = [
    { id: '2201093', name: 'Kwame Mensah' },
    { id: '2201105', name: 'Abena Serwaa' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Evaluation for ${evaluation.studentId} sent to Academic Supervisor!`);
    // This will eventually be a POST request to your MERN backend
  };

  return (
    <div className="bento-container fade-in">
      <div className="bento-item welcome-box">
        <div className="badge-pill">Performance Review</div>
        <h3>Student Competency Evaluation</h3>
        <p>Your feedback will be sent directly to the student's Academic Supervisor.</p>
      </div>

      <div className="evaluation-grid">
        <div className="bento-item form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <label className="input-label-sm">Select Student</label>
              <select 
                className="corporate-input-sm"
                onChange={(e) => setEvaluation({...evaluation, studentId: e.target.value})}
              >
                <option value="">Choose a student...</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
              </select>
            </div>

            <div className="rating-grid">
              <div className="rating-item">
                <label><Target size={14}/> Technical Proficiency</label>
                <input type="range" min="1" max="10" value={evaluation.technicalSkills} 
                  onChange={(e) => setEvaluation({...evaluation, technicalSkills: e.target.value})} />
                <span>{evaluation.technicalSkills}/10</span>
              </div>
              <div className="rating-item">
                <label><Shield size={14}/> Punctuality & Discipline</label>
                <input type="range" min="1" max="10" value={evaluation.punctuality} 
                  onChange={(e) => setEvaluation({...evaluation, punctuality: e.target.value})} />
                <span>{evaluation.punctuality}/10</span>
              </div>
            </div>

            <div className="form-section">
              <label className="input-label-sm">Supervisor's Remarks</label>
              <textarea 
                className="corporate-input-sm" 
                rows="4"
                placeholder="Describe student's key contributions..."
                onChange={(e) => setEvaluation({...evaluation, comments: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="btn-approve-full" style={{width: '100%', marginTop: '20px'}}>
              <Send size={18} /> Submit Assessment
            </button>
          </form>
        </div>

        <div className="bento-item info-card academic-liaison">
          <label>Review Sent To:</label>
          <h4>Dr. Robert Smith</h4>
          <p>University Liaison Office</p>
          <div className="site-visit-badge">
             <span className="visit-label">Status</span>
             <span className="visit-date">Assessment Required</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternEvaluation;