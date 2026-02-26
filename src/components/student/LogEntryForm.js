import React, { useState } from 'react';
import { Send, MapPin, Award, Info } from 'lucide-react';

const LogEntryForm = ({ isLocationVerified }) => {
  const [entry, setEntry] = useState("");
  const [skills, setSkills] = useState("");

  return (
    <div className="log-form-container fade-in">
      {/* PROFESSIONAL STATUS HEADER BAR */}
      <div className="bento-item log-header-bar">
        <div className="status-group">
          <div className="status-indicator-block">
            <label>Location Status</label>
            <div className={`indicator-pill ${isLocationVerified ? 'verified' : 'warning'}`}>
              <MapPin size={14} />
              <span>{isLocationVerified ? "Within Office Geofence" : "Outside Geofence"}</span>
            </div>
          </div>

          <div className="status-divider"></div>

          <div className="status-indicator-block">
            <label>Competency Tracking</label>
            <div className="indicator-pill active">
              <Award size={14} />
              <span>Skills focus active</span>
            </div>
          </div>
        </div>
        
        <div className="header-hint">
          <Info size={14} />
          <span>Logs are only submittable within the verified zone.</span>
        </div>
      </div>

      {/* MAIN INPUT BENTO BOX */}
      <div className="bento-item input-panel">
        <div className="box-header">
          <h4>Daily Activity Log</h4>
          <span className="char-count">{entry.length} characters</span>
        </div>
        
        <textarea 
          className="corporate-textarea"
          placeholder="Detailed description of technical tasks and challenges..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          disabled={!isLocationVerified}
        />

        <div className="skills-section">
           <label className="input-label-sm">Skills Learned / Applied Today</label>
           <input 
            type="text"
            className="corporate-input-sm"
            placeholder="e.g. React Hooks, Database Indexing, UI Design"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            disabled={!isLocationVerified}
           />
        </div>

        <div className="input-footer">
          <button 
            className="btn-primary-lite" 
            disabled={!isLocationVerified || entry.length < 20}
          >
            <Send size={16} /> Submit Logbook Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogEntryForm;