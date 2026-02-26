import React, { useState } from 'react';
import { User, Activity, Search, ExternalLink } from 'lucide-react';

const MyInterns = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const interns = [
    { id: 1, name: "Kwame Mensah", index: "2201093", progress: 65, lastLog: "Today", status: "On-site" },
    { id: 2, name: "Abena Serwaa", index: "2201105", progress: 40, lastLog: "Yesterday", status: "On-site" }
  ];

  // Filtering Logic
  const filteredInterns = interns.filter(intern => 
    intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.index.includes(searchTerm)
  );

  return (
    <div className="bento-container fade-in">
      <div className="bento-item header-flex-box">
        <div>
          <h3>Managed Interns</h3>
          <p>Monitor the progress and on-site status of your assigned students.</p>
        </div>
        
        {/* NEW SEARCH BAR */}
        <div className="search-wrapper-bento">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bento-search-input"
          />
        </div>
      </div>

      <div className="interns-grid-bento">
        {filteredInterns.length > 0 ? (
          filteredInterns.map(intern => (
            <div key={intern.id} className="bento-item intern-card-bento">
              {/* ... same intern card content as before ... */}
              <div className="intern-card-header">
                <div className="intern-avatar-med">
                  {intern.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="intern-id-tags">
                  <span className={`status-dot-pill ${intern.status === 'On-site' ? 'active' : ''}`}>
                    {intern.status}
                  </span>
                </div>
              </div>

              <div className="intern-card-body">
                <h4>{intern.name}</h4>
                <p className="sub-text">ID: {intern.index}</p>
                <div className="intern-progress-section">
                  <div className="progress-meta">
                    <label>Overall Progress</label>
                    <span>{intern.progress}%</span>
                  </div>
                  <div className="linear-progress-track">
                    <div className="linear-progress-bar" style={{ width: `${intern.progress}%` }}></div>
                  </div>
                </div>
              </div>

              <button className="view-details-btn">
                View Full Profile <ExternalLink size={14} />
              </button>
            </div>
          ))
        ) : (
          <div className="no-results bento-item">
            <p>No interns found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterns;