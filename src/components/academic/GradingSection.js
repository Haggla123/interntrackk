import React, { useState } from 'react';
import './GradingSection.css';
import { Award, FileText, CheckCircle, X, Search, GraduationCap } from 'lucide-react';

const GradingSection = ({ students, setStudents, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFinalizer, setShowFinalizer] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("");

  // Filter based on search term (Name or Index Number)
  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.index.includes(searchTerm)
  );

  const handleConfirmGrade = () => {
    if (!selectedGrade) return alert("Please select a grade before submitting.");
    
    // UPDATED LOGIC: Update status to 'Graded' and sync with Dashboard
    const updated = students.map(s => 
      s.id === showFinalizer.id 
        ? { ...s, finalGrade: selectedGrade, status: "Graded" } 
        : s
    );
    
    setStudents(updated); 
    setShowFinalizer(null);
    setSelectedGrade("");
    
    // Optional: Return to overview to see the updated queue
    // setActiveTab('overview'); 
  };

  return (
    <div className="grading-container fade-in">
      <div className="bento-item welcome-box academic-banner">
        <div className="badge-pill">University Grading Center</div>
        <h2>Final Internship Assessment</h2>
        <p>Evaluate industrial competency and logbook compliance for finalized grading.</p>
      </div>

      <div className="grading-search-header">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by student name or index..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="grading-stats-mini">
           <span>Total: {students.length}</span>
           <span className="pending-tag">Pending: {students.filter(s => s.status === "Pending Grading").length}</span>
        </div>
      </div>

      <div className="grading-card bento-item">
        <div className="table-responsive">
          <table className="grading-table">
          <thead>
            <tr>
              <th>Intern Details</th>
              <th>Indus. Score (10)</th>
              <th>Logbook / Report</th>
              <th>Status</th>
              <th>Final Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className={s.status === "Graded" ? "row-graded" : ""}>
                <td>
                  <div className="name-cell">
                    <strong>{s.name}</strong>
                    <span>{s.index}</span>
                  </div>
                </td>
                <td>
                  <div className="score-pill">
                    <Award size={14} /> {s.indusScore}
                  </div>
                </td>
                <td>
                  <button 
                    className="view-logbook-btn" 
                    onClick={() => setActiveTab('view-logbook')}
                  >
                    <FileText size={14} /> View Logbook {s.weeks >= 6 && "& Report"}
                  </button>
                </td>
                <td>
                  <span className={`pill ${s.status.toLowerCase().replace(' ', '-')}`}>
                    {s.status}
                  </span>
                </td>
                <td className="grade-cell-bold">{s.finalGrade}</td>
                <td>
                  {s.status !== "Graded" ? (
                    <button className="finalize-btn" onClick={() => setShowFinalizer(s)}>
                      Grade <CheckCircle size={14}/>
                    </button>
                  ) : (
                    <button className="finalize-btn edit" onClick={() => setShowFinalizer(s)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>

      {showFinalizer && (
        <div className="modal-overlay">
          <div className="grade-modal animated-slide-up">
            <button className="close-modal" onClick={() => setShowFinalizer(null)}><X /></button>
            <div className="modal-header">
              <GraduationCap size={32} color="#1e1b4b" />
              <h3>Assign Grade: {showFinalizer.name}</h3>
              <p>Industrial Score: <strong>{showFinalizer.indusScore}/10</strong></p>
            </div>
            
            <div className="grade-selector-grid">
              {['A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map(g => (
                <button 
                  key={g} 
                  className={`grade-option ${selectedGrade === g ? 'selected' : ''}`} 
                  onClick={() => setSelectedGrade(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            
            <button className="btn-save-grade" onClick={handleConfirmGrade}>
              Submit Final Grade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradingSection;