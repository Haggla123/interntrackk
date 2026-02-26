import React from 'react';
import { Link2, Info } from 'lucide-react';

const AssignmentTab = ({ students, supervisors, companies }) => {
  return (
    <div className="content-card fade-in">
      <div className="card-header">
        <h3>Internship Assignments</h3>
        <p>Link students to their respective supervisors and host companies.</p>
      </div>

      <div className="assignment-notice">
        <Info size={16} />
        <span>Ensure companies are verified before assigning students to them.</span>
      </div>
      
      <form className="assignment-form-grid" onSubmit={(e) => e.preventDefault()}>
        <div className="form-section">
          <label>Target Student</label>
          <select className="admin-input">
            <option value="">Select Student...</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.index} - {s.name}</option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label>Academic Supervisor</label>
          <select className="admin-input">
            <option value="">Select Lecturer...</option>
            {supervisors.filter(sup => sup.role === "Academic").map(sup => (
              <option key={sup.id} value={sup.id}>{sup.name}</option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label>Host Company</label>
          <select className="admin-input">
            <option value="">Select Placement...</option>
            {/* These would be your verified companies */}
            <option>Vodafone Ghana</option>
            <option>MTN Ghana</option>
            <option>ECG</option>
          </select>
        </div>

        <div className="form-section">
          <label>Industrial Supervisor (Optional)</label>
          <select className="admin-input">
            <option value="">Auto-detect from company...</option>
            {supervisors.filter(sup => sup.role === "Industrial").map(sup => (
              <option key={sup.id} value={sup.id}>{sup.name} ({sup.org})</option>
            ))}
          </select>
        </div>

        <button type="submit" className="primary-btn full-width">
          <Link2 size={18} /> Confirm Internship Link
        </button>
      </form>
    </div>
  );
};

export default AssignmentTab;