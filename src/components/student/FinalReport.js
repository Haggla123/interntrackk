import React, { useState } from 'react';
import { Lock, FileCheck, Send, AlertCircle, FileText, Upload, CheckCircle } from 'lucide-react';

const FinalReport = ({ completedWeeks, studentName }) => {
  const [reportFile, setReportFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isEligible = completedWeeks >= 6;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setReportFile(selectedFile);
    } else {
      alert("Please upload your report in PDF format.");
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!reportFile) return;

    setIsSubmitting(true);
    // Simulate API call to backend/supervisor
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
    }, 2000);
  };

  // 1. Locked State (Under 6 weeks)
  if (!isEligible) {
    return (
      <div className="bento-item locked-state fade-in">
        <div className="locked-content">
          <div className="lock-icon-circle"><Lock size={40} /></div>
          <h3>Final Report Locked</h3>
          <p>You have completed <strong>{completedWeeks}</strong> of the required 6 weeks.</p>
          <div className="requirement-tag">
            <AlertCircle size={14} /> <span>Eligibility: 6 Weeks Minimum</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Success/Confirmation State
  if (hasSubmitted) {
    return (
      <div className="bento-item report-success-card fade-in">
        <div className="success-content" style={{ textAlign: 'center', padding: '40px' }}>
          <CheckCircle size={60} color="#10b981" style={{ marginBottom: '20px' }} />
          <h2>Report Submitted Successfully</h2>
          <p>Your final internship report has been sent to your Academic Supervisor for grading.</p>
          <div className="file-pill" style={{ marginTop: '20px', display: 'inline-block' }}>
            <FileText size={14} /> {reportFile?.name}
          </div>
        </div>
      </div>
    );
  }

  // 3. Active Final Report Submission Page
  return (
    <div className="final-report-wrapper fade-in">
      <div className="report-grid">
        
        {/* LEFT COLUMN: GUIDELINES & FORMAT */}
        <div className="bento-item format-guidelines">
          <div className="box-header">
            <FileText size={20} color="#03256c" />
            <h3>Final Report Format</h3>
          </div>
          <div className="format-content">
            <p className="format-hint">Ensure your PDF follows this structure before uploading:</p>
            <div className="format-box">
              <pre>
{`1. COVER PAGE
   - Student Name & Index Number
   - Organization Name
   - Supervisor Names

2. INTRODUCTION
   - Background of the Organization
   - Objectives of the Internship

3. TECHNICAL ACTIVITIES
   - Detailed logs of tasks performed
   - Skills & Tools utilized (e.g., MERN, Cisco)

4. CHALLENGES & SOLUTIONS
   - Problems encountered during the 6 weeks
   - How you resolved them

5. CONCLUSION & RECOMMENDATION
   - Key takeaways
   - Suggestions for the organization/university`}
              </pre>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUBMISSION ZONE */}
        <div className="bento-item submission-zone">
          <h3>Submit Completed Report</h3>
          <p className="sub-text">Upload your final document based on the format provided.</p>
          
          <form onSubmit={handleFinalSubmit}>
            <div className="upload-container">
              <input 
                type="file" 
                id="final-report-upload" 
                accept=".pdf" 
                onChange={handleFileChange} 
                hidden 
              />
              <label htmlFor="final-report-upload" className="drop-zone">
                <Upload size={32} color="#1768ac" />
                <span>{reportFile ? reportFile.name : "Click to select PDF Report"}</span>
                <small>Max file size: 5MB</small>
              </label>
            </div>

            <button 
              type="submit" 
              className={`univ-btn submit-final-btn ${!reportFile ? 'disabled' : ''}`}
              disabled={!reportFile || isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Submit to Supervisor"}
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default FinalReport;