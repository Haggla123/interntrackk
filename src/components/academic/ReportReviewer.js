import React, { useState } from 'react';
import { FileText, Download, CheckCircle, AlertCircle, Award, Send, ChevronLeft } from 'lucide-react';
import './ReportReviewer.css';

const ReportReviewer = ({ student, onBack, onGradeSubmit }) => {
  const [grade, setGrade] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate grading submission
    setTimeout(() => {
      onGradeSubmit(student.id, { grade, comments });
      setIsSubmitting(false);
      alert(`Grade submitted for ${student.name}`);
      onBack();
    }, 1500);
  };

  return (
    <div className="review-container fade-in">
      <div className="review-header bento-item">
        <button className="back-link" onClick={onBack}><ChevronLeft size={16}/> Back to List</button>
        <div className="student-info-mini">
          <h2>Review: {student.name}</h2>
          <span className="index-sub">{student.indexNumber} • {student.company}</span>
        </div>
      </div>

      <div className="review-grid">
        {/* LEFT: SUBMISSION DETAILS */}
        <div className="bento-item submission-details">
          <h3><FileText size={18} /> Student Submission</h3>
          <div className="file-display-box">
            <div className="file-info-icon">
              <FileText size={40} color="#1768ac" />
              <span>FINAL_REPORT_{student.name.replace(/\s+/g, '_')}.pdf</span>
            </div>
            <button className="univ-btn download-btn">
              <Download size={18} /> Download for Review
            </button>
          </div>
          
          <div className="internship-summary">
            <label>System Summary</label>
            <div className="summary-pills">
              <span className="summary-pill"><CheckCircle size={14}/> {student.completedWeeks} Weeks Logged</span>
              <span className="summary-pill"><Award size={14}/> 92% Attendance</span>
            </div>
          </div>
        </div>

        {/* RIGHT: GRADING PANEL */}
        <div className="bento-item grading-panel">
          <h3><Award size={18} /> Final Assessment</h3>
          <form onSubmit={handleFinalSubmit}>
            <div className="form-group">
              <label>Select Letter Grade</label>
              <select 
                className="bento-input" 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)}
                required
              >
                <option value="">-- Choose Grade --</option>
                <option value="A">A (Excellent)</option>
                <option value="B+">B+ (Very Good)</option>
                <option value="B">B (Good)</option>
                <option value="C">C (Satisfactory)</option>
                <option value="F">F (Fail)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Supervisor Comments</label>
              <textarea 
                className="corporate-textarea"
                placeholder="Provide feedback on the student's report and overall performance..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="univ-btn submit-grade-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Submit Final Grade"}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportReviewer;